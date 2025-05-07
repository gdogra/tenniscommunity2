'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
    return () => unsub();
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4 mt-4">
      <Image
        src={user.photoURL || '/default-avatar.png'}
        alt="User Avatar"
        className="w-16 h-16 rounded-full object-cover"
        width="40"
        height="40"
      />
      <div>
        <p className="text-lg font-semibold">{user.displayName}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
