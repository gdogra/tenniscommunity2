'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { format, parseISO, isAfter, isBefore } from 'date-fns';

type Match = {
  id: string;
  opponent: string;
  sets: string[];
  date: any;
};

export default function MyMatches({ highlightId }: { highlightId?: string }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Filters
  const [opponentFilter, setOpponentFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState<'date' | 'opponent'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const unsub = supabase.auth.onAuthStateChange((event, session) => => {
      if (!user) return;

      const playerSnap = await getDocs(
        query(collection(db, 'players'), where('email', '==', user.email)),
      );
      const player = playerSnap.docs[0]?.data();
      const playerName = player?.name;
      const division = player?.division;
      if (!playerName || !division) return;

      const matchSnap = await getDocs(
        query(
          collection(db, `leagues/spring-2025/matches-${division}`),
          where('winner', '==', playerName),
          orderBy('date', 'desc'),
        ),
      );

      const result = matchSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Match[];

      setMatches(result);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Apply filters
  const filtered = matches.filter((m) => {
    const matchDate = m.date.toDate();
    const opponentMatch = m.opponent.toLowerCase().includes(opponentFilter.toLowerCase());
    const afterStart = !startDate || isAfter(matchDate, parseISO(startDate) || new Date(0));
    const beforeEnd = !endDate || isBefore(matchDate, parseISO(endDate) || new Date());

    return opponentMatch && afterStart && beforeEnd;
  });

  // Apply sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date') {
      const diff = a.date.toMillis() - b.date.toMillis();
      return sortDir === 'asc' ? diff : -diff;
    } else {
      const comp = a.opponent.localeCompare(b.opponent);
      return sortDir === 'asc' ? comp : -comp;
    }
  });

  const visibleMatches = showAll ? sorted : sorted.slice(0, 10);

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-bold">My Matches</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 text-sm items-center">
        <input
          type="text"
          placeholder="Filter by opponent"
          className="border px-2 py-1 rounded w-full sm:w-1/3"
          value={opponentFilter}
          onChange={(e) => setOpponentFilter(e.target.value)}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Sorting */}
      <div className="flex gap-4 text-sm items-center">
        <label>
          Sort by:
          <select
            className="ml-2 border px-2 py-1 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'opponent')}
          >
            <option value="date">Match Date</option>
            <option value="opponent">Opponent Name</option>
          </select>
        </label>
        <button
          className="text-blue-600 underline"
          onClick={() => setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        >
          {sortDir === 'asc' ? '⬆ Ascending' : '⬇ Descending'}
        </button>
      </div>

      {/* Match List */}
      {loading ? (
        <p>Loading...</p>
      ) : visibleMatches.length === 0 ? (
        <p className="text-gray-500">No matches found.</p>
      ) : (
        <>
          <div className="space-y-3">
            {visibleMatches.map((m) => (
              <div
                key={m.id}
                className={`border rounded-md px-4 py-3 bg-white shadow-sm transition ${
                  m.id === highlightId ? 'animate-flash border-green-500' : ''
                }`}
              >
                <div className="text-sm font-medium">
                  vs. <span className="text-blue-600">{m.opponent}</span>
                </div>
                <div className="text-sm text-gray-600">{m.sets?.filter(Boolean).join(' / ')}</div>
                <div className="text-xs text-gray-400">
                  {format(m.date.toDate(), 'MMM d, yyyy')}
                </div>
              </div>
            ))}
          </div>

          {sorted.length > 10 && (
            <button
              className="text-sm text-blue-600 underline mt-2"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Less' : 'Show All'}
            </button>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes flash {
          0% {
            background-color: #e6fffa;
          }
          100% {
            background-color: white;
          }
        }
        .animate-flash {
          animation: flash 2s ease-out;
        }
      `}</style>
    </div>
  );
}
