'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log('[RequireAuth] user =', user);

    if (user === undefined) return; // still loading
    if (user === null) {
      console.log('[RequireAuth] redirecting to login');
      router.push('/login');
    } else {
      console.log('[RequireAuth] user is valid, rendering children');
      setReady(true);
    }
  }, [user, router]);

  if (!ready) return <div className="p-6">Loading...</div>;

  return <>{children}</>;
}

