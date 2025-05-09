'use client';

import { supabase } from '@/lib/supabase';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => => {
      if (firebaseUser) {
        setUser(firebaseUser);

        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          const name = firebaseUser.displayName || 'Unnamed User';
          const email = firebaseUser.email || 'no-email';
          const photoURL = firebaseUser.photoURL || '';

          await setDoc(userRef, {
            name,
            email,
            photoURL,
          });

          console.log(`✅ Created Firestore user profile for ${firebaseUser.uid}`);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
