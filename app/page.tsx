import React from "react";
import { prisma } from "@/prisma/db";
import DashRecentTickets from "@/components/DashRecentTickets";
import DashChart from "@/components/DashChart";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

async function Dashboard() {
  const prisma = new PrismaClient();

  (async () => {
    await prisma.user.create({
      data: {
        name: "Admin",
        username: "admin",
        password: await bcrypt.hash("admin@123", 10),
        role: "ADMIN",
      },
    });

    console.log("Admin user created");
    await prisma.$disconnect();
  })();

  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const data = groupTicket.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
