import Link from "next/link";
import { type Listing } from "@prisma/client";

import { PostOperations } from "~/_components/listing-operations";
import { formatDate } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface listingItemProp {
  listing: Pick<Listing, "id" | "name" | "createdAt">;
}

export function ListingItem({ listing }: listingItemProp) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${listing.id}`}
          className="font-semibold hover:underline"
        >
          {listing.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(listing.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations Listing={{ id: listing.id, name: listing.name }} />
    </div>
  );
}

ListingItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
