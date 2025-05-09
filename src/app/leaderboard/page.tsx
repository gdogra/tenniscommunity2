'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';

const DIVISIONS = ['3.6', '4.0', '4.5', '5.0'];

export default function LeaderboardPage() {
  const [division, setDivision] = useState('4.0');
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const q = query(
        collection(db, 'users'),
        where('division', '==', division)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setPlayers(data);
      setLoading(false);
    };

    fetchPlayers();
  }, [division]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>

      <label htmlFor="division" className="block mb-2 font-medium">
        Select Division:
      </label>
      <select
        id="division"
        value={division}
        onChange={e => setDivision(e.target.value)}
        className="mb-6 p-2 border rounded"
      >
        {DIVISIONS.map(div => (
          <option key={div} value={div}>
            {div}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <ul className="space-y-2">
          {players.length === 0 ? (
            <li>No players found in division {division}.</li>
          ) : (
            players.map((player, idx) => (
              <li key={idx} className="border p-4 rounded shadow">
                <p className="font-semibold">{player.firstName} {player.lastName}</p>
                <p className="text-sm text-gray-600">Wins: {player.wins || 0} | Losses: {player.losses || 0}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </main>
  );
}

