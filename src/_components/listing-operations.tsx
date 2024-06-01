"use client";
import * as React from "react";
import Link from "next/link";
import { type Listing } from "@prisma/client";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/_components/ui/dropdown-menu";
import { toast } from "~/_components/ui/use-toast";
import { Icons } from "~/_components/icons";
import { api } from "~/trpc/react";

interface listingOperationsProps {
  Listing: Pick<Listing, "id" | "name" | "approve">;
  canApprove?: boolean;
}

export function PostOperations({
  Listing,
  canApprove,
}: listingOperationsProps) {
  const remove = api.listing.delete.useMutation();
  const approve = api.listing.approve.useMutation();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [showApproveAlert, setShowApproveAlert] =
    React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const [isApproveLoading, setIsApproveLoading] =
    React.useState<boolean>(false);
  const APIServer = api.useUtils();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/editor/${Listing.id}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
          {canApprove && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex cursor-pointer items-center  focus:bg-pink-600 focus:text-white"
                onSelect={() => setShowApproveAlert(true)}
              >
                {Listing.approve === "Approved" ? "Unapprove" : "Approve"}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Listing?
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
                await remove.mutateAsync(Listing.id);
                if (!remove.isLoading) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  toast({
                    title: "Listing Deleted Succesfully.",
                    description: "Your listing was deleted. ",
                    variant: "default",
                  });
                  await APIServer.listing.adminAllUserListings.invalidate();
                  await APIServer.listing.allUserListings.invalidate();
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
      <AlertDialog open={showApproveAlert} onOpenChange={setShowApproveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to Approve this Listing?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action can be reversed .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsApproveLoading(true);
                await approve.mutateAsync({
                  id: Listing.id,
                  newapprove:
                    Listing.approve === "Approved"
                      ? "Not Approved"
                      : "Approved",
                });
                if (!approve.isLoading) {
                  setIsApproveLoading(false);
                  setShowApproveAlert(false);
                  await APIServer.listing.adminAllUserListings.invalidate();
                } else {
                  toast({
                    title: "Something went wrong.",
                    description:
                      "thelisting was not Approved. Please try again.",
                    variant: "destructive",
                  });
                }
              }}
              className="bg-pink-600 focus:ring-pink-600"
            >
              {isApproveLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : Listing.approve === "Approved" ? (
                <Icons.unapprove className="mr-2 h-4 w-4" />
              ) : (
                <Icons.approve className="mr-2 h-4 w-4" />
              )}
              <span>
                {" "}
                {Listing.approve === "Approved" ? "Unapprove" : "Approve"}
              </span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
