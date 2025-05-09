'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Matches', href: '/dashboard/matches' },
  { label: 'Players', href: '/dashboard/players' },
  { label: 'Profile', href: '/dashboard/profile' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-4 p-4 border-r border-gray-200 bg-white min-h-screen w-48">
      <h2 className="text-xl font-semibold mb-4">🏸 Tennis App</h2>
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            'block text-sm px-2 py-1 rounded hover:bg-gray-100',
            pathname === href ? 'bg-gray-100 font-medium text-blue-600' : 'text-gray-700'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

