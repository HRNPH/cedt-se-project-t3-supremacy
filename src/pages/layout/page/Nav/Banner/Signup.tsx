import Link from "next/link";

export default function SignupBanner() {
  return (
    <div className="relative isolate flex items-center justify-center gap-x-6 overflow-hidden border-b bg-gray-50 px-6 py-2.5 sm:px-3.5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <p className="text-sm leading-6 text-gray-900">
          <span className="hidden lg:inline-block">
            <span className="font-semibold">PSSST, Future Career Mover! ·</span>
            Dive into the CareerLaunch Fair today for unparalleled opportunities
            to fast-track your career growth!
          </span>
          <span className="inline-block lg:hidden">
            <span className="font-bold">Get started now</span> to unlock premium
            job fair perks!
          </span>
        </p>
        <Link
          href="/auth/signup"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <span>Sign up now</span>
          <span className="pl-2" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
