import React from "react";
import { prisma } from "@/prisma/db";
import DataTable from "@/app/tickets/DataTable";
import Pagination from "@/components/Pagination";
import { Status, Ticket } from "@prisma/client";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface SearchParams {
  page: string;
  status: string;
  orderBy: keyof Ticket;
}

async function MyTickets({ searchParams }: { searchParams: SearchParams }) {
  const session = await getServerSession(options);

  if (!session || session.user.role !== "USER") {
    redirect("/");
  }

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const status = searchParams.status;

  const orderByField = searchParams.orderBy || "createdAt";
  const orderBy = {
    [orderByField]: searchParams.orderBy ? "asc" : "desc",
  } as const;

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: session.user.id,
      status:
        status == "0"
          ? { not: "CLOSED" }
          : status
          ? (status as Status)
          : undefined,
    },
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const ticketCount = await prisma.ticket.count({
    where: {
      userId: session.user.id,
      status:
        status == "0"
          ? { not: "CLOSED" }
          : status
          ? (status as Status)
          : undefined,
    },
  });

  return (
    <div className="space-y-4 px-2">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
          <CardDescription>
            Tickets you have created and submitted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Total: {ticketCount} ticket{ticketCount !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination itemCount={ticketCount} pageSize={10} currentPage={page} />
    </div>
  );
}

export default MyTickets;
