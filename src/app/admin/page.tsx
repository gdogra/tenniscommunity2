'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!authorized) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🛠 Admin Dashboard</h1>
      <p className="mb-6 text-gray-600">Choose a tool to manage the league:</p>

      <ul className="space-y-4 text-lg">
        <li>
          <Link href="/leaderboard/admin" className="text-blue-600 underline">
            📊 Admin Leaderboard
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="text-blue-600 underline">
            👤 Manage Users
          </Link>
        </li>
        <li>
          <Link href="/admin/logs" className="text-blue-600 underline">
            📝 View Admin Audit Log
          </Link>
        </li>
        <li>
          <Link href="/head-to-head" className="text-blue-600 underline">
            🆚 Head-to-Head Comparison
          </Link>
        </li>
      </ul>
    </div>
  );
}
