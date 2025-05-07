'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';

export default function AuditLog() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      const snap = await getDocs(query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc')));
      const result = snap.docs.map((doc) => doc.data());
      setLogs(result);
    };

    loadLogs();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Audit Log</h3>
      {logs.length === 0 ? (
        <p className="text-gray-500">No audit records found.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {logs.map((log, i) => (
            <li key={i} className="border-b pb-2">
              <strong>{log.user}</strong> ({log.email}) — {log.action}
              <div className="text-xs text-gray-400">
                {log.timestamp?.toDate ? format(log.timestamp.toDate(), 'MMM d, yyyy h:mm a') : '–'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
