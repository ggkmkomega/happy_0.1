import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { listingInput } from "~/types";

export const listingrouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const listing = await ctx.db.listing.findMany({
      include: {
        images: true,
      },
    });
    return listing;
  }),
  listingByUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const listing = await ctx.db.listing.findFirst({
        where: {
          id: input,
          createdById: ctx.session.user.id,
        },
        include: {
          images: true,
        },
      });
      return listing;
    }),
  allUserListings: protectedProcedure.query(async ({ ctx }) => {
    const userListings = await ctx.db.listing.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return userListings;
  }),
  create: protectedProcedure
    .input(listingInput)
    .mutation(async ({ ctx, input: { name, description, address } }) => {
      return ctx.db.listing.create({
        data: {
          name,
          description,
          address,
          createdBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.delete({
        where: {
          id: input,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: listingInput,
      }),
    )
    .mutation(
      async ({
        ctx,
        input: {
          id,
          data: { name, description, address },
        },
      }) => {
        return ctx.db.listing.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            address,
          },
        });
      },
    ),
});
