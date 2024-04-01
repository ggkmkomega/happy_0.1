import { unstable_noStore as noStore } from "next/cache";
import SearchFilters from "./components/SearchFilters";
import Map from "./components/Map";
import SingleListing from "./components/SingleListing";

export default async function Home() {
  noStore();

  return (
    <>
      <SearchFilters />
      <div className="absolute ">
        <div className="grid grid-cols-2 ">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex" key={index}>
              <SingleListing />
            </div>
          ))}
        </div>
        <Map />
      </div>
    </>
  );
}
