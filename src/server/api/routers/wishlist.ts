import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const wishlistRouter = createTRPCRouter({
  createWishlist: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        jobListingId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newWishlist = await ctx.db.wishlist.create({
        data: {
          userId: input.userId,
          jobListingId: input.jobListingId,
        },
      });

      return newWishlist;
    }),

  getWishlistForJobListing: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applications = await ctx.db.wishlist.findMany({
        where: { jobListingId: input },
        include: {
          user: true,
          jobListing: true,
        },
      });
      if (applications.length === 0) {
        throw new Error(`No wishlist found for job listing ID ${input}`);
      }

      return applications;
    }),

  getWishlistForUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applications = await ctx.db.wishlist.findMany({
        where: { userId: input },
        select: {
          id: true,
          userId: true,
          jobListingId: true,
          jobListing: true,
        },
      });

      if (applications.length === 0) {
        throw new Error(`No wishlist found for user ID ${input}`);
      }

      return applications;
    }),

  deleteWishlist: protectedProcedure
    .input(
      z.object({
        wishlistId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deletedApplication = await ctx.db.wishlist.delete({
        where: { id: input.wishlistId },
      });

      if (!deletedApplication) {
        throw new Error(`Application with ID ${input.wishlistId} not found`);
      }

      return { success: true, message: "Application deleted successfully." };
    }),
  getAllWishlist: protectedProcedure.query(async ({ ctx }) => {
    const applications = await ctx.db.wishlist.findMany({
      include: {
        user: true,
        jobListing: true,
      },
    });

    return applications;
  }),
});
