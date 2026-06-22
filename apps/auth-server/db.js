import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'xontrix_store',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Find a user in the MySQL database by their email.
 * @param {string} email
 * @returns {Promise<object|null>}
 */
export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, created_at FROM users WHERE email = ?',
    [email.toLowerCase().trim()]
  );
  return rows[0] || null;
}

/**
 * Create a new user in the MySQL database.
 * @param {object} param0
 * @param {string} param0.name
 * @param {string} param0.email
 * @param {string} param0.providerUid
 * @returns {Promise<object>}
 */
export async function createUser({ name, email, providerUid }) {
  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash('google:' + providerUid, 10);
  const cleanEmail = email.toLowerCase().trim();
  
  // Set role to 'admin' if email is admin@xontrix.local, otherwise 'user'
  const role = cleanEmail === 'admin@xontrix.local' ? 'admin' : 'user';

  await pool.query(
    'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
    [id, name || 'Google User', cleanEmail, passwordHash, role]
  );

  return {
    id,
    name: name || 'Google User',
    email: cleanEmail,
    role,
  };
}
