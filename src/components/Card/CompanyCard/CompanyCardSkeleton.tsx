const CompanyCardSkeleton = () => {
  return (
    <li className="col-span-1 rounded-lg bg-white shadow">
      <div className="flex w-full animate-pulse items-center space-x-6 p-6">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-200"></div> {/* For the name */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-200"></div>{" "}
              <div className="col-span-1 h-2 rounded bg-gray-200"></div>{" "}
            </div>
            <div className="h-2 rounded bg-gray-200"></div>{" "}
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>{" "}
      </div>
    </li>
  );
};

export default CompanyCardSkeleton;
