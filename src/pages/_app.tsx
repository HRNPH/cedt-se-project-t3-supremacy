import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`font-inter ${inter.variable}`}>
        <Component {...pageProps} />
        <Toaster closeButton position="top-right" />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
