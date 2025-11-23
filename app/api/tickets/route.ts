import { prisma } from "@/prisma/db";
import { ticketSchema } from "@/ValidationSchemas/tickets";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 401 });
  }

  const body = await request.json();
  const validation = ticketSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTicket = await prisma?.ticket.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(newTicket, { status: 201 });
}
