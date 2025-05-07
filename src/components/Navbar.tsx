// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center mb-6">
      <Link href="/" className="text-lg font-semibold">
        Tennis Community
      </Link>
      <div className="flex space-x-4">
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup" className="bg-green-600 text-white px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
