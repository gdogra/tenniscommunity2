'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-green-700">Admin Panel</h1>
          <p className="text-sm text-gray-500">Manage your league</p>
        </div>

        <nav className="flex flex-col px-6 py-4 space-y-2 text-gray-700">
          <AdminNavLink href="/admin">🛠 Dashboard</AdminNavLink>
          <AdminNavLink href="/admin/players">👤 Players</AdminNavLink>
          <AdminNavLink href="/admin/scores">🏆 Scores</AdminNavLink>
          <AdminNavLink href="/admin/seasons">📅 Seasons</AdminNavLink>
          <AdminNavLink href="/admin/logs">📜 Logs</AdminNavLink>
        </nav>

        <div className="px-6 mt-auto pb-6">
          <Button
            onClick={() => {
              router.push('/dashboard');
            }}
            variant="outline"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Back to App
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-10">{children}</main>
    </div>
  );
}

function AdminNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="hover:bg-gray-100 rounded px-3 py-2 transition text-base font-medium"
    >
      {children}
    </Link>
  );
}

