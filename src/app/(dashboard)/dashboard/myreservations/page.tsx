"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/_components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/_components/ui/table";
import { DashboardShell } from "~/_components/shell";
import { DashboardHeader } from "~/_components/header";

import MyReservationTableRow from "~/app/_components/MyReservationTableRow";
import { api } from "~/trpc/react";
import { EmptyPlaceholder } from "~/_components/empty-placeholder";
import { Button } from "~/_components/ui/button";
import { useRouter } from "next/navigation";

export default function Reservations() {
  const { data: userReservations } =
    api.reservation.getAllUserReservations.useQuery();
  const router = useRouter();
  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Reservations"
        text="Browse Your reservations."
      />
      <div className="flex w-full flex-col">
        {userReservations?.length ? (
          <main className="flex flex-1 flex-col gap-4  md:gap-8 ">
            <Card>
              <CardHeader></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Listing</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Starts at
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Ends at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userReservations?.map((reservation) => (
                      <MyReservationTableRow
                        key={reservation.id}
                        Reservation={reservation}
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                  Reservation
                </div>
              </CardFooter>
            </Card>
          </main>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No Reservation </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any Reservations yet. Start your journey.
            </EmptyPlaceholder.Description>
            <Button
              onClick={() => {
                router.push("/");
              }}
              variant="default"
              size="sm"
            >
              Browse Listings
            </Button>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
