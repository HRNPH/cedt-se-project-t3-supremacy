const CompanyDetailSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl w-screen">
      <div className="animate-pulse overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <div className="h-6 w-full rounded-md bg-gray-200"></div>{" "}
          <div className="mt-1 h-4 w-full max-w-2xl rounded-md bg-gray-200"></div>{" "}
        </div>
        <div className="border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="h-4 w-full rounded-md bg-gray-200"></div>{" "}
              <div className="mt-1 h-4 w-full rounded-md bg-gray-200 sm:col-span-2 sm:mt-0"></div>{" "}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="h-4 w-full rounded-md bg-gray-200"></div>{" "}
              <div className="mt-1 h-4 w-full rounded-md bg-gray-200 sm:col-span-2 sm:mt-0"></div>{" "}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="h-4 w-full rounded-md bg-gray-200"></div>{" "}
              <div className="mt-1 h-4 w-full rounded-md bg-gray-200 sm:col-span-2 sm:mt-0"></div>{" "}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="h-4 w-full rounded-md bg-gray-200"></div>{" "}
              <div className="mt-1 h-4 w-full rounded-md bg-gray-200 sm:col-span-2 sm:mt-0"></div>{" "}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailSkeleton;
