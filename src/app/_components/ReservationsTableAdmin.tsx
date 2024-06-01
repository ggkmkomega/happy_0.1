"use client";
import React from "react";
import { api } from "~/trpc/react";
import ReservationRowAdmin from "./ReservationRowAdmin";
import Dayjs from "dayjs";
interface ReservationsTableAdminProps {
  selectedId: string | null;
  setSelectedId: (selectedId: string) => void;
}
export default function ReservationsTableAdmin({
  selectedId,
  setSelectedId,
}: ReservationsTableAdminProps) {
  const {
    data: rows,
    isLoading,
    isError,
  } = api.reservation.getAllAdminReservations.useQuery();
  console.log("rows", rows);
  if (isLoading) {
    <div>Loading ...</div>;
  }
  if (isError) {
    <div>Error</div>;
  }
  console.log("rows", rows);
  return (
    <>
      {rows?.map((row) => {
        return (
          <ReservationRowAdmin
            selcted={selectedId === row.id}
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
            price="1000"
            onClick={() => setSelectedId(row.id)}
          />
        );
      })}
    </>
  );
}
