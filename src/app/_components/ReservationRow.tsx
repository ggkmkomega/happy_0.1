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
  phone: string;
}
export default function ReservationRow({
  name,
  date,
  email,
  price,
  status,
  reservationId,
  phone,
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
    <TableRow>
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
        <div className="mt-2 flex flex-col gap-2 font-semibold  ">
          {status === "Approved" && phone}
        </div>
      </TableCell>
      <TableCell className="text-right">DZD {price}</TableCell>
    </TableRow>
  );
}
