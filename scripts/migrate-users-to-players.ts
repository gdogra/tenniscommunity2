import admin from 'firebase-admin';

// Load credentials from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function migrateUsersToPlayers() {
  const usersRef = db.collection('users');
  const playersRef = db.collection('players');

  const snapshot = await usersRef.get();

  if (snapshot.empty) {
    console.log('No users found to migrate.');
    return;
  }

  console.log(`🔁 Migrating ${snapshot.size} user(s)...`);

  const batch = db.batch();

  snapshot.forEach((doc) => {
    const data = doc.data();
    const playerRef = playersRef.doc(doc.id);
    batch.set(playerRef, data);
    batch.delete(usersRef.doc(doc.id));
  });

  await batch.commit();
  console.log(`✅ Migration complete. ${snapshot.size} user(s) moved to players and deleted from users.`);
}

migrateUsersToPlayers().catch((error) => {
  console.error('❌ Migration failed:', error);
});

