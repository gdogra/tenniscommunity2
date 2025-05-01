// src/components/ProtectedRoute.tsx
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return <>{children}</>;
}

