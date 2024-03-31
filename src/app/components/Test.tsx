"use client";

import { Search } from "lucide-react";
import React from "react";

function SearchNav() {
  return (
    <form>
      <div className="mb-4 flex items-center justify-center gap-4">
        <div>
          <label
            htmlFor="location"
            className="mb-2 block font-bold text-gray-700"
          >
            Location
          </label>
          <div className="flex w-full gap-2 rounded-md bg-gray-100 p-2">
            <Search className="text-gray-700" size="18" />
            <input
              placeholder="Enter Address, City or Postal Code"
              className="bg-transparent text-sm text-gray-700"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="houseType"
            className="mb-2 block font-bold text-gray-700"
          >
            House Type
          </label>
          <select
            id="houseType"
            className="appearance-none rounded border border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="bedrooms"
            className="mb-2 block font-bold text-gray-700"
          >
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            className="appearance-none rounded border border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            placeholder="Number of bedrooms"
          />
        </div>
        <div>
          <label
            htmlFor="bathrooms"
            className="mb-2 block font-bold text-gray-700"
          >
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            className="appearance-none rounded border border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            placeholder="Number of bathrooms"
          />
        </div>
        <div>
          <label htmlFor="price" className="mb-2 block font-bold text-gray-700">
            Price Range
          </label>
          <div className="flex">
            <input
              type="number"
              id="minPrice"
              className="flex-1 appearance-none rounded border border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              placeholder="Minimum"
            />
            <span className="px-2 font-bold text-gray-700">to</span>
            <input
              type="number"
              id="maxPrice"
              className="flex-1 appearance-none rounded border border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              placeholder="Maximum"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
}

export default SearchNav;
