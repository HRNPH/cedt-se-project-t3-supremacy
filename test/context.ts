/* eslint-disable */
import "@testing-library/jest-dom";

// mock Database
import { mockDeep, mockReset } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

beforeEach(() => {
  mockReset(prismaMock);
});

const prismaMock = mockDeep<PrismaClient>();
export default prismaMock;