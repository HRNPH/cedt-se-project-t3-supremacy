/* eslint-disable */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Navbar from "~/pages/layout/page/Nav";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/",
    };
  },
}));

jest.mock("../src/utils/api", () => ({
  api: {
    user: {
      getUserById: {
        useQuery: jest.fn(() => ({
          data: {
            user: {
              id: "1",
              name: "Alice",
            },
          },
          isLoading: false,
          isError: false,
        })),
      },
    },
  },
}));

describe("Navbar and links", () => {
  it("Navbar links to correct page", () => {
    render(
      <SessionProvider session={null}>
        <Navbar />
      </SessionProvider>,
    );

    const Home = screen.getByText("Home");
    expect(Home).toBeInTheDocument();
    expect(Home).toHaveAttribute("href", "/");

    const Booking = screen.getByText("Booking");
    expect(Booking).toBeInTheDocument();
    expect(Booking).toHaveAttribute("href", "/booking");

    const Profile = screen.getByText("Profile");
    expect(Profile).toBeInTheDocument();
    expect(Profile).toHaveAttribute("href", "/profile");
  });
});
