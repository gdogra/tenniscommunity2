// src/hooks/AuthContext.tsx
'use client';

import { createContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';


export const AuthContext = createContext<{ user: User | null } | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) =>;
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
