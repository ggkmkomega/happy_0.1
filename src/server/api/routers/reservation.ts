import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
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
  getmoneyofReservations: protectedProcedure.query(async ({ ctx }) => {
    const totalAmount = await ctx.db.reservation.aggregate({
      where: {
        hostId: ctx.session.user.id,
      },
      _sum: {
        price: true,
      },
    });
    return totalAmount._sum.price;
  }),
  getmoneyAdminWeek: protectedProcedure.query(async ({ ctx }) => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start of the current week (Monday)
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 }); // End of the current week (Sunday)
    const totalAmount = await ctx.db.reservation.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        price: true,
      },
    });

    return totalAmount._sum.price ?? 0; // Return 0 if no reservations
  }),
  getmoneyAdminMonth: protectedProcedure.query(async ({ ctx }) => {
    const startDate = startOfMonth(new Date()); // Start of the current month
    const endDate = endOfMonth(new Date()); // End of the current month

    const totalAmount = await ctx.db.reservation.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        price: true,
      },
    });

    return totalAmount._sum.price ?? 0; // Return 0 if no reservations
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
  getAllAdminReservations: protectedProcedure.query(async ({ ctx }) => {
    const reservations = await ctx.db.reservation.findMany({
      include: {
        Listing: true,
        User: true,
      },
    });

    return reservations;
  }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.reservation.delete({
        where: {
          id: input,
          userId: ctx.session.user.id,
        },
      });
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
  getnumberofCommissionsForUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const totalAmount = await ctx.db.reservation.aggregate({
        where: {
          hostId: input,
        },
        _sum: {
          price: true,
        },
      });
      return totalAmount._sum.price ?? 0; // Return 0 if no reservations
    }),
  getReservedDatesForAlisting: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const Dates = await ctx.db.reservation.findMany({
        where: {
          listingId: input,
        },
        select: {
          startDate: true,
          endDate: true,
        },
      });
      return Dates;
    }),
});
