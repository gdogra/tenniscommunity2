import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Player = {
  name: string;
  wins: number;
  losses: number;
  area: string;
  avatarUrl?: string;
};

export default async function PlayerProfile({ params }: { params: { slug: string } }) {
  const docRef = doc(db, 'players', params.slug);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return notFound();

  const player = snapshot.data() as Player;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white rounded shadow p-6">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={player.avatarUrl || '/default-avatar.png'}
          alt={player.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{player.name}</h1>
          <p className="text-sm text-gray-600">{player.area}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center mb-6">
        <div>
          <div className="text-lg font-semibold">{player.wins}</div>
          <div className="text-gray-500 text-sm">Wins</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{player.losses}</div>
          <div className="text-gray-500 text-sm">Losses</div>
        </div>
      </div>

      {/* Optionally: Matches Played */}
      {/* 
      <h2 className="text-lg font-semibold mb-2">Recent Matches</h2>
      <div className="text-gray-500 text-sm">[Future: fetch and render match history]</div> 
      */}
    </div>
  );
}
