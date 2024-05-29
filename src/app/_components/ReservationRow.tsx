import React from "react";
import { Badge } from "~/_components/ui/badge";
import { TableCell, TableRow } from "~/_components/ui/table";
interface ReservationRowProps {
  name: string | null;
  email: string | null;
  date: string;
  status: string;
  price: string;
}
export default function ReservationRow({
  name,
  date,
  email,
  price,
  status,
}: ReservationRowProps) {
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
        <Badge className="text-xs" variant="outline">
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">DZD {price}</TableCell>
    </TableRow>
  );
}
