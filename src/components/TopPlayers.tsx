// src/components/TopPlayers.tsx
import React from 'react';

interface Player {
  id: string;
  display_name: string;
  skill_level: string;
  profile_image?: string;
}

export const TopPlayers = ({ players }: { players: Player[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {players.map((player) => (
        <div key={player.id} className="bg-white p-4 rounded shadow">
          <img
            src={
              player.profile_image ||
              `https://ui-avatars.com/api/?name=${player.display_name}&background=16a34a&color=fff`
            }
            alt={player.display_name}
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <div className="text-center">
            <h3 className="font-bold">{player.display_name}</h3>
            <p className="text-sm text-gray-500">Level {player.skill_level}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

