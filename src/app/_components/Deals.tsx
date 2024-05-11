import { MoveRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import AdCard from "./AdCard";
import { dealsSection } from "~/config/site";

const Deals = () => {
  return (
    <div className="px-3">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-3xl font-bold capitalize">{dealsSection.title}</h1>
        <div className="hidden md:block">
          <Button variant={"outline"} className="text-md">
            <div className="flex items-center px-1">
              See All
              <MoveRightIcon className="ps-2" />
            </div>
          </Button>
        </div>
      </div>

      {/* Ads cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {dealsSection.dealsInfo.map((deal) => {
          return <AdCard key={deal.title} data={deal} />;
        })}
      </div>
      <div className="py-5">
        <Button variant={"outline"} className="text-md w-full md:hidden">
          <div className="flex items-center px-1">
            See All
            <MoveRightIcon className="ps-2" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Deals;
