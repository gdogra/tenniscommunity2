import { db } from '@/lib/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
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
  date: string; // YYYY-MM-DD
}

function getWeek(dateStr: string): string {
  const d = new Date(dateStr);
  const oneJan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((+d - +oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
  return `W${week} ${d.getFullYear()}`;
}

export default async function PlayerPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const playerSnap = await getDoc(collection(db, 'players').doc(slug));
  if (!playerSnap.exists()) notFound();
  const player = playerSnap.data() as Player;

  const divisions = ['3.6', '4.0', '4.5', '5.0'];
  let allMatches: Match[] = [];

  for (const div of divisions) {
    const base = collection(db, `leagues/spring-2025/matches-${div}`);
    const q1 = query(base, where('winner', '==', player.name));
    const q2 = query(base, where('opponent', '==', player.name));
    const [wins, losses] = await Promise.all([getDocs(q1), getDocs(q2)]);
    allMatches.push(
      ...wins.docs.map((doc) => doc.data() as Match),
      ...losses.docs.map((doc) => doc.data() as Match),
    );
  }

  allMatches.sort((a, b) => a.date.localeCompare(b.date));

  const trendData = allMatches.map((m) => ({
    date: m.date,
    result: m.winner === player.name ? 1 : 0,
  }));

  const weeklyCounts: Record<string, number> = {};
  allMatches.forEach((m) => {
    const week = getWeek(m.date);
    weeklyCounts[week] = (weeklyCounts[week] || 0) + 1;
  });

  const weeklyData = Object.entries(weeklyCounts).map(([week, count]) => ({
    week,
    matches: count,
  }));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{player.name}</h1>
      <p className="text-gray-600 mb-4">{player.area}</p>
      <ul className="mb-6 space-y-1">
        <li>🏆 Wins: {player.match_wins}</li>
        <li>❌ Losses: {player.match_losses}</li>
        <li>✅ Win %: {player.match_win_pct.toFixed(2)}%</li>
        <li>🎯 Game %: {player.game_win_pct.toFixed(1)}%</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Win/Loss Trend</h2>
      {trendData.length === 0 ? (
        <p>No matches played.</p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              ticks={[0, 1]}
              domain={[0, 1]}
              tickFormatter={(v) => (v === 1 ? 'Win' : 'Loss')}
            />
            <Tooltip formatter={(v) => (v === 1 ? 'Win' : 'Loss')} />
            <Line
              type="monotone"
              dataKey="result"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ fill: '#4CAF50', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-2">Matches Per Week</h2>
      {weeklyData.length === 0 ? (
        <p>No match history to chart.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="matches" fill="#2196F3" name="Matches" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-2">Match History</h2>
      <ul className="space-y-2">
        {allMatches.map((match, i) => (
          <li key={i} className="border p-2 rounded-md">
            <strong>
              {match.winner === player.name ? '🏆 vs' : '❌ vs'} {match.opponent}
            </strong>{' '}
            – Sets: {match.sets.join(', ')} – {match.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
