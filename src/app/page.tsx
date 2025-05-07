'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Example: redirect logged-in users
    const userIsLoggedIn = false; // Replace with real auth check
    if (userIsLoggedIn) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TennisCommunity</h1>
      <p className="text-lg text-gray-600">
        Here&apos;s what’s happening on this season&apos;s leaderboard.
      </p>
    </main>
  );
}
