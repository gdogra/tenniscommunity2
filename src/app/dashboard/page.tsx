import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ScoreSubmissionForm from '@/components/ScoreSubmissionForm';

interface Opponent {
  id: string;
  name: string;
}

async function getOpponents(currentUserId: string): Promise<Opponent[]> {
  const snapshot = await getDocs(collection(db, 'users'));
  const allUsers = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name || 'Unnamed Player',
  }));

  // Exclude current user and sort alphabetically
  return allUsers
    .filter((user) => user.id !== currentUserId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default async function DashboardPage() {
  const userId = 'u789'; // Replace with actual auth user ID
  const opponents = await getOpponents(userId);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Match Score</h1>
      <ScoreSubmissionForm userId={userId} opponents={opponents} />
    </main>
  );
}
