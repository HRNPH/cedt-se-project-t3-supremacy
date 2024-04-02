import { api } from "~/utils/api";
import Page from "./layout/page";
import CompanyCard from "~/components/Card/CompanyCard";
import CompanyCardSkeleton from "~/components/Card/CompanyCard/CompanyCardSkeleton";
import {
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const { data, isLoading } = api.company.getAllCompaniesData.useQuery(); // Assuming isLoading is available

  return (
    <Page>
      <div className="mx-5 max-w-screen-xl text-2xl 2xl:mx-auto">
        <div>
          <h1 className="my-5 pt-5 font-semibold">Company</h1>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {!isLoading && data
              ? data.map((company) => (
                  <CompanyCard
                    key={company.id}
                    {...company}
                    description={
                      company.description ?? "No description available"
                    }
                  />
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <CompanyCardSkeleton key={index} />
                ))}
          </ul>
        </div>
        <div className="mt-20 rounded-xl bg-gray-50 p-10">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Unlock Your Career Potential
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join us at the leading job fair event to connect, discover, and
              secure your next career opportunity. Whether you&apos;re looking
              for your first job, a career change, or the chance to network with
              top companies, we have something for everyone.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
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
      </div>
    </Page>
  );
}

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
