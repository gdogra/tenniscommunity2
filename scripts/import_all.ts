import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { Player, Match } from './types';

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
const logPath = path.join(__dirname, `../import-log-${season}.txt`);

const log = (msg: string) => {
  console.log(msg);
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
};

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function prepareDoc<T>(data: T, isNew = true): T {
  const cleaned = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== null),
  ) as T;
  return {
    ...cleaned,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    ...(isNew && { createdAt: admin.firestore.FieldValue.serverTimestamp() }),
  };
}

function validatePlayer(obj: any): obj is Player {
  return obj && typeof obj.name === 'string' && typeof obj.match_wins === 'number';
}

function validateMatch(obj: any): obj is Match {
  return (
    obj &&
    typeof obj.winner === 'string' &&
    typeof obj.opponent === 'string' &&
    Array.isArray(obj.sets)
  );
}

async function importDivisionStats(season: string, division: string) {
  const filePath = path.join(__dirname, `../data/season-standings-${division}.json`);
  const raw: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const stats: Player[] = raw.filter(validatePlayer);

  const seasonRef = db.collection('leagues').doc(season).collection(`players-${division}`);
  const globalPlayersRef = db.collection('players');

  for (const player of stats) {
    const id = slugify(player.name);
    const doc = prepareDoc(player);
    await seasonRef.doc(id).set(doc, { merge: true });
    await globalPlayersRef.doc(id).set(doc, { merge: true });
    log(`📊 [${division}] Player: ${player.name} → [ID: ${id}]`);
  }
}

async function importDivisionMatches(season: string, division: string) {
  const filePath = path.join(__dirname, `../data/season-matches-${division}.json`);
  const raw: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const matches: Match[] = raw.filter(validateMatch);

  const matchesRef = db.collection('leagues').doc(season).collection(`matches-${division}`);

  for (const match of matches) {
    const id = `${slugify(match.winner)}-vs-${slugify(match.opponent)}-${match.date}`;
    await matchesRef.doc(id).set(prepareDoc(match), { merge: true });
    log(`🎾 [${division}] Match: ${match.winner} vs ${match.opponent} → [ID: ${id}]`);
  }
}

async function runAll() {
  log(`🚀 Starting full import for season: ${season}`);
  for (const division of divisions) {
    await importDivisionStats(season, division);
    await importDivisionMatches(season, division);
  }
  log('✅ Full multi-division import completed.');
}

runAll().catch((err: Error) => {
  log('❌ Import failed: ' + err.message);
  console.error(err);
});
