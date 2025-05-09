// src/app/dashboard/matches/page.tsx
'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useMatchHistory } from '@/hooks/useMatchHistory';

export default function MatchHistoryPage() {
  const { matches } = useMatchHistory();

  return (
    <RequireAuth>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Match History 🎾</h2>
        {matches.length === 0 ? (
          <p>No matches found.</p>
        ) : (
          <ul className="space-y-4">
            {matches.map((match) => (
              <li
                key={match.id}
                className="bg-white border p-4 rounded shadow-md"
              >
                <p className="text-gray-700">
                  <strong>Opponent:</strong> {match.player2Name || 'Unknown'}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong>{' '}
                  {new Date(match.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Score:</strong> {match.score}
                </p>
                <p className="text-gray-700">
                  <strong>Result:</strong>{' '}
                  {match.winnerId === match.player1Id ? 'Win' : 'Loss'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </RequireAuth>
  );
}

