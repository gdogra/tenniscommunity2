#!/bin/bash
set -e

echo "🔧 Creating Login page..."
cat > src/app/login/page.tsx <<'EOF'
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </main>
  );
}
EOF

echo "📊 Creating Firestore-connected Dashboard..."
mkdir -p src/app/dashboard

cat > src/app/dashboard/page.tsx <<'EOF'
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';

interface Match {
  id: string;
  opponentId: string;
  matchDate: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchMatches = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'matches'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Match[];
        setMatches(data);
      } catch (err: any) {
        setError('Failed to load matches: ' + err.message);
      }
    };

    fetchMatches();
  }, [user]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🏠 Dashboard</h1>
      {error && <p className="text-red-600">{error}</p>}
      {user && <p className="mb-4">Welcome, {user.email}</p>}
      <ul className="space-y-2">
        {matches.map(match => (
          <li key={match.id} className="border p-2 rounded">
            Match vs {match.opponentId} on {new Date(match.matchDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
EOF

echo "✅ Login and Dashboard pages scaffolded!"

