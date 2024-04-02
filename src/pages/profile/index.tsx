import { api } from "~/utils/api";
import Page from "../layout/page";
import { useSession } from "next-auth/react";
import Avvvatars from "avvvatars-react";
import CompanyDetailSkeleton from "~/components/Card/CompanyDetailCard/CompanyDetailSkeleton";
export default function Profile() {
  const sessionId = useSession().data?.user.id ?? "NO_OP";
  const { data, isLoading } = api.user.getUserById.useQuery(sessionId);
  return (
    <div className="bg-gray-50">
      <Page className="mx-auto mt-10 max-w-screen-xl">
        {!isLoading && data ? (
          <div className="mx-auto w-screen max-w-screen-lg">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="flex flex-col px-4  py-6 sm:px-6 md:flex-row">
                <Avvvatars
                  value={data?.name ?? "Anonymous"}
                  size={80}
                  border={true}
                  radius={100}
                />
                <div className="pt-5 md:pl-5 md:pt-3">
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    {data?.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    {data?.profile.headline}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Firstname
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.profile.firstName}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Lastname
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.profile.lastName}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Email</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.email}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">
                      Telephone
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data?.profile.telephone}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <CompanyDetailSkeleton />
          </div>
        )}
      </Page>
    </div>
  );
}
