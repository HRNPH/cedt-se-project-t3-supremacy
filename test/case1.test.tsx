/* eslint-disable */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Navbar from "~/pages/layout/page/Nav";

// mock Database
import { MockContext, Context, createMockContext } from "./context";
import { Session } from "next-auth";
import { createInnerTRPCContext, createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
import { initTRPC } from "@trpc/server";

describe("Wishlist Companies", () => {
  let mockCtx: MockContext;
  let prisma_ctx: Context;

  beforeEach(() => {
    mockCtx = createMockContext();
    prisma_ctx = mockCtx as unknown as Context;
  });

  // session
  const session: Session = {
    user: {
      id: "test",
      firstName: "John", // Add the missing property 'firstName'
      lastName: "Doe",
      email: "test@testing.com",
    },
    expires: "1",
  };

  it("User can add company to wishlist", async () => {});
});
