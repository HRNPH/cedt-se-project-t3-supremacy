import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { PasswordCheckService } from "~/utils/global/Password/passwordStrength";
import { Input } from "~/components/Forms/Input/Input";
import Page from "../layout/page";
import { api } from "~/utils/api";

const SignUp = () => {
  const { mutate } = api.user.signup.useMutation();
  const router = useRouter();
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("emailAddress") as string;
    const telephone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !telephone
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const phoneRegex =
      /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!phoneRegex.test(telephone)) {
      toast.error("Please enter a valid telephone number.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    mutate(
      {
        firstName,
        lastName,
        email,
        password,
        telephone,
      },
      {
        onSuccess: () => {
          toast.success("Your account has been created.");
          signIn("credentials", {
            email,
            password,
            redirect: false,
          })
            .then((res) => {
              if (res?.ok) {
                router.push("/");
                toast.success("Welcome! You've successfully signed in.");
              } else {
                toast.error(res?.error ?? "Failed to sign in");
              }
            })
            .catch((error) => {
              toast.error("An error occurred during sign in.");
              console.error(error);
            });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const strength = PasswordCheckService.checkPasswordStrength(password);
    setPasswordStrengthMessage(strength);
  };
  return (
    <Page className="my-12" parentClassName="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-20 w-20 rounded-full bg-indigo-600 p-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
        <h1 className="mt-4 text-3xl font-semibold">Sign up for an account</h1>
        <p className="mt-1 text-center text-lg">
          Let&apos;s begin your journey
        </p>
      </div>
      <form
        className="mx-auto mt-4 flex max-w-lg flex-col justify-center gap-y-5 p-12 sm:rounded-md sm:bg-white sm:drop-shadow-lg"
        onSubmit={handleSubmit}
      >
        <Input
          name="firstName"
          className="sm:max-w-none"
          autoComplete="given-name"
          title="First Name"
        />
        <Input
          name="lastName"
          className="sm:max-w-none"
          autoComplete="family-name"
          title="Last Name"
        />
        <Input
          name="emailAddress"
          className="sm:max-w-none"
          autoComplete="email"
          title="Email Address"
        />
        <Input
          name="phone"
          className="sm:max-w-none"
          autoComplete="tel"
          title="Telephone"
        />
        <Input
          className="sm:max-w-none"
          type="password"
          autoComplete="new-password"
          title="Password"
          name="password"
          onChange={handlePasswordChange}
        />
        <div className="-mt-2 text-xs text-gray-700">
          {passwordStrengthMessage}
        </div>
        <Input
          className="sm:max-w-none"
          type="password"
          autoComplete="new-password"
          title="Confirm Password"
          name="confirmPassword"
        />
        <div>
          <button
            name="signupbtn"
            type="submit"
            className="flex w-full select-none justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
          <p className="mt-3 text-center text-xs text-gray-900">
            By signing up, you agree to our{" "}
            <Link href="/about/terms" className="font-bold">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/about/terms" className="font-bold">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{"  "}
        <Link
          href="/auth/signin"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </Page>
  );
};

export default SignUp;
