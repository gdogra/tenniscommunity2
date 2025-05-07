// src/components/Layout.tsx
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">Tennis Community</header>
      <main className="p-4">{children}</main>
    </div>
  );
}
