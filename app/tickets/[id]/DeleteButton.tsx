"use client";

import React, { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Ticket } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  ticketId: number;
}

function DeleteButton({ ticketId }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  async function handleSubmit() {
    try {
      setDeleting(true);
      await axios.delete("/api/tickets/" + ticketId);
      setDeleting(false);
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError("Unknown Error Occured");
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className={`${buttonVariants({
              variant: "destructive",
            })} mt-2 lg:mt-0 `}
            disabled={deleting}
          >
            Delete ticket
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={`${buttonVariants({
                variant: "destructive",
              })}`}
              onClick={handleSubmit}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  );
}

export default DeleteButton;
