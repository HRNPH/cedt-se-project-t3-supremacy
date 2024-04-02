import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        else return false;
      },
    },
    pages: {
      signIn: "/auth/signin",
      error: "/error",
    },
  }
);
export const config = { matcher: ["/"] };
