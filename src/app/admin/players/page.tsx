// src/app/admin/players/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Player {
  id: string;
  display_name: string;
  email: string;
  skill_level: string;
  role: string;
}

export default function ManagePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (!error && data) setPlayers(data);
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Players</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Level</th>
            <th className="p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-b">
              <td className="p-2">{player.display_name}</td>
              <td className="p-2">{player.email}</td>
              <td className="p-2">{player.skill_level}</td>
              <td className="p-2">{player.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

