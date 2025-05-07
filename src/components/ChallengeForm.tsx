'use client';

import { useState } from 'react';
import { createChallenge, getAllPlayers } from '@/lib/firestoreHelpers';
import SkillSelector from './SkillSelector';
import { useEffect } from 'react';

interface ChallengeFormProps {
  user: any;
}

export default function ChallengeForm({ user }: ChallengeFormProps) {
  const [opponent, setOpponent] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    getAllPlayers().then((data) => {
      const others = data.filter((p) => p.id !== user.uid);
      setPlayers(others);
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!opponent) return alert('Please choose an opponent');
    await createChallenge({
      createdBy: user.uid,
      opponent,
      skillLevel,
    });
    alert('Challenge issued!');
    setOpponent('');
    setSkillLevel('Beginner');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Opponent:
        <select
          className="w-full border p-2 rounded mt-1"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          required
        >
          <option value="">Select player</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.email || player.id}
            </option>
          ))}
        </select>
      </label>

      <SkillSelector value={skillLevel} onChange={setSkillLevel} />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Challenge
      </button>
    </form>
  );
}
