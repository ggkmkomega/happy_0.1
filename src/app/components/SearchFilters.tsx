import React from "react";
import { Search } from "lucide-react";
function SearchFilters() {
  return (
    <div className=" flex w-full items-center justify-around bg-pink-600 p-4 px-3 text-white md:px-7">
      <div>
        <div className="flex  justify-between gap-2 rounded-md bg-gray-100  p-2">
          <Search className=" text-gray-700" size="18" />
          <input
            placeholder="Enter Address,City or Postal Code"
            className=" bg-transparent text-sm text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
