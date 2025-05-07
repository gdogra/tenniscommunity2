import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';

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
const season = 'spring-2025';
const divisions = ['3.6', '4.0', '4.5', '5.0'];

async function renameCollection(oldPath: string, newPath: string): Promise<void> {
  const oldRef = db.collection(oldPath);
  const newRef = db.collection(newPath);
  const snapshot = await oldRef.get();

  if (snapshot.empty) {
    console.log(`⚠️ No documents in ${oldPath}, skipping.`);
    return;
  }

  for (const doc of snapshot.docs) {
    await newRef.doc(doc.id).set(doc.data(), { merge: true });
    await oldRef.doc(doc.id).delete();
  }

  console.log(`✅ Renamed ${oldPath} → ${newPath}`);
}

async function deleteCollection(path: string): Promise<void> {
  const ref = db.collection(path);
  const snapshot = await ref.get();

  if (snapshot.empty) {
    console.log(`⚠️ ${path} already empty.`);
    return;
  }

  for (const doc of snapshot.docs) {
    await doc.ref.delete();
  }

  console.log(`🗑 Deleted ${path}`);
}

async function summarizeDivision(division: string): Promise<void> {
  const playersRef = db.collection(`leagues/${season}/players-${division}`);
  const matchesRef = db.collection(`leagues/${season}/matches-${division}`);

  const playersCount = (await playersRef.get()).size;
  const matchesCount = (await matchesRef.get()).size;

  console.log(`📊 ${division}: ${playersCount} players, ${matchesCount} matches`);
}

async function runCleanup(): Promise<void> {
  const oldPlayersPath = `leagues/${season}/players`;
  const newPlayersPath = `leagues/${season}/players-4.0`;

  await renameCollection(oldPlayersPath, newPlayersPath);
  await deleteCollection(`leagues/${season}/matches`);

  console.log('\n📋 Summary by Division:');
  for (const division of divisions) {
    await summarizeDivision(division);
  }
}

runCleanup().catch((err: Error) => {
  console.error('❌ Cleanup failed:', err.message);
});
