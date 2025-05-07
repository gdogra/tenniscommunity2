'use client';

import { useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      const role = snap.exists() ? snap.data().role : 'player';

      if (role !== 'admin') {
        router.push('/unauthorized');
        return;
      }

      setAuthorized(true);
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return <div className="p-6">Checking admin access...</div>;
  if (!authorized) return null;

  return <>{children}</>;
}
