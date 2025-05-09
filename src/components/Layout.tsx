'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from './LogoutButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="text-xl font-bold">🎾 Tennis App</div>
        <nav className="space-x-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <Link href="/matches" className="text-blue-600 hover:underline">Matches</Link>
          <Link href="/players" className="text-blue-600 hover:underline">Players</Link>
          <Link href="/profile" className="text-blue-600 hover:underline">Profile</Link>
          {user && <LogoutButton />}
        </nav>
      </header>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}

