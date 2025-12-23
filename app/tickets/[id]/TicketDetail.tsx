import { Ticket, User } from "@prisma/client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import ReactMarkDown from "react-markdown";
import DeleteButton from "./DeleteButton";
import AssignTicket from "@/components/AssignTicket";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  ticket: Ticket;
  users: User[];
}

async function TicketDetail({ ticket, users }: Props) {
  const session = await getServerSession(options);
  const role = session?.user?.role;
  const userId = session?.user?.id;
  const isOwner = userId === ticket.userId;
  const canEdit = role === "TECH" || (role === "USER" && isOwner);
  const canDelete = role === "ADMIN" || (role === "USER" && isOwner);
  console.log("User Role: ", role);
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="border border-border mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created :{" "}
            {ticket.createdAt.toLocaleDateString("en-us", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{ticket.description}</ReactMarkDown>
        </CardContent>
        <CardFooter>
          Updated :{" "}
          {ticket.updatedAt.toLocaleDateString("en-us", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="flex lg:flex-col mx-4 lg:mx-0 gap-2">
        {role === "ADMIN" && <AssignTicket ticket={ticket} users={users} />}

        {canEdit && (
          <Link
            href={"/tickets/edit/" + ticket.id}
            className={`${buttonVariants({ variant: "default" })} mt-2 `}
          >
            Edit Ticket
          </Link>
        )}

        {canDelete && <DeleteButton ticketId={ticket.id} />}
      </div>
    </div>
  );
}

export default TicketDetail;
