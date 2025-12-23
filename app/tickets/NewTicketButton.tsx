"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";

export default function NewTicketButton() {
  const { data: session, status } = useSession();

  if (status !== "authenticated" || session?.user?.role !== "USER") {
    return null;
  }

  return (
    <Link
      href="/tickets/new"
      className={buttonVariants({ variant: "default" })}
    >
      New Ticket
    </Link>
  );
}
