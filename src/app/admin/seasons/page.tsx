'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';

interface Season {
  id: string;
  name: string;
  status: 'current' | 'archived';
  started_at: string;
}

export default function AdminSeasonsPage() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const fetchSeasons = async () => {
      const { data, error } = await supabase
        .from('seasons')
        .select('*')
        .order('started_at', { ascending: false });

      if (error) {
        console.error('Error fetching seasons:', error);
      } else {
        setSeasons(data || []);
      }

      setLoading(false);
    };

    fetchSeasons();
  }, []);

  const startNewSeason = async () => {
    setStarting(true);
    const seasonName = `Season ${new Date().getFullYear()} - ${new Date().toLocaleString('default', { month: 'short' })}`;

    // Archive existing current season if any
    const current = seasons.find((s) => s.status === 'current');
    if (current) {
      await supabase
        .from('seasons')
        .update({ status: 'archived' })
        .eq('id', current.id);
    }

    const { error } = await supabase.from('seasons').insert([
      {
        name: seasonName,
        status: 'current',
        started_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error starting new season:', error);
    } else {
      window.location.reload();
    }

    setStarting(false);
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Season Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-6">
            <Button onClick={startNewSeason} disabled={starting}>
              {starting ? 'Starting...' : 'Start New Season'}
            </Button>
          </div>

          {seasons.length === 0 ? (
            <p>No seasons found.</p>
          ) : (
            <ul className="space-y-3">
              {seasons.map((season) => (
                <li key={season.id} className="border p-4 rounded shadow-sm bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{season.name}</p>
                      <p className="text-sm text-gray-600">
                        {season.status === 'current' ? '🟢 Current Season' : 'Archived'}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(season.started_at).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AdminLayout>
  );
}

