"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/auth/login");
  };

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid gap-4">
          <Link href="/admin/matches" className="block p-4 bg-blue-500 hover:bg-blue-600 text-white rounded">
            Manage Matches
          </Link>
          <Link href="/admin/players" className="block p-4 bg-green-500 hover:bg-green-600 text-white rounded">
            Manage Players
          </Link>
          <Link href="/admin/leaderboard" className="block p-4 bg-purple-500 hover:bg-purple-600 text-white rounded">
            View Leaderboard
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

