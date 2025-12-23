"use client";
import { Status } from "@prisma/client";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface dataProps {
  data: dataElements[];
}

interface dataElements {
  name: Status;
  total: number;
}

const STATUS_COLORS: Record<Status, string> = {
  OPEN: "#3b82f6", // blue
  STARTED: "#eab308", // yellow
  CLOSED: "#22c55e", // green
};

function DashChart({ data }: dataProps) {
  console.log(data);
  return (
    <Card className="border-border col-span-4">
      <CardHeader>
        <CardTitle>Ticket Counts</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default DashChart;
