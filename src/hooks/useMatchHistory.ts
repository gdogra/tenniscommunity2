import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

export function useMatchHistory() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchMatches = async () => {
      const q = query(
        collection(db, 'matches'),
        where('player1Id', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMatches(data);
    };

    fetchMatches();
  }, [user]);

  return { matches };
}

