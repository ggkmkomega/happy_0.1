"use client";
import React from "react";
import { api } from "~/trpc/react";

export default function AllReservationNumber() {
  const numbers = api.reservation.getnumberofReservations.useQuery();

  return <div className="text-2xl font-bold">+{numbers.data}</div>;
}
