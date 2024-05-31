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
  toggleApproval: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const oldApproval = await ctx.db.reservation.findUnique({
        where: {
          id: input,
        },
        select: {
          status: true,
        },
      });
      const newApproval =
        oldApproval?.status === "Pending"
          ? "Approved"
          : oldApproval?.status === "Approved"
            ? "UnApproved"
            : oldApproval?.status === "UnApproved"
              ? "Approved"
              : "";
      const updated = await ctx.db.reservation.update({
        data: { status: newApproval },
        where: { id: input },
      });
      return updated;
    }),
  getnumberofReservationsActiveStays: protectedProcedure.query(
    async ({ ctx }) => {
      const theday = new Date();
      const number = await ctx.db.reservation.count({
        where: {
          hostId: ctx.session.user.id,
          endDate: {
            gte: theday,
          },
        },
      });
      return number;
    },
  ),
  getnumberofReservationsResidentsBaby: protectedProcedure.query(
    async ({ ctx }) => {
      const sum = await ctx.db.reservation.aggregate({
        where: {
          hostId: ctx.session.user.id,
        },
        _sum: {
          children: true,
        },
      });
      return sum._sum.children;
    },
  ),
  getnumberofReservationsResidentsAdult: protectedProcedure.query(
    async ({ ctx }) => {
      const sum = await ctx.db.reservation.aggregate({
        where: {
          hostId: ctx.session.user.id,
        },
        _sum: {
          adults: true,
        },
      });
      return sum._sum.adults;
    },
  ),
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
        price: z.number(),
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
          price: input.price,
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
  getAllHostReservations: protectedProcedure.query(async ({ ctx }) => {
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
  getAllUserReservations: protectedProcedure.query(async ({ ctx }) => {
    const reservations = await ctx.db.reservation.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        Listing: {
          include: {
            images: true,
          },
        },
        User: true,
      },
    });

    return reservations;
  }),
  getSingleReservationDetails: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const reservation = await ctx.db.reservation.findUnique({
        where: {
          id: input,
        },
        include: {
          Listing: true,
          User: true,
        },
      });
      return reservation;
    }),
  getnumberofReservationsForUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.reservation.count({
        where: {
          userId: input,
        },
      });
    }),
});
