import * as admin from 'firebase-admin';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Match, Player } from './types';

dotenv.config();
const serviceAccountPath = path.join(
  __dirname,
  '..',
  process.env.FIREBASE_SERVICE_ACCOUNT || 'serviceAccountKey.json',
);
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const season = process.argv[2] || 'spring-2025';
const divisions = ['3.6', '4.0', '4.5', '5.0'];

function title(str: string): string {
  return str.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

function streak(matches: Match[]): { player: string; count: number } {
  const winMap = new Map<string, number>();
  for (const match of matches) {
    const winner = match.winner;
    winMap.set(winner, (winMap.get(winner) || 0) + 1);
  }

  const [player, count] = [...winMap.entries()].reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ['', 0],
  );
  return { player, count };
}

async function reportDivision(division: string) {
  const playersSnap = await db.collection(`leagues/${season}/players-${division}`).get();
  const matchesSnap = await db.collection(`leagues/${season}/matches-${division}`).get();

  const players: Player[] = playersSnap.docs.map((doc) => doc.data() as Player);
  const matches: Match[] = matchesSnap.docs.map((doc) => doc.data() as Match);

  const topPlayer = players.reduce(
    (best, p) => ((p.match_win_pct || 0) > (best.match_win_pct || 0) ? p : best),
    players[0],
  );

  const topStreak = streak(matches);

  console.log(`\n🏅 Division ${division}`);
  console.log(`Players: ${players.length}`);
  console.log(`Matches: ${matches.length}`);
  console.log(`Top Player: ${title(topPlayer.name)} (${topPlayer.match_win_pct}% wins)`);
  console.log(`Longest Win Streak: ${title(topStreak.player)} (${topStreak.count} wins)`);
}

async function runReport() {
  console.log(`📋 League Report: ${season}`);
  for (const div of divisions) {
    await reportDivision(div);
  }
}

runReport().catch(console.error);
