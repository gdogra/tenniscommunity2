'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';

interface Match {
  id: string;
  opponentId: string;
  set1: string;
  set2: string;
  set3?: string;
  matchDate: Timestamp;
}

interface OpponentCache {
  [id: string]: string; // opponentId -> opponentName
}

export default function MatchHistory({ userId }: { userId: string }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [opponentNames, setOpponentNames] = useState<OpponentCache>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatchesAndOpponents() {
      setLoading(true);

      const q = query(collection(db, 'matches'), where('playerId', '==', userId));
      const matchSnap = await getDocs(q);

      const matchData: Match[] = matchSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Match),
      }));

      // Collect unique opponent IDs
      const opponentIds = Array.from(new Set(matchData.map((m) => m.opponentId)));

      // Fetch opponent names
      const opponentCache: OpponentCache = {};
      await Promise.all(
        opponentIds.map(async (id) => {
          const oppDoc = await getDoc(doc(db, 'users', id));
          opponentCache[id] = oppDoc.exists() ? oppDoc.data().name || 'Unknown' : 'Unknown';
        }),
      );

      setMatches(matchData);
      setOpponentNames(opponentCache);
      setLoading(false);
    }

    fetchMatchesAndOpponents();
  }, [userId]);

  if (loading) return <p className="mt-8">Loading match history...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Match History</h2>
      {matches.length === 0 ? (
        <p>No matches yet.</p>
      ) : (
        <ul className="space-y-2">
          {matches.map((match) => (
            <li key={match.id} className="border p-2 rounded">
              <p>
                <strong>Opponent:</strong> {opponentNames[match.opponentId]}
              </p>
              <p>
                <strong>Score:</strong> {match.set1}, {match.set2}
                {match.set3 ? `, ${match.set3}` : ''}
              </p>
              <p>
                <strong>Date:</strong> {match.matchDate.toDate().toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
