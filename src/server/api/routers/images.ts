import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { imageInput } from "~/types";

export const imagesrouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        data: imageInput,
        listingId: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx,
        input: {
          data: { id, url },
          listingId,
        },
      }) => {
        return ctx.db.image.create({
          data: {
            id,
            url,
            listing: {
              connect: {
                id: listingId,
              },
            },
          },
        });
      },
    ),
  /*update: protectedProcedure
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
    ),*/
});
