import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seedUsers() {
  const usersRef = db.collection('users');

  const users = [
    {
      uid: 'uid123',
      email: 'alex@example.com',
      firstName: 'Alex',
      lastName: 'Morgan',
      division: '4.0',
      wins: 5,
      losses: 2,
      createdAt: new Date().toISOString(),
    },
    {
      uid: 'uid456',
      email: 'riley@example.com',
      firstName: 'Riley',
      lastName: 'Smith',
      division: '4.0',
      wins: 3,
      losses: 4,
      createdAt: new Date().toISOString(),
    },
    {
      uid: 'uid789',
      email: 'jamie@example.com',
      firstName: 'Jamie',
      lastName: 'Khan',
      division: '4.5',
      wins: 6,
      losses: 1,
      createdAt: new Date().toISOString(),
    }
  ];

  for (const user of users) {
    await usersRef.doc(user.uid).set(user);
  }

  console.log(`✅ Seeded ${users.length} users.`);
  process.exit(0);
}

seedUsers().catch((err) => {
  console.error('❌ Seeding users failed:', err);
  process.exit(1);
});

