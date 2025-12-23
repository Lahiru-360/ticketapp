import React from "react";
import { prisma } from "@/prisma/db";
import TicketDetail from "./TicketDetail";

interface Props {
  params: { id: string };
}
async function ViewTicket({ params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  const users = await prisma.user.findMany({
    where: { role: "TECH" },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket Not Found</p>;
  }

  return <TicketDetail ticket={ticket} users={users} />;
}

export default ViewTicket;
