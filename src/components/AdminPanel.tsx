'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';
import AdminUserRow from './AdminUserRow';
import AuditLog from './AuditLog';

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [tab, setTab] = useState<'users' | 'logs'>('users');

  useEffect(() => {
    const loadUsers = async () => {
      const snap = await getDocs(collection(db, 'players'));
      const result = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(result);
    };

    loadUsers();
  }, []);

  return (
    <div className="bg-white border rounded p-6 shadow space-y-6">
      <div className="flex gap-4">
        <button
          className={`text-sm px-3 py-1 rounded ${
            tab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTab('users')}
        >
          Manage Users
        </button>
        <button
          className={`text-sm px-3 py-1 rounded ${
            tab === 'logs' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTab('logs')}
        >
          Audit Log
        </button>
      </div>

      {tab === 'users' ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-600 border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Suspended</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <AdminUserRow key={u.id} user={u} />
            ))}
          </tbody>
        </table>
      ) : (
        <AuditLog />
      )}
    </div>
  );
}
