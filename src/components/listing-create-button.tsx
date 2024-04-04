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
    /*
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });
*/
    mutate({
      name: "Untitled Listing",
      city: "No  Ville",
      province: "No Where",
      street: "No street",
      description: "Describe your Property",
      status: "inactive",
    });

    /* TODO : Logic for subscribtion
    
if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 listings reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        });
      }

      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }
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
