"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
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
import { User } from "@prisma/client";
import { userSchema } from "@/ValidationSchemas/users";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

function UserForm({ user }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function OnSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      if (user) {
        await axios.patch("/api/users/" + user.id, values);
      } else {
        await axios.post("/api/users", values);
      }

      setIsSubmitting(false);
      router.push("/users");
      router.refresh();
    } catch (error: any) {
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
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            defaultValue={user?.password}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    defaultValue=""
                    required={user ? false : true}
                    placeholder="Enter Password..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Role..."
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <p className="text-destructive ">{error}</p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? user
                ? "Updating..."
                : "Creating..."
              : user
              ? "Update User"
              : "Create User"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UserForm;
