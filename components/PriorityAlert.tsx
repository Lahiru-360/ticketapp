"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function PriorityAlert({ count }: { count: number }) {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  if (
    count === 0 ||
    status !== "authenticated" ||
    (role !== "ADMIN" && role !== "TECH")
  ) {
    return null;
  }

  return (
    <Card className="border-destructive bg-destructive/10">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm font-medium">
            <span className="text-destructive font-bold">{count}</span> high
            priority ticket{count !== 1 ? "s" : ""} require
            {count === 1 ? "s" : ""} attention
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
