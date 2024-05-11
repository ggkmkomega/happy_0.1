import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/_components/ui/card";
import { foodCardData } from "~/config/site";

const FoodCardGroup = () => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-x-hidden">
      <div className="grid w-[800vw] grid-cols-8 gap-4 sm:w-[400vw] md:w-full md:grid-cols-4 md:px-5">
        {foodCardData.map((data) => {
          return (
            <Card className="col-span-1 border-none bg-gray-100 shadow-none">
              <CardHeader className="h-[13rem] w-full p-0">
                <img
                  className="h-full w-full rounded-sm object-cover"
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
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FoodCardGroup;
