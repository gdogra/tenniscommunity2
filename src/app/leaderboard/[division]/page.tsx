'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';

export default function LeaderboardPage({ params }: { params: { division: string } }) {
  const division = decodeURIComponent(params.division);
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const q = query(collection(db, 'users'), where('division', '==', division));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => doc.data());

      const withStats = data.map((player: any) => {
        const wins = player.wins || 0;
        const losses = player.losses || 0;
        const total = wins + losses;
        const winPct = total > 0 ? Math.round((wins / total) * 100) : 0;
        return { ...player, winPct };
      });

      setPlayers(withStats.sort((a, b) => b.winPct - a.winPct));
    };

    fetchPlayers();
  }, [division]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Leaderboard – Division {division}</h1>

      {players.length === 0 ? (
        <p>No players found in this division.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Wins</th>
              <th className="p-2">Losses</th>
              <th className="p-2">Win %</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.uid} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.firstName} {p.lastName}</td>
                <td className="p-2">{p.wins}</td>
                <td className="p-2">{p.losses}</td>
                <td className="p-2">{p.winPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

