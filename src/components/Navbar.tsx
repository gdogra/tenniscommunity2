'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 bg-white border-b shadow z-50 p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link href="/dashboard">🏠 Dashboard</Link>
        <Link href="/leaderboard">🏆 Leaderboard</Link>
        <Link href="/players">🎾 Players</Link>
        <Link href="/matches">📅 Matches</Link>
        {user?.isAdmin && <Link href="/admin">👥 Admin</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-2">👤 {user.email}</span>
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="mr-2">
              Login
            </Link>
            <Link href="/signup">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
