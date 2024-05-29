"use client";
import React from "react";
import SingleStay from "./SingleStay";
import { api } from "~/trpc/react";

export default function AllStays() {
  const { data, isLoading, isError } =
    api.reservation.getlatestStays.useQuery();
  console.log("users", data);
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid gap-6">
      {data?.map((stay) => {
        return (
          <SingleStay
            key={stay.id}
            User={{
              email: stay.User.email,
              image: stay.User.image,
              name: stay.User.name,
            }}
            amount={121230}
          />
        );
      })}
    </div>
  );
}
