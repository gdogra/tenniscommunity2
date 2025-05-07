'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import Image from 'next/image';

type Player = {
  name: string;
  wins: number;
  losses: number;
  area: string;
  avatarUrl?: string;
};

export default function PlayerTablePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      const snapshot = await getDocs(collection(db, 'players'));
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as Player),
        id: doc.id,
      }));
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const filtered = players.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <input
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search players..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-2">Player</th>
            <th className="p-2">Wins</th>
            <th className="p-2">Losses</th>
            <th className="p-2">Area</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((player) => (
            <tr key={player.id} className="border-t hover:bg-gray-50">
              <td className="p-2 flex items-center gap-2">
                <Image
                  src={player.avatarUrl || '/default-avatar.png'}
                  alt={player.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <Link href={`/profile/${player.id}`} className="hover:underline">
                  {player.name}
                </Link>
              </td>
              <td className="p-2">{player.wins}</td>
              <td className="p-2">{player.losses}</td>
              <td className="p-2">{player.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
