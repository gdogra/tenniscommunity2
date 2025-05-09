'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface Player {
  name: string;
  match_wins: number;
  match_losses: number;
  match_win_pct: number;
  game_win_pct: number;
  area: string;
}

interface Match {
  date: string;
  winner: string;
  opponent: string;
  sets: string[];
}

const divisions = ['3.6', '4.0', '4.5', '5.0'];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filtered, setFiltered] = useState<Player[]>([]);
  const [lastMatchMap, setLastMatchMap] = useState<Record<string, string>>({});
  const [division, setDivision] = useState('4.0');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      const ref = collection(db, `leagues/spring-2025/players-${division}`);
      const q = query(ref, orderBy('match_win_pct', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => doc.data() as Player);
      setPlayers(data);
      setFiltered(data);
      setLoading(false);

      // 🕒 Fetch most recent matches
      const map: Record<string, string> = {};
      await Promise.all(
        data.map(async (p) => {
          const matchRef = collection(db, `leagues/spring-2025/matches-${division}`);
          const mq = query(
            matchRef,
            where('winner', '==', p.name),
            orderBy('date', 'desc'),
            limit(1),
          );
          const msnap = await getDocs(mq);
          if (!msnap.empty) {
            map[p.name] = msnap.docs[0].data().date;
          }
        }),
      );
      setLastMatchMap(map);
    }

    fetchPlayers();
  }, [division]);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = players.filter(
      (p) => p.name.toLowerCase().includes(lower) || p.area.toLowerCase().includes(lower),
    );
    setFiltered(filtered);
  }, [search, players]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Leaderboard – Division {division}</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          className="border px-2 py-1 rounded"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          {divisions.map((div) => (
            <option key={div} value={div}>
              Division {div}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search players or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-full sm:w-64"
        />
      </div>

      {loading ? (
        <p>Loading players...</p>
      ) : (
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-2 py-1">Player</th>
              <th className="border px-2 py-1 text-center">Wins</th>
              <th className="border px-2 py-1 text-center">Losses</th>
              <th className="border px-2 py-1 text-center">% Wins</th>
              <th className="border px-2 py-1 text-center">% Games</th>
              <th className="border px-2 py-1">Area</th>
              <th className="border px-2 py-1 text-center">🕒 Last Match</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-2 py-1">
                  <Link
                    href={`/leaderboard/${slugify(p.name)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {p.name}
                  </Link>
                  {i === 0 && <span className="text-yellow-600 ml-1">🏅</span>}
                  {p.match_losses === 0 && p.match_wins > 0 && (
                    <span className="text-green-600 ml-1">🛡</span>
                  )}
                </td>
                <td className="border px-2 py-1 text-center">{p.match_wins}</td>
                <td className="border px-2 py-1 text-center">{p.match_losses}</td>
                <td className="border px-2 py-1 text-center">{p.match_win_pct.toFixed(2)}%</td>
                <td className="border px-2 py-1 text-center">{p.game_win_pct.toFixed(1)}%</td>
                <td className="border px-2 py-1">{p.area}</td>
                <td className="border px-2 py-1 text-center">{lastMatchMap[p.name] || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
