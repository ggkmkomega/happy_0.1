"use client";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "~/_components/ui/badge";
import { Button } from "~/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/_components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/_components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/_components/ui/table";
import { type User } from "@prisma/client";
import { formatDate } from "~/lib/utils";
import { api } from "~/trpc/react";

export const UsersRow = () => {
  const { data } = api.user.allusers.useQuery();
  return (
    <div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Commisions
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Stays
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Reservations
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((user) => {
                return <UserRow key={user.id} user={user} />;
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>40</strong> Users
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
const UserRow = ({
  user,
}: {
  user: Pick<User, "id" | "email" | "name" | "image" | "emailVerified">;
}) => {
  const { data: totalStays } = api.listing.getnumberofListings.useQuery(
    user.id,
  );
  const { data: totalReservation } =
    api.reservation.getnumberofReservationsForUser.useQuery(user.id);
  const { data: Commisions } =
    api.reservation.getnumberofCommissionsForUser.useQuery(user.id);

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={user.image ?? "/images/placeholder.jpg"}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>
        <Badge variant="outline">Active</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{Commisions} DZD</TableCell>
      <TableCell className="hidden md:table-cell">{totalStays}</TableCell>
      <TableCell className="hidden md:table-cell">{totalReservation}</TableCell>
      <TableCell className="hidden md:table-cell">
        {user.emailVerified
          ? formatDate(user.emailVerified.toDateString())
          : ""}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
