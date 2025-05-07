import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';

export const createPlayer = async (uid: string, data: any) => {
  await setDoc(doc(db, 'players', uid), {
    ...data,
    createdAt: Timestamp.now(),
  });
};

export const getPlayer = async (uid: string) => {
  const ref = doc(db, 'players', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

export const getAllPlayers = async () => {
  const snapshot = await getDocs(collection(db, 'players'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createChallenge = async (challenge: any) => {
  await addDoc(collection(db, 'challenges'), {
    ...challenge,
    createdAt: Timestamp.now(),
    status: 'pending',
  });
};

export const getChallenges = async () => {
  const snapshot = await getDocs(collection(db, 'challenges'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
