"use client";
import React from "react";
import { api } from "~/trpc/react";

export default function ActiveStays() {
  const numbers = api.reservation.getnumberofReservationsActiveStays.useQuery();
  return <div className="text-2xl font-bold">{numbers.data}</div>;
}
export function ResidentsBaby() {
  const numbers =
    api.reservation.getnumberofReservationsResidentsBaby.useQuery();
  return <div className="text-2xl font-bold">{numbers.data}</div>;
}
export function ResidentsAdults() {
  const numbers =
    api.reservation.getnumberofReservationsResidentsAdult.useQuery();
  return <div className="text-2xl font-bold">{numbers.data}</div>;
}
export function TotalRevenue() {
  const numbers = api.reservation.getmoneyofReservations.useQuery();
  return <div className="text-2xl font-bold">{numbers.data}</div>;
}
export function AdminWeek() {
  const numbers = api.reservation.getmoneyAdminWeek.useQuery();
  return <div className="text-2xl font-bold">{numbers.data}</div>;
}
export function AdminMonth() {
  const numbers = api.reservation.getmoneyAdminMonth.useQuery();
  return <div className="text-2xl font-bold">{numbers.data}</div>;
}
