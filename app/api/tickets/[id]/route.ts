import { prisma } from "@/prisma/db";
import { ticketSchema } from "@/ValidationSchemas/tickets";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.assignedToUserId) {
    const validation = ticketSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
  } else {
    if (body.assignedToUserId) {
      if (body.assignedToUserId == "0") {
        body.assignedToUserId = null;
      } else {
        body.assignedToUserId = parseInt(body.assignedToUserId);
      }
    }
  }
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }

  // USERS can only update their own tickets
  if (session.user.role === "USER" && ticket.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateTicket);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }

  // USERS can only delete their own tickets
  if (session.user.role === "USER" && ticket.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.ticket.delete({
    where: { id: ticket.id },
  });

  return NextResponse.json({ message: "Ticket Deleted Successfully!" });
}
