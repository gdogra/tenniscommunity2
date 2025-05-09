// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useFirestore } from '@/hooks/useFirestore';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

import { TopPlayers } from '@/components/TopPlayers';

interface Player {
  id: string;
  display_name?: string;
  skill_level?: string;
  wins?: number;
  losses?: number;
  profile_image?: string;
  points?: number;
}

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { playerProfiles } = useFirestore();
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const players = await playerProfiles.getAll();
        const sorted = [...players]
          .sort((a, b) => (b.points || 0) - (a.points || 0))
          .slice(0, 3);
        setTopPlayers(sorted);
      } catch (err) {
        console.error('Error loading players', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlayers();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google sign-in failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-14 px-6 rounded-lg mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Welcome to Tennis Community</h1>
        <p className="text-lg mb-6">Connect with local tennis players, track matches, and improve your game</p>

        {user ? (
          <Button onClick={() => router.push('/dashboard')} className="bg-white text-green-700 hover:bg-gray-100">
            Go to Dashboard
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push('/login')} variant="outline" className="border-white text-white">Login</Button>
            <Button onClick={() => router.push('/register')} className="bg-white text-green-700">Register</Button>
            <Button onClick={handleGoogleSignIn} className="bg-blue-100 text-blue-800">Sign in with Google</Button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <h2 className="text-2xl font-bold text-center mb-8">Why Join Our Tennis Community?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Feature icon="fas fa-user-friends" title="Find Players" description="Connect with players of similar skill in your area." />
        <Feature icon="fas fa-trophy" title="Challenge Matches" description="Issue and accept match challenges." />
        <Feature icon="fas fa-chart-line" title="Track Progress" description="Track wins, losses and match history." />
      </div>

      {/* Top Players Section */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">Top Players</h2>
        <p className="text-gray-600 mb-6">Our highest ranked community members</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TopPlayers players={topPlayers} />
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 p-8 rounded-lg text-center border">
        <h2 className="text-xl font-semibold mb-2">Ready to join our community?</h2>
        <p className="text-gray-600 mb-4">Sign up and connect with tennis players in your area.</p>
        <Button onClick={() => router.push('/register')}>Create Your Account</Button>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border text-center">
      <div className="text-3xl text-green-600 mb-3">
        <i className={icon}></i>
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

