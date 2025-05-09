// scripts/setup.ts
import { execSync } from 'child_process';

console.log('🔧 Running full setup...');

try {
  execSync('ts-node scripts/seed-players.ts', { stdio: 'inherit' });
  execSync('ts-node scripts/seed-dashboard.ts', { stdio: 'inherit' });
  console.log('✅ All setup scripts completed.');
} catch (err) {
  console.error('❌ Error during setup:', err);
}

