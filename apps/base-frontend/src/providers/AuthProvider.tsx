"use client";;
import { SessionProvider } from "next-auth/react";

import type { JSX } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
