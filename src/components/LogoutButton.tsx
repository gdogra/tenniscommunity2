'use client';

import { supabase } from '@/lib/supabase';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
      Log out
    </button>
  );
}
