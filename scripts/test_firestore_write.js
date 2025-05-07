const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

db.collection('test_collection')
  .add({
    timestamp: new Date(),
    message: 'Hello Firestore!',
  })
  .then((docRef) => {
    console.log('✅ Test document written with ID:', docRef.id);
  })
  .catch((err) => {
    console.error('❌ Firestore write failed:', err);
  });
