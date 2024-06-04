import Link from "next/link";
import { type Listing, type User } from "@prisma/client";

import { PostOperations } from "~/_components/listing-operations";
import { formatDate } from "~/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

interface listingItemProp {
  listing: Pick<Listing, "id" | "name" | "createdAt" | "approve">;
  Author?: Pick<User, "id" | "email" | "name" | "image">;
}
export const dynamic = "force-dynamic";

export function ListingItem({ listing, Author }: listingItemProp) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/listings/${listing.id}`}
          className="font-semibold hover:underline"
        >
          {listing.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(listing.createdAt?.toDateString())}
            {Author ? " by " + Author.name : ""}
            {listing.approve === "Approved" ? (
              <Badge className="m-2" variant="default">
                Approved
              </Badge>
            ) : listing.approve === "Pending" ? (
              <Badge className="m-2" variant="outline">
                Pending
              </Badge>
            ) : (
              <Badge className="m-2" variant="destructive">
                Not Approved
              </Badge>
            )}
          </p>
        </div>
      </div>

      <PostOperations
        canApprove={Author ? true : false}
        Listing={{
          id: listing.id,
          name: listing.name,
          approve: listing.approve,
        }}
      />
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
