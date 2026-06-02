import React, { createContext, useContext, useEffect, useState } from 'react';
import { usersApi } from '../lib/api';

type Role = 'admin' | 'user';

type AppUser = DemoUser & { role?: Role };

interface AuthContextType {
  user: AppUser | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (input: { email: string; name?: string; role?: Role; id?: string; created_at?: string }) => void;
  signOut: () => Promise<void>;
}

interface DemoUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}



const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signIn: () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);


  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const saved = window.localStorage.getItem('xontrix-user');
    if (saved) {
      const savedUser = JSON.parse(saved) as DemoUser & { role?: Role };
      setUser(savedUser);
      setIsAdmin(savedUser.role === 'admin');
    }

    usersApi.me()
      .then(({ user: sessionUser }) => {
        if (cancelled) return;
        if (sessionUser) {
          const appUser = {
            uid: sessionUser.id,
            email: sessionUser.email,
            displayName: sessionUser.name,
            role: sessionUser.role,
          };
          window.localStorage.setItem('xontrix-user', JSON.stringify(appUser));
          setUser(appUser);
          setIsAdmin(sessionUser.role === 'admin');
        } else if (!saved) {
          setUser(null);
          setIsAdmin(false);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const signIn: AuthContextType['signIn'] = ({ email, name = 'Xontrix User', role = 'user', id }) => {
    const demoUser = {
      uid: id ?? `user-${Date.now()}`,
      email,
      displayName: role === 'admin' ? 'Xontrix Admin' : name,
      role,
    };
    window.localStorage.setItem('xontrix-user', JSON.stringify(demoUser));
    setUser(demoUser);
    setIsAdmin(role === 'admin');
  };

  const signOut = async () => {
    await usersApi.logout().catch(() => undefined);
    window.localStorage.removeItem('xontrix-user');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
