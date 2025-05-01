"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Player {
  id: string;
  name: string;
  wins: number;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    const q = query(collection(db, "players"), orderBy("wins", "desc"));
    const snapshot = await getDocs(q);
    const playersList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Player[];
    setPlayers(playersList);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>

        {loading ? (
          <div>Loading leaderboard...</div>
        ) : players.length === 0 ? (
          <div>No players yet. Add players first!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Rank</th>
                  <th className="px-4 py-2 text-left">Player</th>
                  <th className="px-4 py-2 text-left">Wins</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={player.id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{player.name}</td>
                    <td className="px-4 py-2">{player.wins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

