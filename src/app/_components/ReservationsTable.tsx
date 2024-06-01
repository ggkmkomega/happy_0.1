"use client";
import React from "react";
import { api } from "~/trpc/react";
import ReservationRow from "./ReservationRow";
import Dayjs from "dayjs";

export default function ReservationsTable() {
  const {
    data: rows,
    isLoading,
    isError,
  } = api.reservation.getAllHostReservations.useQuery();
  console.log("rows", rows);
  if (isLoading) {
    <div>Loading ...</div>;
  }
  if (isError) {
    <div>Error</div>;
  }
  return (
    <>
      {rows?.map((row) => {
        console.log("row", row.status);
        return (
          <ReservationRow
            reservationId={row.id}
            key={row.id}
            name={row.User.name ?? "no Name"}
            email={row.User.email ?? "No email"}
            date={
              Dayjs(row.startDate).format("DD/MM/YYYY") +
              " to " +
              Dayjs(row.endDate).format("DD/MM/YYYY")
            }
            status={row.status}
            price={row.price}
          />
        );
      })}
    </>
  );
}
