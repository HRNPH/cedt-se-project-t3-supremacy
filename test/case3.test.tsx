/* eslint-disable */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import CompanyDetail from "~/pages/companies/[companyId]";

const companyId = 1;

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: `/companies/[companyId]`,
      query: { companyId },
    };
  },
}));

jest.mock("../src/utils/api", () => ({
  api: {
    company: {
      getCompanyById: {
        useQuery: jest.fn(() => ({
          data: {
            id: "1",
            name: "Test User",
            description: "Some description",
            industry: "Some industry",
            size: "Some size",
            address: "Some address",
            website: "example.com",
            telephone: "1234567890",
            jobListings: [
              {
                id: "1",
                title: "Job Title",
                description: "Job Description",
                requirements: "Job Requirements",
                location: "Job Location",
                type: "Job Type",
              },
            ],
          },
          isLoading: false,
          isError: false,
        })),
      },
    },
    application: {
      getApplicationsForUser: {
        useQuery: jest.fn((userId) => ({
          data: [
            {
              id: "1",
              userId: userId,
              jobListingId: "job1",
              jobListing: {
                id: "job1",
                title: "Job Title 1",
                description: "Job Description 1",
              },
              reservedAt: "2024-03-30T00:00:00Z",
            },
          ],
          isLoading: false,
          isError: false,
        })),
      },
      createApplication: {
        useMutation: jest.fn((input) => ({
          mutate: async () => {
            const newApplication = {
              id: "new_application_id",
              userId: input.userId,
              jobListingId: input.jobListingId,
              reservedAt: input.reservedAt,
            };
            return newApplication;
          },
        })),
      },
    },
    user: {
      getUserById: {
        useQuery: jest.fn(() => ({
          data: {
            user: { id: "1", name: "Alice", email: "test@example.com" },
          },
          isLoading: false,
          isError: false,
        })),
      },
    },
  },
}));

describe("Checking Company's detail", () => {
  it("Checking Company's detail", () => {
    render(
      <SessionProvider session={null}>
        <CompanyDetail />
      </SessionProvider>,
    );

    const Address = screen.getByText("Adress");
    expect(Address).toBeInTheDocument();

    const Industry = screen.getByText("Industry");
    expect(Industry).toBeInTheDocument();

    const Website = screen.getByText("Website");
    expect(Website).toBeInTheDocument();

    const Telephone = screen.getByText("Telephone");
    expect(Telephone).toBeInTheDocument();

    const Size = screen.getByText("Size");
    expect(Size).toBeInTheDocument();
  });
});
