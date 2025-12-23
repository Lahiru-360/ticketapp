import React from "react";
import dynamic from "next/dynamic";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

async function EditTicket({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <p className="text-destructive">You must be signed in.</p>;
  }

  const ticket = await prisma?.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found</p>;
  }

  // Only allow USERS to edit their own tickets; admins/techs keep existing access
  const isUser = session.user.role === "USER";
  const isOwner = ticket.userId === session.user.id;
  if (isUser && !isOwner) {
    return (
      <p className="text-destructive">You can only edit tickets you created.</p>
    );
  }

  return <TicketForm ticket={ticket} />;
}

export default EditTicket;
