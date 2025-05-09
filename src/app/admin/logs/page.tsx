import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase';
import AdminGuard from '@/components/AdminGuard';
import { format } from 'date-fns';

export default async function AdminLogsPage() {
  const q = query(collection(db, 'logs/adminActivity'), orderBy('timestamp', 'desc'));
  const snap = await getDocs(q);
  const logs = snap.docs.map((doc) => doc.data());

  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">📝 Audit Log: Match Changes</h1>

        {logs.length === 0 ? (
          <p className="text-gray-500">No audit activity recorded yet.</p>
        ) : (
          <ul className="space-y-3">
            {logs.map((log: any, idx: number) => (
              <li key={idx} className="bg-white border rounded p-4 shadow-sm text-sm">
                <div className="mb-1">
                  <span className="font-semibold">{log.performedBy}</span>{' '}
                  <span className="text-gray-700">performed</span>{' '}
                  <code className="bg-yellow-100 text-yellow-800 px-1 rounded">{log.action}</code>{' '}
                  on opponent{' '}
                  <span className="font-medium text-blue-600">{log.targetOpponent}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {format(log.timestamp.toDate(), 'PPpp')}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminGuard>
  );
}
