import { prisma } from "@/prisma/db";
import { userSchema } from "@/ValidationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 401 });
  }

  const sessionRole = session.user?.role;

  if (sessionRole != "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 401 });
  }

  const body = await request.json();

  const validation = userSchema.safeParse(body);
  console.log(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma?.user.findUnique({
    where: { username: body.username },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: "Duplicate Username" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  body.password = hashedPassword;

  const newUser = await prisma?.user.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
