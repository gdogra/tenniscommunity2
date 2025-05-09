'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';

interface Player {
  uid: string;
  firstName: string;
  lastName: string;
  division: string;
  wins: number;
  losses: number;
}

const divisions = ['3.6', '4.0', '4.5', '5.0'];

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>('');

  useEffect(() => {
    const fetchPlayers = async () => {
      const baseQuery = selectedDivision
        ? query(collection(db, 'players'), where('division', '==', selectedDivision))
        : collection(db, 'players');

      const snapshot = await getDocs(baseQuery);
      const data = snapshot.docs.map((doc) => doc.data() as Player);
      setPlayers(data);
    };

    fetchPlayers();
  }, [selectedDivision]);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">🎾 Players</h1>
        <label className="block mt-4 mb-2 font-semibold">Filter by Division:</label>
        <select
          className="p-2 border rounded-md"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
        >
          <option value="">All</option>
          {divisions.map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>
      </div>

      {players.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <table className="w-full table-auto border-collapse bg-white shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Division</th>
              <th className="p-3 text-left">Wins</th>
              <th className="p-3 text-left">Losses</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.uid} className="border-t">
                <td className="p-3">{player.firstName} {player.lastName}</td>
                <td className="p-3">{player.division}</td>
                <td className="p-3">{player.wins}</td>
                <td className="p-3">{player.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

