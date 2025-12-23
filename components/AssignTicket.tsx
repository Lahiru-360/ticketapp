"use client";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { Ticket, User } from "@prisma/client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function AssignTicket({ ticket, users }: { ticket: Ticket; users: User[] }) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleChange(userId: string) {
    setError("");
    console.log(userId);
    setIsAssigning(true);
    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId == "0" ? "0" : userId,
      })
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        setError("Unable to assign Ticket.");
      })
      .finally(() => {
        setIsAssigning(false);
      });
  }
  return (
    <>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || "0"}
        onValueChange={handleChange}
      >
        {" "}
        <SelectTrigger className="w-48 mt-2">
          <SelectValue
            placeholder="Select User.."
            defaultValue={ticket.assignedToUserId?.toString() || "0"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0">Unassign</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </>
  );
}

export default AssignTicket;
