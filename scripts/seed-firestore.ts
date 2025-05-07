// scripts/seed-firestore.ts
import 'dotenv/config';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, setDoc, doc, Timestamp } from 'firebase/firestore';

// Load env variables
const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
} = process.env;

if (
  !NEXT_PUBLIC_FIREBASE_API_KEY ||
  !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  !NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  !NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
  !NEXT_PUBLIC_FIREBASE_APP_ID
) {
  throw new Error('❌ Missing required Firebase environment variables');
}

const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const user1 = 'NS9it6ZpOhMic7HC2zLgJi38SYv2';
  const user2 = 'testOpponent123';

  console.log('🚀 Seeding users...');
  await setDoc(doc(db, 'users', user1), {
    name: 'Gautam Dogra',
    email: 'gautam@example.com',
  });

  await setDoc(doc(db, 'users', user2), {
    name: 'Test Opponent',
    email: 'opponent@example.com',
  });

  console.log('🎾 Seeding matches...');
  const matches = [
    {
      id: 'match1',
      set1: '6-3',
      set2: '6-4',
      set3: '',
      matchDate: Timestamp.fromDate(new Date('2024-05-01')),
    },
    {
      id: 'match2',
      set1: '4-6',
      set2: '6-2',
      set3: '10-7',
      matchDate: Timestamp.fromDate(new Date('2024-05-07')),
    },
    {
      id: 'match3',
      set1: '7-5',
      set2: '7-6',
      set3: '',
      matchDate: Timestamp.fromDate(new Date('2024-05-15')),
    },
  ];

  for (const match of matches) {
    await setDoc(doc(db, 'matches', match.id), {
      playerId: user1,
      opponentId: user2,
      set1: match.set1,
      set2: match.set2,
      set3: match.set3,
      matchDate: match.matchDate,
      createdAt: Timestamp.now(),
    });
    console.log(`✅ Match ${match.id} seeded`);
  }

  console.log('🎉 Firestore seeding complete!');
}

seed().catch((err) => {
  console.error('🔥 Seeding failed:', err.message);
});
