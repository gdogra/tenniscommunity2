const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function importPlayers() {
  const filePath = path.join(__dirname, '../data/players.json');
  const players = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const playersRef = db.collection('leagues').doc('spring-2025').collection('players');

  for (const player of players) {
    try {
      const cleaned = Object.fromEntries(
        Object.entries(player).filter(([_, value]) => value !== undefined && value !== null),
      );
      await playersRef.add(cleaned);
      console.log(`✅ Imported: ${player.name}`);
    } catch (err) {
      console.error(`❌ Failed to import ${player.name}:`, err.message);
    }
  }

  console.log('🎉 All players imported.');
}

importPlayers().catch(console.error);
