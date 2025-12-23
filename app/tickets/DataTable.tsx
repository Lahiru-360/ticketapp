import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import React from "react";
import { ArrowDown, ArrowUp, User, UserX } from "lucide-react";
import { SearchParams } from "./page";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

function DataTable({ tickets, searchParams }: Props) {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border border-border">
        {tickets.length === 0 ? (
          <EmptyState
            title="No tickets yet"
            description="Create your first ticket to get started"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead>
                  <Link href={{ query: { ...searchParams, orderBy: "title" } }}>
                    Title
                  </Link>
                  {"title" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </TableHead>

                <TableHead className="text-center align-middle">
                  <Link
                    href={{ query: { ...searchParams, orderBy: "status" } }}
                  >
                    Status
                  </Link>
                  {"status" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </TableHead>

                <TableHead className="text-center align-middle">
                  <Link
                    href={{ query: { ...searchParams, orderBy: "priority" } }}
                  >
                    Priority
                  </Link>
                  {"priority" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </TableHead>
                <TableHead className="text-center align-middle">
                  Assigned
                </TableHead>
                <TableHead>
                  <Link
                    href={{ query: { ...searchParams, orderBy: "createdAt" } }}
                  >
                    Created At
                  </Link>
                  {"createdAt" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets
                ? tickets.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      data-href="/"
                      className="border-border"
                    >
                      <TableCell>
                        <Link href={`/tickets/` + ticket.id}>
                          {ticket.title}
                        </Link>
                      </TableCell>
                      <TableCell className="text-center align-middle">
                        <TicketStatusBadge status={ticket.status} />
                      </TableCell>
                      <TableCell className="text-center align-middle">
                        <TicketPriority priority={ticket.priority} />
                      </TableCell>
                      <TableCell className="text-center align-middle">
                        {ticket.assignedToUserId ? (
                          <User
                            className="h-4 w-4 text-green-500 inline"
                            title="Assigned"
                          />
                        ) : (
                          <UserX
                            className="h-4 w-4 text-muted-foreground inline"
                            title="Unassigned"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {ticket.createdAt.toLocaleDateString("en-us", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default DataTable;
