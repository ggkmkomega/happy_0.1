"use client";

import { useRouter } from "next/navigation";

import { buttonVariants, type ButtonProps } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function Listingcreatebutton({
  className,
  variant,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const { mutate, data, isLoading } = api.listing.create.useMutation();

  async function onClick() {
    mutate({
      name: "Untitled Listing",
      description: "Describe your Property",
      city: "No  Ville",
      province: "No Where",
      street: "No street",
      type: "House",
      status: "InActive",
    });

    /* TODO : Logic for subscribtion

*/

    const listing = data;
    // This forces a cache invalidation.
    if (listing) {
      router.refresh();
      router.push(`/editor/${listing.id}`);
    }
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
