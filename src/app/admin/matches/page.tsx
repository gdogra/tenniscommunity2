"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";

interface Match {
  id: string;
  playerA: string;
  playerB: string;
  status: string;
}

export default function ManageMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");

  const matchesCollection = collection(db, "matches");

  const fetchMatches = async () => {
    const snapshot = await getDocs(matchesCollection);
    const matchesList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Match[];
    setMatches(matchesList);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleAddMatch = async () => {
    if (!playerA || !playerB) return;
    await addDoc(matchesCollection, {
      playerA,
      playerB,
      status: "pending",
    });
    setPlayerA("");
    setPlayerB("");
    toast.success("Match added successfully!");
    fetchMatches();
  };

  const handleApproveMatch = async (id: string) => {
    await updateDoc(doc(db, "matches", id), { status: "approved" });
    toast.success("Match approved!");
    fetchMatches();
  };

  const handleDeleteMatch = async (id: string) => {
    await deleteDoc(doc(db, "matches", id));
    toast.success("Match deleted!");
    fetchMatches();
  };

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Matches</h1>

        {/* Add Match */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Add New Match</h2>
          <input
            type="text"
            placeholder="Player A"
            value={playerA}
            onChange={(e) => setPlayerA(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="text"
            placeholder="Player B"
            value={playerB}
            onChange={(e) => setPlayerB(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={handleAddMatch}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          >
            Add Match
          </button>
        </div>

        {/* List Matches */}
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {match.playerA} vs {match.playerB}
                </p>
                <p className="text-sm text-gray-600">{match.status}</p>
              </div>
              <div className="flex gap-2">
                {match.status === "pending" && (
                  <button
                    onClick={() => handleApproveMatch(match.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDeleteMatch(match.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

