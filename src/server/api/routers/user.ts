import { z } from "zod";
import { userNameSchema } from "~/_components/UserNameForm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(32).nullable(),
      }),
    )
    .mutation(async ({ ctx, input: { name } }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { name },
      });
    }),

  display: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) return;

    return ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
