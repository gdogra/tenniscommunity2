// setAdminClaim.js
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

// Path to your Firebase service account key JSON
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// 🛠 Replace with the user's UID you want to promote
const targetUid = 'REPLACE_WITH_USER_UID';

async function setAdminClaim(uid: string) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`✅ User ${uid} has been granted admin privileges.`);
  } catch (err) {
    console.error('❌ Error setting admin claim:', err);
  }
}

setAdminClaim(targetUid);
