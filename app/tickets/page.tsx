import React from "react";
import { prisma } from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";

export interface SearchParams {
  page: string;
  status: string;
  orderBy: keyof Ticket;
}

async function Tickets({ searchParams }: { searchParams: SearchParams }) {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const status = searchParams.status;

  const orderByField = searchParams.orderBy || "createdAt";
  const orderBy = {
    [orderByField]: searchParams.orderBy ? "asc" : "desc",
  } as const;

  const tickets = await prisma.ticket.findMany({
    where: {
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
      status:
        status == "0"
          ? { not: "CLOSED" }
          : status
          ? (status as Status)
          : undefined,
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>

        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination itemCount={ticketCount} pageSize={10} currentPage={page} />
    </div>
  );
}

export default Tickets;
