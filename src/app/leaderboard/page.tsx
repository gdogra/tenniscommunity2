'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function LeaderboardRedirect() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      const role = snap.exists() ? snap.data().role : 'player';

      if (role === 'admin') {
        router.push('/leaderboard/admin');
      } else {
        const slug = user.displayName || user.uid;
        router.push(`/leaderboard/${encodeURIComponent(slug)}`);
      }
    });

    return () => unsub();
  }, [router]);

  return <p className="p-6">Redirecting to your leaderboard...</p>;
}
