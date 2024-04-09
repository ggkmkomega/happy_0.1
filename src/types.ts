import { z } from "zod";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allListingOutput = RouterOutputs["listing"]["all"];
export type listing = allListingOutput[number];

type listingEdit = RouterOutputs["listing"]["listingByUser"];
export type ListingEditRequired = Extract<listingEdit, { id: string }>;

export const listingInput = z.object({
  name: z.string().min(1, "Listing Must contain a name"),
  description: z.string().min(20, "description must be at least 20 char"),
  type: z.string().min(1, "type is required"),
  street: z.string().min(1, "street adress is required"),
  city: z.string().min(1, "city is required"),
  province: z.string().min(1, "province is required"),
});

export const imageInput = z.object({
  id: z.string(),
  url: z.string(),
});
