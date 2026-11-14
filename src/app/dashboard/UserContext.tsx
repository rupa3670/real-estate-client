"use client";

import { createContext, useContext } from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
} | null;

export const UserContext = createContext<AuthUser>(null);
export const useUser = () => useContext(UserContext);