import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
  getnumberofReservations: protectedProcedure.query(async ({ ctx }) => {
    const number = await ctx.db.reservation.count({
      where: {
        hostId: ctx.session.user.id,
      },
    });
    return number;
  }),
  //no amount on reservation model
  // getmoneyofReservations: protectedProcedure.query(async ({ ctx }) => {
  //   const totalAmount = await ctx.db.reservation.aggregate({
  //     _sum: {
  //       amount: true,
  //     },
  //   });
  //   return totalAmount._sum.amount;
  // }),
  createReservation: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        adults: z.number(),
        children: z.number(),
        rooms: z.number(),
        listingId: z.string(),
        hostId: z.string(),
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
          hostId: input.hostId,
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
  getAllUserReservations: protectedProcedure.query(async ({ ctx }) => {
    const reservations = await ctx.db.reservation.findMany({
      where: {
        hostId: ctx.session.user.id,
      },
      include: {
        Listing: true,
        User: true,
      },
    });

    return reservations;
  }),
});
