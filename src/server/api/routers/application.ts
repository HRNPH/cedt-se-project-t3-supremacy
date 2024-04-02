import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const applicationRouter = createTRPCRouter({
  createApplication: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        jobListingId: z.string(),
        reservedAt: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newApplication = await ctx.db.application.create({
        data: {
          userId: input.userId,
          jobListingId: input.jobListingId,
          reservedAt: input.reservedAt,
        },
      });

      return newApplication;
    }),

  updateApplicationReservedAt: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        newReservedAt: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedApplication = await ctx.db.application.update({
        where: { id: input.applicationId },
        data: { reservedAt: input.newReservedAt },
      });

      if (!updatedApplication) {
        throw new Error(`Application with ID ${input.applicationId} not found`);
      }

      return updatedApplication;
    }),

  getApplicationsForJobListing: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applications = await ctx.db.application.findMany({
        where: { jobListingId: input },
        include: {
          user: true,
          jobListing: true,
        },
      });

      if (applications.length === 0) {
        throw new Error(`No applications found for job listing ID ${input}`);
      }

      return applications;
    }),

  getApplicationsForUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applications = await ctx.db.application.findMany({
        where: { userId: input },
        select: {
          id: true,
          userId: true,
          jobListingId: true,
          jobListing: true,
          reservedAt: true,
        },
      });

      if (applications.length === 0) {
        throw new Error(`No applications found for user ID ${input}`);
      }

      return applications;
    }),

  deleteApplication: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deletedApplication = await ctx.db.application.delete({
        where: { id: input.applicationId },
      });

      if (!deletedApplication) {
        throw new Error(`Application with ID ${input.applicationId} not found`);
      }

      return { success: true, message: "Application deleted successfully." };
    }),
  editApplication: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        userId: z.string().optional(),
        jobListingId: z.string().optional(), 
        reservedAt: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedApplication = await ctx.db.application.update({
        where: { id: input.applicationId },
        data: {
          ...(input.userId && { userId: input.userId }),
          ...(input.jobListingId && { jobListingId: input.jobListingId }),
          ...(input.reservedAt && { reservedAt: input.reservedAt }),
        },
      });

      if (!updatedApplication) {
        throw new Error(`Application with ID ${input.applicationId} not found`);
      }

      return updatedApplication;
    }),
  getAllApplications: protectedProcedure.query(async ({ ctx }) => {
    const applications = await ctx.db.application.findMany({
      include: {
        user: true,
        jobListing: true,
      },
    });

    return applications;
  }),
});
