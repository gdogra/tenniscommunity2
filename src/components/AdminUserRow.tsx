'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';

export default function AdminUserRow({ user }: { user: any }) {
  const [role, setRole] = useState(user.role || 'player');
  const [suspended, setSuspended] = useState(user.suspended || false);

  const handleUpdate = async (newData: any) => {
    const ref = doc(db, 'players', user.id);
    await updateDoc(ref, newData);

    await addDoc(collection(db, 'audit_logs'), {
      user: user.name,
      email: user.email,
      action: `Updated: ${JSON.stringify(newData)}`,
      timestamp: serverTimestamp(),
    });
  };

  const toggleAdmin = async () => {
    const newRole = role === 'admin' ? 'player' : 'admin';
    setRole(newRole);
    await handleUpdate({ role: newRole });
  };

  const toggleSuspend = async () => {
    const newStatus = !suspended;
    setSuspended(newStatus);
    await handleUpdate({ suspended: newStatus });
  };

  return (
    <tr className="text-sm text-gray-800">
      <td className="py-2">{user.name}</td>
      <td>{user.email}</td>
      <td>{role}</td>
      <td>{suspended ? 'Yes' : 'No'}</td>
      <td className="space-x-2">
        <button onClick={toggleAdmin} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
          {role === 'admin' ? 'Demote' : 'Promote'}
        </button>
        <button onClick={toggleSuspend} className="bg-red-500 text-white px-2 py-1 rounded text-xs">
          {suspended ? 'Unsuspend' : 'Suspend'}
        </button>
      </td>
    </tr>
  );
}
