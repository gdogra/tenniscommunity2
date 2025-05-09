// src/app/admin/layout.tsx
import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <nav className="mb-6 flex gap-6 border-b pb-4">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/scores">Manage Scores</Link>
        <Link href="/admin/seasons">Manage Seasons</Link>
      </nav>
      {children}
    </div>
  );
}

