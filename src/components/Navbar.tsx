// src/app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user]);

  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithPassword({ email: email, password: password });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white mt-12 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <Button className="w-full mb-2" onClick={handleLogin}>Login</Button>
      <Button className="w-full bg-blue-100 text-blue-800" onClick={handleGoogleLogin}>Sign in with Google</Button>
    </div>
  );
}


// src/app/register/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { googleProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user]);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white mt-12 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <Button className="w-full mb-2" onClick={handleRegister}>Register</Button>
      <Button className="w-full bg-blue-100 text-blue-800" onClick={handleGoogleSignup}>Sign up with Google</Button>
    </div>
  );
}

