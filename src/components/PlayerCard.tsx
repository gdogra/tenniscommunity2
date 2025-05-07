import React from 'react';

interface PlayerCardProps {
  name: string;
  skill: string;
  onChallenge?: () => void;
}

export default function PlayerCard({ name, skill, onChallenge }: PlayerCardProps) {
  return (
    <div className="border p-4 rounded shadow mb-2">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-gray-600">Skill: {skill}</p>
      {onChallenge && (
        <button
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onChallenge}
        >
          Challenge
        </button>
      )}
    </div>
  );
}
