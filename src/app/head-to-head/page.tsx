'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function HeadToHeadSelector() {
  const [players, setPlayers] = useState<string[]>([]);
  const [playerA, setPlayerA] = useState('');
  const [playerB, setPlayerB] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchPlayers() {
      const snap = await getDocs(collection(db, 'players'));
      const names = snap.docs.map((doc) => doc.id);
      setPlayers(names.sort());
    }
    fetchPlayers();
  }, []);

  const handleSubmit = () => {
    if (!playerA || !playerB || playerA === playerB) return;
    const url = `/head-to-head/${encodeURIComponent(playerA)}_vs_${encodeURIComponent(playerB)}`;
    router.push(url);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Head-to-Head Comparison</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Player A:</label>
          <select
            className="w-full border p-2 rounded"
            value={playerA}
            onChange={(e) => setPlayerA(e.target.value)}
          >
            <option value="">Select a player</option>
            {players.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold">Player B:</label>
          <select
            className="w-full border p-2 rounded"
            value={playerB}
            onChange={(e) => setPlayerB(e.target.value)}
          >
            <option value="">Select a player</option>
            {players.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleSubmit}
          disabled={!playerA || !playerB || playerA === playerB}
        >
          Compare
        </button>
      </div>
    </div>
  );
}
