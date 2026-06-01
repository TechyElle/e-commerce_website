import React, { createContext, useContext, useEffect, useState } from 'react';

type Role = 'admin' | 'user';

type AppUser = DemoUser & { role?: Role };

interface AuthContextType {
  user: AppUser | null;
  isAdmin: boolean;
  loading: boolean;
  signInDemo: (email: string, name?: string, role?: 'admin' | 'user') => void;

  signOutDemo: () => void;
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
  signInDemo: () => {},
  signOutDemo: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);


  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem('xontrix-user');
    if (saved) {
      const savedUser = JSON.parse(saved) as DemoUser & { role?: Role };
      setUser(savedUser);
      setIsAdmin(savedUser.role === 'admin');
    }
    setLoading(false);
  }, []);

  const signInDemo = (email: string, name = 'Xontrix User', role: 'admin' | 'user' = 'user') => {
    const demoUser = {
      uid: `user-${Date.now()}`,
      email,
      displayName: role === 'admin' ? 'Xontrix Admin' : name,
      role,
    };
    window.localStorage.setItem('xontrix-user', JSON.stringify(demoUser));
    setUser(demoUser);
    setIsAdmin(role === 'admin');
  };

  const signOutDemo = () => {
    window.localStorage.removeItem('xontrix-user');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signInDemo, signOutDemo }}>
      {children}
    </AuthContext.Provider>
  );
};
