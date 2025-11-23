import { Prisma } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React from "react";
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";
import TicketPriority from "./TicketPriority";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: { assignedToUser: true };
}>;

interface Props {
  tickets: TicketWithUser[];
}

function DashRecentTickets({ tickets }: Props) {
  return (
    <Card className="col-span-3 border-border">
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {tickets
          ? tickets.map((ticket) => (
              <div className="flex items-center" key={ticket.id}>
                <TicketStatusBadge status={ticket.status} />
                <div className="ml-4 space-y-1">
                  <Link href={`/tickets/${ticket.id}`}>
                    <p>{ticket.title}</p>
                    <p className="text-slate-600">
                      {ticket.assignedToUser?.name || "Unassigned"}
                    </p>
                  </Link>
                </div>
                <div className="ml-auto font-medium">
                  <TicketPriority priority={ticket.priority} />
                </div>
              </div>
            ))
          : null}
      </CardContent>
    </Card>
  );
}

export default DashRecentTickets;
