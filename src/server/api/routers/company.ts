import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const companyRouter = createTRPCRouter({
  getAllCompaniesData: publicProcedure.query(async ({ ctx }) => {
    const companies = await ctx.db.company.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        industry: true,
        size: true,
        jobListings: {
          select: {
            id: true,
            title: true,
            description: true,
            requirements: true,
            location: true,
            type: true,
            createdAt: true,
            updatedAt: true,
            expiresAt: true,
          },
        },
      },
    });

    if (!companies) {
      throw new Error("No companies found");
    }

    return companies;
  }),

  getCompanyById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const company = await ctx.db.company.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          name: true,
          description: true,
          industry: true,
          size: true,
          address: true,
          website: true,
          telephone: true,
          jobListings: {
            select: {
              id: true,
              title: true,
              description: true,
              requirements: true,
              location: true,
              type: true,
              createdAt: true,
              updatedAt: true,
              expiresAt: true,
            },
          },
        },
      });

      if (!company) {
        throw new Error(`Company with ID ${input} not found`);
      }

      return company;
    }),
});
