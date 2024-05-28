import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const reservationrouter = createTRPCRouter({

    createReservation: protectedProcedure
        .input(z.object({
            startDate: z.date(),
            endDate: z.date(),
            adults: z.number(),
            children: z.number(),
            rooms: z.number(),
            listingId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const user = ctx.session.user;

            const newReservation = await ctx.db.reservation.create(
                {
                    data: {
                        startDate: input.startDate,
                        endDate: input.endDate,
                        adults: input.adults,
                        children: input.children,
                        rooms: input.rooms,
                        listingId: input.listingId,
                        userId: user.id
                    }
                }
            )
            return newReservation;
        }),
});
