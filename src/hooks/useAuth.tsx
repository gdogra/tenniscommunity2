'use client';

import { supabase } from '@/lib/supabase';
// REMOVE THIS LINE: 
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
 // ✅ keep only one import

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => => {
      console.log('[useAuth] Firebase returned:', firebaseUser);
      setUser(firebaseUser ?? null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

