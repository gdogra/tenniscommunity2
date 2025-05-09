'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => => {
      setAdminEmail(user?.email || null);
    });
  }, []);

  const fetchUsers = async () => {
    const snap = await getDocs(collection(db, 'users'));
    setUsers(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const logAction = async (action: string, targetEmail: string) => {
    await addDoc(collection(db, 'logs/adminActivity'), {
      action,
      targetUser: targetEmail,
      performedBy: adminEmail,
      timestamp: new Date().toISOString(),
    });
  };

  const toggleRole = async (id: string, role: string, email: string) => {
    const newRole = role === 'admin' ? 'player' : 'admin';
    await updateDoc(doc(db, 'users', id), { role: newRole });
    await logAction(newRole === 'admin' ? 'promote_to_admin' : 'demote_to_player', email);
    fetchUsers();
  };

  const toggleSuspension = async (id: string, current: boolean, email: string) => {
    const newState = !current;
    await updateDoc(doc(db, 'users', id), { suspended: newState });
    await logAction(newState ? 'suspend_user' : 'unsuspend_user', email);
    fetchUsers();
  };

  const deleteUser = async (id: string, email: string) => {
    if (confirm(`Are you sure you want to delete ${email}?`)) {
      await deleteDoc(doc(db, 'users', id));
      await logAction('delete_user', email);
      fetchUsers();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠 Admin: Manage Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Suspended</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-sm">
                <td className="p-2 border">{u.name || '—'}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border capitalize">{u.role}</td>
                <td className="p-2 border text-center">{u.suspended ? '✅' : '—'}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className={`px-2 py-1 rounded text-white text-xs ${
                      u.role === 'admin' ? 'bg-red-600' : 'bg-green-600'
                    }`}
                    onClick={() => toggleRole(u.id, u.role, u.email)}
                  >
                    {u.role === 'admin' ? 'Demote' : 'Promote'}
                  </button>
                  <button
                    className={`px-2 py-1 rounded text-white text-xs ${
                      u.suspended ? 'bg-yellow-600' : 'bg-blue-600'
                    }`}
                    onClick={() => toggleSuspension(u.id, u.suspended ?? false, u.email)}
                  >
                    {u.suspended ? 'Unsuspend' : 'Suspend'}
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-600 text-white rounded text-xs"
                    onClick={() => deleteUser(u.id, u.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
