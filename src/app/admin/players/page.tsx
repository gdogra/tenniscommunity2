"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";

interface Player {
  id: string;
  name: string;
  email: string;
}

export default function ManagePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerEmail, setNewPlayerEmail] = useState("");

  const playersCollection = collection(db, "players");

  const fetchPlayers = async () => {
    const snapshot = await getDocs(playersCollection);
    const playersList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Player[];
    setPlayers(playersList);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAddPlayer = async () => {
    if (!newPlayerName || !newPlayerEmail) return;
    await addDoc(playersCollection, {
      name: newPlayerName,
      email: newPlayerEmail,
    });
    setNewPlayerName("");
    setNewPlayerEmail("");
    toast.success("Player added successfully!");
    fetchPlayers();
  };

  const handleDeletePlayer = async (id: string) => {
    await deleteDoc(doc(db, "players", id));
    toast.success("Player deleted successfully!");
    fetchPlayers();
  };

  const handleUpdatePlayer = async (id: string, newName: string) => {
    await updateDoc(doc(db, "players", id), {
      name: newName,
    });
    toast.success("Player name updated!");
    fetchPlayers();
  };

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Manage Players</h1>

        {/* Add Player */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Add New Player</h2>
          <input
            type="text"
            placeholder="Name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newPlayerEmail}
            onChange={(e) => setNewPlayerEmail(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={handleAddPlayer}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          >
            Add Player
          </button>
        </div>

        {/* List Players */}
        <div className="space-y-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{player.name}</p>
                <p className="text-sm text-gray-600">{player.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newName = prompt("New name:", player.name);
                    if (newName) handleUpdatePlayer(player.id, newName);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlayer(player.id)}
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

