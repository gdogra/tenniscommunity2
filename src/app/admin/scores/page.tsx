'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/AdminLayout';

interface Match {
  id: string;
  player1: string;
  player2: string;
  winner: string;
  score: string;
  played_at: string;
}

export default function AdminScoresPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .order('played_at', { ascending: false });

      if (error) {
        console.error('Error fetching matches:', error);
      } else {
        setMatches(data || []);
      }

      setLoading(false);
    };

    fetchMatches();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Match Scores</h2>

      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No matches recorded.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Player 1</th>
              <th className="border px-4 py-2 text-left">Player 2</th>
              <th className="border px-4 py-2 text-left">Winner</th>
              <th className="border px-4 py-2 text-left">Score</th>
              <th className="border px-4 py-2 text-left">Played At</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{match.player1}</td>
                <td className="border px-4 py-2">{match.player2}</td>
                <td className="border px-4 py-2 font-semibold">{match.winner}</td>
                <td className="border px-4 py-2">{match.score}</td>
                <td className="border px-4 py-2 text-sm">{new Date(match.played_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}

