import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { foodCardData } from "~/config/site";

const FoodCardGroup = () => {
    return (
        <div className="w-full overflow-x-scroll md:overflow-x-hidden">
            <div className="grid grid-cols-8 gap-4 md:grid-cols-4 md:px-5 w-[800vw] sm:w-[400vw] md:w-full">
                {
                    foodCardData.map(data => {
                        return (
                            <Card className="col-span-1 shadow-none border-none bg-gray-100">
                                <CardHeader className="p-0 h-[13rem] w-full">
                                    <img className="h-full w-full rounded-sm object-cover" src={data.img} />
                                </CardHeader>
                                <CardContent className="px-0 py-3 grid gap-y-1 w-full">
                                    <h1 className="font-bold text-md capitalize">{data.title}</h1>
                                    <div className="flex">
                                        <MapPin className="text-gray-400 w-[18px] mr-1" />
                                        <p className="">{data.location}</p>
                                    </div>
                                    <div className="flex">
                                        <Star className="text-gray-400 w-[18px] mr-1" />
                                        <p className="">{data.rating}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default FoodCardGroup;