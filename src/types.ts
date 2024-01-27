import { z } from "zod";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allListingOutput = RouterOutputs["listing"]["all"];
export type listing = allListingOutput[number];

export const listingInput = z.object({
  name: z.string().min(1, "Listing Must contain a name"),
  address: z.string().min(1, "adress is required"),
  description: z.string().min(20, "description must be at least 20 char"),
});
