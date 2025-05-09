// scripts/seed-players.ts
import supabaseAdmin from '../src/lib/supabaseAdmin';

const players = [
  {
    display_name: 'Alice Aces',
    email: 'alice@example.com',
    skill_level: '4.0',
    wins: 10,
    losses: 2,
    points: 1800,
  },
  {
    display_name: 'Bob Baseline',
    email: 'bob@example.com',
    skill_level: '4.5',
    wins: 8,
    losses: 3,
    points: 1650,
  },
  {
    display_name: 'Cara Clay',
    email: 'cara@example.com',
    skill_level: '5.0',
    wins: 12,
    losses: 1,
    points: 1900,
  },
];

async function seedPlayers() {
  console.log('🌱 Seeding players into Supabase...');

  for (const player of players) {
    const { error } = await supabaseAdmin.from('players').insert(player);
    if (error) {
      console.error(`❌ Failed to insert ${player.display_name}:`, error.message);
    } else {
      console.log(`✅ Inserted ${player.display_name}`);
    }
  }

  console.log('🏁 Player seeding complete.');
}

seedPlayers();

