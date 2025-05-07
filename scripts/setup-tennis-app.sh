#!/bin/bash

# Create folders
mkdir -p src/{app/{dashboard,login,signup},components,hooks,lib}
touch src/app/globals.css

# Navbar component
cat > src/components/Navbar.tsx <<'EOF'
'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">🎾 TennisCommunity</Link>
      </div>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/players">Players</Link>
        {user ? (
          <>
            <span className="font-medium">{user.email}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-blue-500 text-white px-3 py-1 rounded">Login</Link>
            <Link href="/signup" className="bg-green-500 text-white px-3 py-1 rounded">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
EOF

# Auth Provider
cat > src/hooks/useAuth.tsx <<'EOF'
'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login: (email, pw) => signInWithEmailAndPassword(auth, email, pw),
      signup: (email, pw) => createUserWithEmailAndPassword(auth, email, pw),
      logout: () => signOut(auth),
      signInWithGoogle: () => signInWithPopup(auth, googleProvider)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
EOF

# Firebase lib
cat > src/lib/firebase.ts <<'EOF'
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleProvider };
EOF

# Layout
cat > src/app/layout.tsx <<'EOF'
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tennis Community',
  description: 'Join the match, rank up, and compete!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
EOF

# Dashboard page
cat > src/app/dashboard/page.tsx <<'EOF'
export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">🏠 Dashboard</h1>
      <p>Welcome to your Tennis dashboard!</p>
    </div>
  );
}
EOF

# Login page
cat > src/app/login/page.tsx <<'EOF'
'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
EOF

# Sign-up page
cat > src/app/signup/page.tsx <<'EOF'
'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
}
EOF

echo "✅ App scaffolded successfully."

