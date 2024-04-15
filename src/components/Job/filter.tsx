import { twMerge } from "tailwind-merge";
import { Popover } from "@headlessui/react";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { JobData } from "~/pages/index";

interface FilterProps {
  className?: string;
  data: JobData[];
  setFilteredData: (FilteredJobData: JobData[]) => void;
}

const filterOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "job-amount", label: "Opened Position (High-Low)" },
  { value: "rating", label: "Rating (High-Low)" },
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" }
];

const jobTypeOptions = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" }
];

export function Searchbar(props: FilterProps) {
  const [searchText, setSearchText] = useState("");
  const [filteredBy, setFilteredBy] = useState("name");

  useEffect(() => {
    console.log("Filtering by", filteredBy);
    console.log("Searching by", searchText);
    const data = filter(props.data, filteredBy, searchText);
    props.setFilteredData(data);
  }, [filteredBy, props.data, searchText]);

  return (
    <div className={twMerge("flex flex-row justify-between", props.className)}>
      {/* search bar */}
      <div className="w-full">
        <label className="sr-only mb-2 text-sm font-medium text-black">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ps-10 text-sm text-black focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
      </div>
      {/* filter drop down */}
      <Popover className={"mx-2 mt-1"}>
        <Popover.Button className="rounded-lg bg-indigo-600 p-2 text-center text-white">
          <div className="flex flex-row items-center justify-center">
            <BsFillFilterSquareFill />
            <p className="ml-3 text-sm font-semibold text-white">Filter</p>
          </div>
        </Popover.Button>

        {/* always in the middle */}
        <Popover.Panel className="absolute z-10 rounded-lg bg-white p-4 text-base font-semibold shadow-lg">
          {/* radio button */}
          <RadioGroup value={filteredBy} onChange={setFilteredBy}>
            <RadioGroup.Label className="text-indigo-700">
              Filter by
            </RadioGroup.Label>
            {filterOptions.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  twMerge(
                    "mt-1 cursor-pointer rounded p-2 text-sm font-semibold text-gray-700 transition-all hover:scale-105 hover:bg-indigo-700 hover:text-white focus:outline-none",
                    active || option.value == filteredBy
                      ? "bg-indigo-700 text-white"
                      : "",
                  )
                }
              >
                {option.label}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function filter(data: JobData[], filterBy: string, searchText: string) {
  const jobTypePriority = {
    "full-time": 1,
    "part-time": 2,
    "contract": 3
  };

  // Filter by search text
  let filteredData = data.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      (item.description?.toLowerCase().includes(searchLower) || false) ||
      (item.industry?.toLowerCase().includes(searchLower) || false)
    );
  });

  // Filter by job type if selected
  if (filterBy === "full-time" || filterBy === "part-time" || filterBy === "contract") {
    filteredData = filteredData.filter(jobData =>
      jobData.jobListings.some(listing => listing.type.toLowerCase() === filterBy.toLowerCase())
    );
  }
  console.log(filterBy,filteredData);
  // Sort by name, job amount, or rating if those filters are selected
  switch (filterBy) {
    case "name":
      return filteredData.sort((a, b) => a.name.localeCompare(b.name));
    case "job-amount":
      return filteredData.sort((a, b) => b.jobListings.length - a.jobListings.length);
    case "rating":
      return filteredData.sort((a, b) => (b.ratings ?? 0) - (a.ratings ?? 0));
    default:
      return filteredData; // Includes filtering by job type but no additional sort is necessary
  }
}