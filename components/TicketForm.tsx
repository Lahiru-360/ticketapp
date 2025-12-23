"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { ticketSchema } from "@/ValidationSchemas/tickets";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Ticket } from "@prisma/client";
import { useSession } from "next-auth/react";
import ReactMarkDown from "react-markdown";

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

function TicketForm({ ticket }: Props) {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;
  const isEdit = !!ticket;
  const isOwner = ticket && userId === ticket.userId;
  const isTech = role === "TECH";
  const isUser = role === "USER";
  const disableStatus = !isEdit || isUser; // status is disabled on creation and for user on edit
  const disableNonStatus = isEdit && isTech; // tech can only change status when editing
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function OnSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      if (ticket) {
        await axios.patch("/api/tickets/" + ticket.id, values);
      } else {
        await axios.post("/api/tickets", values);
      }

      setIsSubmitting(false);
      router.push("/tickets");
      router.refresh();
    } catch (error: any) {
      console.log(error.response);
      setError(error.response?.data?.error || "Unknown Error Occured");
      setIsSubmitting(false);
    }
  }
  return (
    <div className="rounded-md border border-border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(OnSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ticket Title..."
                    {...field}
                    disabled={disableNonStatus}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            defaultValue={ticket?.description}
            render={({ field }) => (
              <div className="simplemde-wrapper">
                {disableNonStatus ? (
                  <div className="rounded-md border border-border bg-muted/30 p-3 prose dark:prose-invert min-h-[120px]">
                    <ReactMarkDown>{field.value || ""}</ReactMarkDown>
                  </div>
                ) : (
                  <SimpleMDE
                    placeholder="Description"
                    value={field.value}
                    onChange={field.onChange}
                    options={{
                      spellChecker: false,
                    }}
                  />
                )}
              </div>
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status || "OPEN"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={disableStatus}>
                        <SelectValue
                          placeholder="Status..."
                          defaultValue={ticket?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={disableNonStatus}>
                        <SelectValue
                          placeholder="Priority..."
                          defaultValue={ticket?.priority}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <p className="text-destructive">{error}</p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? ticket
                ? "Updating..."
                : "Creating..."
              : ticket
              ? "Update Ticket"
              : "Create Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TicketForm;
