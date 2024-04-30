import { useState } from "react";
import { api } from "~/utils/api";
import Page from "./layout/page";
import CompanyCard from "~/components/Card/CompanyCard";
import CompanyCardSkeleton from "~/components/Card/CompanyCard/CompanyCardSkeleton";
import {
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { Searchbar } from "~/components/Job/filter";

type JobData = {
  id: string;
  name: string;
  description: string | null;
  industry: string | null;
  ratings: number | null;
  size: number | null;
  jobListings: Array<{
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
  }>;
};

const features = [
  {
    name: "Diverse Opportunities",
    description:
      "Explore a wide range of career opportunities from various industries and sectors. Find your perfect match and take your career to the next level.",
    icon: BriefcaseIcon,
  },
  {
    name: "Networking Events",
    description:
      "Connect with industry leaders, potential employers, and like-minded professionals. Expand your network and discover new career paths.",
    icon: ChatBubbleLeftIcon,
  },
  {
    name: "Workshop Sessions",
    description:
      "Enhance your skills with our series of workshops and seminars designed to prepare you for your next career move. From resume writing to interview techniques, we’ve got you covered.",
    icon: ClipboardIcon,
  },
];

export default function Home() {
  const { data, isLoading } = api.company.getAllCompaniesData.useQuery();
  const [filterableData, setFilterableData] = useState<JobData[]>(data ?? []);

  const SetNewFilteredData = (newData: JobData[]) =>
    setFilterableData([...newData]);

  return (
    <Page>
      <div className="mx-5 max-w-screen-xl text-2xl 2xl:mx-auto">
        <h1 className="my-5 pt-5 font-semibold">Company</h1>
        <Searchbar
          className="mb-4"
          data={data ?? []}
          setFilteredData={SetNewFilteredData}
        />
        <ul
          data-cy="job-offer-list"
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {!isLoading ? (
            filterableData.length > 0 ? (
              filterableData.map((company) => (
                <CompanyCard
                  key={company.id}
                  {...company}
                  description={
                    company.description ?? "No description available"
                  }
                />
              ))
            ) : (
              <li>No data available</li>
            )
          ) : (
            Array.from({ length: 6 }).map((_, index) => (
              <CompanyCardSkeleton key={index} />
            ))
          )}
        </ul>

        <div className="mt-20 rounded-xl bg-gray-50 p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Unlock Your Career Potential
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join us at the leading job fair event to connect, discover, and
            secure your next career opportunity. Whether you&apos;re looking for
            your first job, a career change, or the chance to network with top
            companies, we have something for everyone.
          </p>
          <dl className="mt-5 grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Page>
  );
}
