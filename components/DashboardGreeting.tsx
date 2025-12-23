"use client";

import { useSession } from "next-auth/react";

export default function DashboardGreeting() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
      <p className="text-muted-foreground capitalize mt-1">
        <span className="font-semibold">{session.user.role}</span>
      </p>
    </div>
  );
}
