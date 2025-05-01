// src/hooks/AuthContext.tsx
"use client";

import { createContext } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

export default AuthContext;

