import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { userInput } from "~/types";

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(userInput)
    .mutation(async ({ ctx, input: { email, name, phone } }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name,
          email,
          phone,
        },
      });
    }),
  allusers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
      },
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
