import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface Player {
  name: string;
  area: string;
  match_wins: number;
  match_losses: number;
  match_win_pct: number;
  game_win_pct: number;
}

interface Match {
  winner: string;
  opponent: string;
  sets: string[];
  date: string;
}

export default async function HeadToHeadPage(context: { params: { comparison: string } }) {
  const comparisonParam = (await context).params.comparison;
  const [slugA, slugB] = decodeURIComponent(comparisonParam)
    .split('_vs_')
    .map((s) => s.trim());

  if (!slugA || !slugB || slugA === slugB) notFound();

  const [playerASnap, playerBSnap] = await Promise.all([
    getDoc(doc(db, 'players', slugA)),
    getDoc(doc(db, 'players', slugB)),
  ]);

  if (!playerASnap.exists() || !playerBSnap.exists()) notFound();

  const playerA = playerASnap.data() as Player;
  const playerB = playerBSnap.data() as Player;

  const divisions = ['3.6', '4.0', '4.5', '5.0'];
  let headToHeadMatches: Match[] = [];

  for (const div of divisions) {
    const ref = collection(db, `leagues/spring-2025/matches-${div}`);
    const q = query(
      ref,
      where('winner', 'in', [playerA.name, playerB.name]),
      where('opponent', 'in', [playerA.name, playerB.name]),
    );
    const snap = await getDocs(q);
    const matches = snap.docs.map((doc) => doc.data() as Match);
    headToHeadMatches.push(...matches);
  }

  headToHeadMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const winsA = headToHeadMatches.filter((m) => m.winner === playerA.name).length;
  const winsB = headToHeadMatches.filter((m) => m.winner === playerB.name).length;

  const chartData = [
    {
      stat: 'Match Wins',
      [playerA.name]: playerA.match_wins,
      [playerB.name]: playerB.match_wins,
    },
    {
      stat: 'Game Win %',
      [playerA.name]: playerA.game_win_pct,
      [playerB.name]: playerB.game_win_pct,
    },
    {
      stat: 'Head-to-Head Wins',
      [playerA.name]: winsA,
      [playerB.name]: winsB,
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        🆚 {playerA.name} vs {playerB.name}
      </h1>

      <p className="mb-4 text-sm text-gray-500">
        {playerA.area} &mdash; {playerB.area}
      </p>

      <div className="mb-10">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="stat" />
            <Tooltip />
            <Legend />
            <Bar dataKey={playerA.name} fill="#3B82F6" />
            <Bar dataKey={playerB.name} fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-xl font-semibold mb-2">Match History</h2>
      {headToHeadMatches.length === 0 ? (
        <p>No direct matches between these players.</p>
      ) : (
        <ul className="space-y-2">
          {headToHeadMatches.map((match, i) => (
            <li key={i} className="border p-2 rounded bg-white">
              <strong>
                {match.winner} vs {match.opponent}
              </strong>{' '}
              – Sets: {match.sets.join(', ')} – {match.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
