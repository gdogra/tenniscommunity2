'use client';
import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';

type Player = {
  id: string;
  name: string;
  wins: number;
  losses: number;
  area: string;
  avatarUrl?: string;
};

export default function PlayerTable({ players }: { players: Player[] }) {
  const [filter, setFilter] = useState('');

  const filtered = players.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="bg-white rounded shadow p-4">
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 p-2 border w-full rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Avatar</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Wins</th>
            <th className="p-2 text-left">Losses</th>
            <th className="p-2 text-left">Area</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((player) => (
            <tr key={player.id} className="hover:bg-gray-50">
              <td className="p-2">
                <Image
                  src={player.avatarUrl || '/default-avatar.png'}
                  alt={player.name}
                  className="w-8 h-8 rounded-full"
                  width="40"
                  height="40"
                />
              </td>
              <td className="p-2">
                <Link href={`/profile/${player.id}`} className="text-blue-600 hover:underline">
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
