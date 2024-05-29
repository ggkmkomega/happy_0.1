import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const reservationrouter = createTRPCRouter({
  getlatestStays: protectedProcedure.query(async ({ ctx }) => {
    const reservations = await ctx.db.reservation.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        Listing: true,
        User: true,
      },
    });

    return reservations;
  }),
  createReservation: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        adults: z.number(),
        children: z.number(),
        rooms: z.number(),
        listingId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newReservation = await ctx.db.reservation.create({
        data: {
          startDate: input.startDate,
          endDate: input.endDate,
          adults: input.adults,
          children: input.children,
          rooms: input.rooms,
          Listing: {
            connect: {
              id: input.listingId,
            },
          },
          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return newReservation;
    }),
});
