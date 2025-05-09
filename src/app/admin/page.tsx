'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Users, ClipboardList, BarChart4, ArrowRightLeft } from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = supabase.auth.onAuthStateChange((event, session) => => {
      if (!user) {
        router.push('/login');
        return;
      }

      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      const role = snap.exists() ? snap.data().role : 'player';

      if (role !== 'admin') {
        router.push('/unauthorized');
        return;
      }

      setAuthorized(true);
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!authorized) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-green-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600 mb-6">Welcome, admin. Choose a section to manage:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminLink href="/admin/players" icon={<Users className="w-5 h-5" />}>
            Manage Players
          </AdminLink>
          <AdminLink href="/admin/scores" icon={<ClipboardList className="w-5 h-5" />}>
            Manage Scores
          </AdminLink>
          <AdminLink href="/admin/seasons" icon={<BarChart4 className="w-5 h-5" />}>
            Season Settings
          </AdminLink>
          <AdminLink href="/admin/logs" icon={<ArrowRightLeft className="w-5 h-5" />}>
            Audit Log
          </AdminLink>
        </div>
      </div>
    </div>
  );
}

function AdminLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition border border-gray-200 shadow-sm"
    >
      <div className="text-green-600">{icon}</div>
      <span className="font-medium text-gray-800">{children}</span>
    </Link>
  );
}

