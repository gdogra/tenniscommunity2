import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';

interface Player {
  name: string;
  match_wins: number;
  match_losses: number;
  match_win_pct: number;
  area: string;
}

export default async function AdminLeaderboard() {
  const snap = await getDocs(collection(db, 'players'));
  const players = snap.docs.map((doc) => doc.data()) as Player[];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leaderboard (Admin View)</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Player</th>
            <th className="p-2 border">Wins</th>
            <th className="p-2 border">Losses</th>
            <th className="p-2 border">Win %</th>
            <th className="p-2 border">Area</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.name}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.match_wins}</td>
              <td className="p-2 border">{p.match_losses}</td>
              <td className="p-2 border">{p.match_win_pct.toFixed(2)}%</td>
              <td className="p-2 border">{p.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
