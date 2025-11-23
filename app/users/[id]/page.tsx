import React from "react";
import dynamic from "next/dynamic";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

const UserForm = dynamic(() => import("@/components/UserForm"), {
  ssr: false,
});

async function EditUser({ params }: Props) {
  const session = await getServerSession(options);
  if (session?.user?.role !== "ADMIN") {
    return <p className="text-destructive">Admin access only!</p>;
  }
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className="text-destructive">User not found</p>;
  }

  user.password = "";

  console.log(user);

  return <UserForm user={user} />;
}

export default EditUser;
