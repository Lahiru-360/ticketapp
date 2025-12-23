import React from "react";
import { prisma } from "@/prisma/db";
import DashRecentTickets from "@/components/DashRecentTickets";
import DashChart from "@/components/DashChart";
import DashboardGreeting from "@/components/DashboardGreeting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import PriorityAlert from "@/components/PriorityAlert";

async function Dashboard() {
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

  // Get ticket counts by status
  const totalTickets = await prisma.ticket.count();
  const openTickets = await prisma.ticket.count({
    where: { status: "OPEN" },
  });
  const startedTickets = await prisma.ticket.count({
    where: { status: "STARTED" },
  });
  const closedTickets = await prisma.ticket.count({
    where: { status: "CLOSED" },
  });

  // Get priority counts
  const highPriorityTickets = await prisma.ticket.count({
    where: {
      priority: "HIGH",
      NOT: { status: "CLOSED" },
    },
  });

  return (
    <div className="space-y-4 px-2">
      {/* User Greeting */}
      <DashboardGreeting />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              All tickets in system
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting Involvement
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{startedTickets}</div>
            <p className="text-xs text-muted-foreground">
              Currently being worked on
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closedTickets}</div>
            <p className="text-xs text-muted-foreground">Resolved tickets</p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Alert */}
      <PriorityAlert count={highPriorityTickets} />

      {/* Charts and Recent Tickets */}
      <div className="grid gap-4 md:grid-cols-2">
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
