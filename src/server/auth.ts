import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { env } from "~/env";
import { db } from "~/server/db";
import { type AppProviders } from "next-auth/providers/index";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      firstName: string;
      lastName: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const providers: AppProviders = [];

providers.push(
  CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    credentials: {
      email: { label: "email", type: "email", placeholder: "123@email.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password are required.");
      }
      const { email, password } = credentials;

      const user = await db.user.findUnique({
        where: { email: email, accounts: { none: {} } },
      });

      if (!user) {
        throw new Error(
          "User not found. Please check your email address or sign up.",
        );
      }

      if (!user.password) {
        throw new Error(
          "It appears you usually sign in with a social account. Please use your social account to sign in.",
        );
      }

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        throw new Error("Incorrect password. Please try again.");
      }
      return user;
    },
  }),
);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        firstName: token.firstName,
        lastName: token.lastName,
        name: token.name,
      },
    }),
    async jwt({ token, trigger }) {
      if (trigger === "update" || trigger === "signIn") {
        const userData = await db.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            name: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        });
        if (userData) {
          token.name = userData.name;
          token.firstName = userData.profile.firstName;
          token.lastName = userData.profile.lastName;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
