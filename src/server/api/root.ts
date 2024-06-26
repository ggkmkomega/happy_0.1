import { createTRPCRouter } from "~/server/api/trpc";
import { listingrouter } from "./routers/listing";
import { imagesrouter } from "./routers/images";
import { userRouter } from "./routers/user";
import { reservationrouter } from "./routers/reservation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  listing: listingrouter,
  images: imagesrouter,
  user: userRouter,
  reservation: reservationrouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
