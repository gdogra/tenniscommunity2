'use client';

import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Opponent {
  id: string;
  name: string;
}

interface ScoreSubmissionFormProps {
  userId: string;
  opponents: Opponent[];
}

export default function ScoreSubmissionForm({ userId, opponents = [] }: ScoreSubmissionFormProps) {
  const [opponentId, setOpponentId] = useState('');
  const [set1, setSet1] = useState('');
  const [set2, setSet2] = useState('');
  const [set3, setSet3] = useState('');
  const [matchDate, setMatchDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!opponentId || !set1 || !set2 || !matchDate) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const matchData = {
        playerId: userId,
        opponentId,
        set1,
        set2,
        set3: set3 || null,
        matchDate: Timestamp.fromDate(new Date(matchDate)),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, 'matches'), matchData);
      alert('Match submitted successfully!');
      setOpponentId('');
      setSet1('');
      setSet2('');
      setSet3('');
      setMatchDate('');
    } catch (err) {
      console.error('Error submitting match:', err);
      alert('Failed to submit match. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <label className="block">
        Opponent
        <select
          value={opponentId}
          onChange={(e) => setOpponentId(e.target.value)}
          required
          className="block border px-2 py-1 mt-1 w-full"
        >
          <option value="">-- Select Opponent --</option>
          {Array.isArray(opponents) && opponents.length > 0 ? (
            opponents.map((opponent) => (
              <option key={opponent.id} value={opponent.id}>
                {opponent.name}
              </option>
            ))
          ) : (
            <option disabled>No opponents available</option>
          )}
        </select>
      </label>

      <label className="block">
        Set 1
        <input
          type="text"
          value={set1}
          onChange={(e) => setSet1(e.target.value)}
          required
          className="block border px-2 py-1 mt-1 w-full"
        />
      </label>

      <label className="block">
        Set 2
        <input
          type="text"
          value={set2}
          onChange={(e) => setSet2(e.target.value)}
          required
          className="block border px-2 py-1 mt-1 w-full"
        />
      </label>

      <label className="block">
        Set 3 (optional)
        <input
          type="text"
          value={set3}
          onChange={(e) => setSet3(e.target.value)}
          className="block border px-2 py-1 mt-1 w-full"
        />
      </label>

      <label className="block">
        Match Date
        <input
          type="date"
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
          required
          className="block border px-2 py-1 mt-1 w-full"
        />
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Score
      </button>
    </form>
  );
}
