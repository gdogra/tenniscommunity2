'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';

export default function StandingsTable({ division }: { division: string }) {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, `leagues/spring-2025/players-${division}`));
      const data = snap.docs.map((doc) => doc.data());
      setPlayers(data);
    }
    load();
  }, [division]);

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-2">Player</th>
            <th className="p-2">Wins</th>
            <th className="p-2">Losses</th>
            <th className="p-2">Match Win %</th>
            <th className="p-2">Game Win %</th>
            <th className="p-2">Area</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 text-blue-600 font-medium">{p.name}</td>
              <td className="p-2">{p.wins}</td>
              <td className="p-2">{p.losses}</td>
              <td className="p-2">{p.matchWinPct}</td>
              <td className="p-2">{p.gameWinPct}</td>
              <td className="p-2">{p.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
