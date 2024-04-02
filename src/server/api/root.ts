import { applicationRouter } from "./routers/application";
import { companyRouter } from "./routers/company";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  company: companyRouter,
  application: applicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
