"use client";
import Dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Icons } from "~/_components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/_components/ui/alert-dialog";
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
import { toast } from "~/_components/ui/use-toast";
import { api } from "~/trpc/react";
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
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const remove = api.reservation.delete.useMutation();
  const APIServer = api.useUtils();
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
            <DropdownMenuItem
              className="flex cursor-pointer items-center text-destructive focus:text-destructive"
              onClick={() => {
                setShowDeleteAlert(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete the Reservation?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async (event) => {
                  event.preventDefault();
                  setIsDeleteLoading(true);
                  await remove.mutateAsync(Reservation.id);
                  if (!remove.isLoading) {
                    setIsDeleteLoading(false);
                    setShowDeleteAlert(false);
                    await APIServer.reservation.getAllUserReservations.invalidate();
                  } else {
                    toast({
                      title: "Something went wrong.",
                      description:
                        "Your listing was not deleted. Please try again.",
                      variant: "destructive",
                    });
                  }
                }}
                className="bg-red-600 focus:ring-red-600"
              >
                {isDeleteLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.trash className="mr-2 h-4 w-4" />
                )}
                <span>Delete</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}

export default MyReservationTableRow;
