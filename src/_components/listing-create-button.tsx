"use client";

import { useRouter } from "next/navigation";

import { buttonVariants, type ButtonProps } from "~/_components/ui/button";
import { Icons } from "~/_components/icons";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function Listingcreatebutton({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const { mutate, isLoading } = api.listing.create.useMutation({
    onSuccess: (data) => {
      router.push(`/editor/${data?.id}`);
    },
  });

  async function onClick() {
    mutate({
      name: "Untitled Listing",
      description: "Describe your Property",
      city: "No  Ville",
      province: "No Where",
      street: "No street",
      type: "House",
      status: "InActive",
      price: 1,
      ameneties: ["No Amenity"],
    });
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New Listing
    </button>
  );
}
