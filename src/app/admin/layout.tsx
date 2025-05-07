import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">🎾 Admin Panel</h1>
            <nav className="space-x-4 text-sm">
              <Link href="/admin" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
              <Link href="/leaderboard/admin" className="text-blue-600 hover:underline">
                Leaderboard
              </Link>
              <Link href="/admin/users" className="text-blue-600 hover:underline">
                Manage Users
              </Link>
              <Link href="/admin/logs" className="text-blue-600 hover:underline">
                Logs
              </Link>
              <Link href="/head-to-head" className="text-blue-600 hover:underline">
                Compare
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </div>
    </AdminGuard>
  );
}
