import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        telephone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hash = await bcrypt.hash(input.password, 10);
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (user) throw Error("User already exist!");
      return await ctx.db.user.create({
        data: {
          name: input.firstName + " " + input.lastName,
          profile: {
            create: {
              firstName: input.firstName,
              lastName: input.lastName,
              headline: "Dreamer",
              telephone: input.telephone,
            },
          },
          email: input.email,
          password: hash,
        },
        select: {
          name: true,
          email: true,
        },
      });
    }),

  getUserById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              telephone: true,
              headline:true,
            },
          },
          accounts: {
            select: {
              id: true,
              type: true,
            },
          },
          applications: {
            select: {
              id: true,
              createdAt: true,
            },
          },
          password: true,
          name: true,
          email: true,
          profileId: true,
          role: true,
        },
      });

      if (!user) {
        throw new Error(`User with ID ${input} not found`);
      }

      return user;
    }),
});
