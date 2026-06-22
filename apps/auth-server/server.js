import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174'],
  credentials: true,
}));

app.use(express.json());

// Cache for Google/Firebase public keys
const googleKeys = {};
const firebaseKeys = {};

/**
 * Fetch certificate/public key for verifying Google/Firebase RS256 signatures.
 * @param {string} kid 
 * @param {boolean} isFirebase 
 * @returns {Promise<string>} PEM Certificate
 */
async function getPublicKey(kid, isFirebase) {
  const cache = isFirebase ? firebaseKeys : googleKeys;
  
  if (cache[kid]) {
    return cache[kid];
  }

  const url = isFirebase
    ? 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken-system@system.gserviceaccount.com'
    : 'https://www.googleapis.com/oauth2/v1/certs';

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch public certificates from Google: HTTP ${res.status}`);
  }
  
  const certs = await res.json();
  Object.assign(cache, certs);
  return cache[kid];
}

/**
 * Verify Google or Firebase ID Token signature and return payload.
 * @param {string} token 
 * @returns {Promise<{email: string, name: string, uid: string}>}
 */
async function verifyIdToken(token) {
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded || !decoded.header || !decoded.payload) {
    throw new Error('Invalid token format');
  }

  const kid = decoded.header.kid;
  const iss = decoded.payload.iss;
  const isFirebase = iss && iss.startsWith('https://securetoken.google.com/');

  const cert = await getPublicKey(kid, isFirebase);
  if (!cert) {
    throw new Error(`Public key not found for kid: ${kid}`);
  }

  const verified = jwt.verify(token, cert, { algorithms: ['RS256'] });
  
  return {
    email: verified.email,
    name: verified.name || verified.display_name || 'Google User',
    uid: verified.sub || verified.user_id,
  };
}

// Endpoint to verify Google / Firebase Token and return a backend session JWT
app.post('/auth/google', async (req, res) => {
  const { idToken, fallbackUser } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'idToken is required' });
  }

  let verifiedUser;

  try {
    // Try to verify token properly
    verifiedUser = await verifyIdToken(idToken);
  } catch (error) {
    console.error('[auth-server] Token verification failed:', error.message);
    
    // In development mode, if verification fails, we fall back to trusting the body parameters
    // This allows the app to work even if Firebase/Google configurations are mocked or local dev certificates differ
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      console.warn('[auth-server] DEVELOPMENT FALLBACK: Trusting payload from request body');
      if (fallbackUser && fallbackUser.email) {
        verifiedUser = {
          email: fallbackUser.email,
          name: fallbackUser.name || 'Google User',
          uid: fallbackUser.uid || 'fallback-uid-' + Date.now(),
        };
      }
    }

    if (!verifiedUser) {
      return res.status(401).json({ error: 'Invalid ID Token or verification failed', details: error.message });
    }
  }

  try {
    let user = await findUserByEmail(verifiedUser.email);
    if (!user) {
      user = await createUser({
        name: verifiedUser.name,
        email: verifiedUser.email,
        providerUid: verifiedUser.uid,
      });
      console.log(`[auth-server] Created new user: ${user.email}`);
    } else {
      console.log(`[auth-server] Found existing user: ${user.email}`);
    }

    // Generate JWT session token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'xontrix-secret-key-12345',
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (dbError) {
    console.error('[auth-server] Database error:', dbError);
    return res.status(500).json({ error: 'Database operation failed' });
  }
});

// Endpoint for PHP backend to verify session JWT tokens
app.post('/auth/verify', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'xontrix-secret-key-12345');
    
    // Retrieve latest user info from DB
    const user = await findUserByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'xontrix-auth-server' });
});

app.listen(PORT, () => {
  console.log(`[auth-server] Server running on http://localhost:${PORT}`);
});
