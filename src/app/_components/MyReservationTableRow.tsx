import Dayjs from "dayjs";
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
  const start = Dayjs(Reservation.startDate).format("MMM DD, YYYY");
  const end = Dayjs(Reservation.endDate).format("MMM DD, YYYY");
  const imageLink = Reservation.Listing.images[0]
    ? Reservation.Listing.images[0].url
    : "/placeholder.png";
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={imageLink}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{Reservation.Listing.name}</TableCell>
      <TableCell>
        <Badge
          className={"cursor-pointer text-xs hover:bg-gray-400 "}
          variant={
            Reservation.status === "Approved"
              ? "default"
              : Reservation.status === "Pending"
                ? "outline"
                : "destructive"
          }
        >
          {Reservation.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {Reservation.price}
      </TableCell>
      <TableCell className="hidden md:table-cell">{start}</TableCell>
      <TableCell className="hidden md:table-cell">{end}</TableCell>
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
