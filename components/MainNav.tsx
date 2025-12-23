"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ToggleMode from "./ToggleMode";
import MainNavLinks from "./MainNavLinks";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function MainNav() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="flex justify-between">
      <MainNavLinks role={session?.user?.role} />
      <div className="flex items-center gap-2">
        {status === "authenticated" ? (
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        ) : (
          <Link href="/api/auth/login">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Login
            </Button>
          </Link>
        )}
        <ToggleMode />
      </div>
    </div>
  );
}
