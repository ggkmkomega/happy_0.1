"use client";
import React from "react";
import { Badge } from "~/_components/ui/badge";
import { TableCell, TableRow } from "~/_components/ui/table";
import { api } from "~/trpc/react";
interface ReservationRowProps {
  reservationId: string;
  name: string | null;
  email: string | null;
  date: string;
  status: string;
  price: string;
  selcted?: boolean;
  setSelected?: (id: string) => void;
  onClick?: () => void;
}
export default function ReservationRow({
  name,
  date,
  email,
  price,
  status,
  reservationId,
  selcted,
  onClick,
}: ReservationRowProps) {
  const utils = api.useUtils();
  const { mutate: toggleApproval } = api.reservation.toggleApproval.useMutation(
    {
      onSuccess: async () => {
        await utils.reservation.getAllHostReservations.refetch();
      },
    },
  );
  return (
    <TableRow
      onClick={onClick}
      className={
        selcted ? "bg-accent hover:cursor-pointer" : "hover:cursor-pointer"
      }
    >
      <TableCell>
        <div className="font-medium">{name ? name : "Unnamed"}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {email ? email : "No email"}
        </div>
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Badge
          onClick={async () => {
            toggleApproval(reservationId);
          }}
          className={"cursor-pointer text-xs hover:bg-gray-400 "}
          variant={
            status === "Approved"
              ? "default"
              : status === "Pending"
                ? "outline"
                : "destructive"
          }
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">DZD {price}</TableCell>
    </TableRow>
  );
}
