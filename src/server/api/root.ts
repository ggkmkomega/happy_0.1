import { createTRPCRouter } from "~/server/api/trpc";
import { listingrouter } from "./routers/listing";
import { imagesrouter } from "./routers/images";
import { userRouter } from "./routers/user";
//import { userrouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  listing: listingrouter,
  images: imagesrouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
