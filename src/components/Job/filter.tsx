import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Popover } from "@headlessui/react";
import { BsFillFilterSquareFill } from "react-icons/bs";

export function Searchbar({ className, data, setFilteredData }) {
  const [searchText, setSearchText] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const filteredData = filter(data, selectedFilters, searchText);
    setFilteredData(filteredData);
  }, [selectedFilters, data, searchText]);

  return (
    <div className={twMerge("flex flex-row justify-between", className)}>
      <div className="w-full">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21L15 15M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-black focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
      </div>

      <Popover className="mx-2 mt-1">
      <Popover.Button className="flex items-center justify-center rounded-lg bg-indigo-600 px-2 py-2 text-white">
      <BsFillFilterSquareFill className="inline" />
         <span className="ml-3 text-sm font-semibold">Filter</span>
        </Popover.Button>
        <Popover.Panel className="absolute z-10 rounded-lg bg-white p-4 text-base font-semibold shadow-lg">
          {filterOptions.map((option) => (
            <div key={option.value}>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedFilters.includes(option.value)}
                  onChange={(e) => {
                    const newFilters = e.target.checked
                      ? [...selectedFilters, option.value]
                      : selectedFilters.filter(f => f !== option.value);
                    setSelectedFilters(newFilters);
                  }}
                />
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function filter(data, selectedFilters, searchText) {
  let filteredData = data.filter(item => {
    const searchLower = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      (item.description?.toLowerCase().includes(searchLower) || false) ||
      (item.industry?.toLowerCase().includes(searchLower) || false)
    );
  });

  selectedFilters.forEach(filterBy => {
    if (["full-time", "part-time", "contract"].includes(filterBy)) {
      filteredData = filteredData.filter(jobData =>
        jobData.jobListings.some(listing => listing.type.toLowerCase() === filterBy)
      );
    } else {
      switch (filterBy) {
        case "name":
          filteredData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "job-amount":
          filteredData.sort((a, b) => b.jobListings.length - a.jobListings.length);
          break;
        case "rating":
          filteredData.sort((a, b) => (b.ratings ?? 0) - (a.ratings ?? 0));
          break;
      }
    }
  });

  return filteredData;
}

const filterOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "job-amount", label: "Opened Position (High-Low)" },
  { value: "rating", label: "Rating (High-Low)" },
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" }
];
