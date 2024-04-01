import React from "react";
import { Search } from "lucide-react";

function SearchFilters() {
  return (
    <>
      <div className="  w-full items-center justify-around rounded-sm bg-pink-600 p-4 px-3 text-white md:px-7">
        <SearchNav />
      </div>
    </>
  );
}

const SearchNav = () => {
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
          <div className="flex w-72 gap-2 rounded-md bg-gray-100 p-4">
            <Search className="text-gray-700" size="18" />
            <input
              placeholder="Enter Address, City or Postal Code"
              className="w-full bg-transparent text-sm text-gray-700"
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
            className=" appearance-none rounded border border-gray-200 bg-gray-200 p-4 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
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
            className="appearance-none rounded border border-gray-200 bg-gray-200 p-4 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
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
            className="appearance-none rounded border border-gray-200 bg-gray-200 p-4 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
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
              className="flex-1 appearance-none rounded border border-gray-200 bg-gray-200 p-4 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              placeholder="Minimum"
            />
            <span className="px-2 font-bold text-gray-700">to</span>
            <input
              type="number"
              id="maxPrice"
              className="flex-1 appearance-none rounded border border-gray-200 bg-gray-200 p-4 px-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              placeholder="Maximum"
            />
          </div>
        </div>
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 p-4 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFilters;
