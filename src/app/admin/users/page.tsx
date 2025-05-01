"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <p>Coming soon: Admins, players, bulk imports!</p>
      </div>
    </ProtectedRoute>
  );
}

