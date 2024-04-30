import { createCallerFactory } from "@trpc/server/unstable-core-do-not-import";
import type { Session } from "next-auth";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import prismaMock from "./context";

it("Can fetch companies With Ratings", async () => {
  const session: Session = {
    user: {
      id: "test",
      firstName: "John",
      lastName: "Doe",
      email: "john@nig.com",
    },
    expires: "1",
  };
  prismaMock.company.findMany.mockResolvedValue([
    {
      id: "1",
      name: "Google",
      description: "Google is a tech company",
      industry: "Tech",
      address: "Silicon Valley",
      size: 2000,
      ratings: 4.5,
      telephone: "123456789",
      website: "www.google.com",
    },
  ]);

  const ctx = createInnerTRPCContext({ session });
  const caller = appRouter.createCaller({ ...ctx, db: prismaMock });

  expect(await caller.company.getAllCompaniesData()).toEqual([
    {
      id: "1",
      name: "Google",
      description: "Google is a tech company",
      industry: "Tech",
      size: 2000,
      ratings: 4.5,
      jobListings: [],
    },
  ]);
});
