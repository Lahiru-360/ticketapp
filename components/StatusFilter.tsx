"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const statuses: { label: string; value?: string }[] = [
  { label: "Open/Started" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

function Statusfilter() {
  const router = useRouter();
  const serachParams = useSearchParams();

  return (
    <Select
      defaultValue={serachParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);

        const query = params.size ? `?${params.toString()}` : "0";
        router.push(`/tickets${query}`);
      }}
    >
      {" "}
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Filter by Status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status.value || "0"} value={status.value || "0"}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Statusfilter;
