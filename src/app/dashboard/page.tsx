// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      const matchesRef = collection(db, 'matches');
      const challengesRef = collection(db, 'challenges');

      const matchesSnap = await getDocs(query(matchesRef, where('players', 'array-contains', user.uid)));
      const challengesSnap = await getDocs(query(challengesRef, where('challengerId', '==', user.uid)));

      setMatches(matchesSnap.docs.map(doc => doc.data()));
      setChallenges(challengesSnap.docs.map(doc => doc.data()));
    };

    fetchDashboardData();
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, {user.email}</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Your Matches</h2>
        <ul className="list-disc list-inside">
          {matches.length === 0 ? (
            <li>No matches found.</li>
          ) : (
            matches.map((match, i) => (
              <li key={i}>
                vs {match.opponentName || 'Unknown'} – {match.status || 'Pending'}
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Challenges Issued</h2>
        <ul className="list-disc list-inside">
          {challenges.length === 0 ? (
            <li>No challenges issued.</li>
          ) : (
            challenges.map((challenge, i) => (
              <li key={i}>
                To {challenge.opponentName || 'Unknown'} – {challenge.status}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

