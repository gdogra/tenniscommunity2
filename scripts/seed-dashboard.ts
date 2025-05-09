// scripts/seed-dashboard.ts
import supabaseAdmin from '../src/lib/supabaseAdmin';

async function seedDashboard() {
  console.log('🌱 Seeding dashboard data...');

  const { data: players } = await supabaseAdmin
    .from('players')
    .select('id')
    .limit(2);

  if (!players || players.length < 2) {
    console.warn('⚠️ Not enough players to seed matches. Add players first.');
    return;
  }

  const [player1, player2] = players;

  const matches = [
    {
      player1_id: player1.id,
      player2_id: player2.id,
      winner_id: player1.id,
      division: '4.0',
      played_at: new Date().toISOString(),
      score: '6-3, 6-4',
    },
    {
      player1_id: player2.id,
      player2_id: player1.id,
      winner_id: player2.id,
      division: '4.0',
      played_at: new Date().toISOString(),
      score: '7-6, 2-6, 10-8',
    },
  ];

  const { error } = await supabaseAdmin.from('matches').insert(matches);

  if (error) {
    console.error('❌ Error inserting matches:', error.message);
  } else {
    console.log('✅ Seeded dashboard data.');
  }
}

seedDashboard();

