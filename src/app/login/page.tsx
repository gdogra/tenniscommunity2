'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {/* Login form component goes here */}
    </main>
  );
}
