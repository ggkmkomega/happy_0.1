import { MapPin, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/_components/ui/card";
import { cardData } from "~/config/site";

const LocationCardGroup = () => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-x-hidden">
      <div className="flex w-[400vw] justify-center gap-5 md:w-full md:px-5">
        {cardData.map((data) => {
          return (
            <Card className="w-[100vw] border-none bg-gray-100 shadow-none md:w-auto">
              <CardHeader className="w-full p-0">
                <img
                  className="h-[13rem] w-auto rounded-sm object-cover"
                  src={data.img}
                />
              </CardHeader>
              <CardContent className="grid w-full gap-y-1 px-0 py-3">
                <h1 className="text-md font-bold capitalize">{data.title}</h1>
                <div className="flex">
                  <MapPin className="mr-1 w-[18px] text-gray-400" />
                  <p className="">{data.location}</p>
                </div>
                <div className="flex">
                  <Star className="mr-1 w-[18px] text-gray-400" />
                  <p className="">{data.rating}</p>
                </div>
              </CardContent>
              <CardFooter className="grid w-full px-0">
                <h1 className="text-xl font-bold">DZD {" "}{data.price},00</h1>
                <p className="text-xs text-gray-500">includes fees and taxs</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LocationCardGroup;
