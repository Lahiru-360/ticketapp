import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { SearchParams } from "../tickets/page";

interface Props {
  users: User[];
}

function DataTableSimple({ users }: Props) {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border ">
              <TableHead>Name</TableHead>
              <TableHead className="text-center align-middle">
                Username
              </TableHead>
              <TableHead className="text-center align-middle">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((user) => (
                  <TableRow
                    key={user.id}
                    data-href="/"
                    className="border-border"
                  >
                    <TableCell>
                      <Link href={`/users/` + user.id}>{user.name}</Link>
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {user.role}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTableSimple;
