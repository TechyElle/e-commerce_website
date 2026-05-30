import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | DemoUser | null;
  isAdmin: boolean;
  loading: boolean;
  signInDemo: (email: string, name?: string) => void;
  signOutDemo: () => void;
}

interface DemoUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const demoAdminEmail = 'admin@xontrix.local';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signInDemo: () => {},
  signOutDemo: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | DemoUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      const saved = window.localStorage.getItem('xontrix-demo-user');
      if (saved) {
        const demoUser = JSON.parse(saved) as DemoUser;
        setUser(demoUser);
        setIsAdmin(demoUser.email === demoAdminEmail);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user is admin in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin');
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInDemo = (email: string, name = 'Xontrix User') => {
    const demoUser = {
      uid: email === demoAdminEmail ? 'admin-demo' : `demo-${Date.now()}`,
      email,
      displayName: email === demoAdminEmail ? 'Xontrix Admin' : name,
    };
    window.localStorage.setItem('xontrix-demo-user', JSON.stringify(demoUser));
    setUser(demoUser);
    setIsAdmin(email === demoAdminEmail);
  };

  const signOutDemo = () => {
    window.localStorage.removeItem('xontrix-demo-user');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signInDemo, signOutDemo }}>
      {children}
    </AuthContext.Provider>
  );
};
