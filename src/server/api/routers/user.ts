import { z } from "zod";
import { userNameSchema } from "~/components/user-name-form";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userrouter = createTRPCRouter({
  update: protectedProcedure
    .input(userNameSchema)
    .mutation(async ({ ctx, input: { name } }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { name },
      });
    }),
});
