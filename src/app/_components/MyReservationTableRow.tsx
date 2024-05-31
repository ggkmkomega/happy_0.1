import { Dayjs } from "dayjs";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "~/_components/ui/badge";
import { Button } from "~/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/_components/ui/dropdown-menu";
import { TableCell, TableRow } from "~/_components/ui/table";
import { type UserReservation } from "~/types";
interface MyReservationTableRowProps {
  Reservation: UserReservation;
}

function MyReservationTableRow({ Reservation }: MyReservationTableRowProps) {
  const days = new Dayjs(Reservation.startDate).diff(
    Reservation.endDate,
    "day",
  );
  const start = new Dayjs(Reservation.startDate).format("MMM DD, YYYY");

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src="/placeholder.svg"
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{Reservation.Listing.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{Reservation.status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">$ </TableCell>
      <TableCell className="hidden md:table-cell">{days}</TableCell>
      <TableCell className="hidden md:table-cell">{start}</TableCell>
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
}

export default MyReservationTableRow;
