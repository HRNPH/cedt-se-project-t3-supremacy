import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import Footer from "./Footer";
import Navbar from "./Nav";
import SignupBanner from "./Nav/Banner/Signup";

interface PageProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  parentClassName?: string;
  upperClassName?: string;
  circleBlur?: boolean;
  noMargin?: boolean;
}

export default function Page({
  children,
  parentClassName,
  upperClassName,
  className,
  noMargin,
  ...props
}: PageProps) {
  const { status } = useSession();

  return (
    <main
      className={twMerge(
        "relative flex h-screen flex-col overflow-x-hidden",
        parentClassName,
      )}
    >
      <div
        className={twMerge(
          "z-10 flex grow flex-col",
          !noMargin && "mb-16",
          upperClassName,
        )}
      >
        <header className="sticky top-0 z-50 overscroll-none">
          {status == "unauthenticated" && <SignupBanner />}
          <Navbar />
        </header>
        <main className={twMerge("h-full", className)} {...props}>
          {children}
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
