import { MapPin, Star } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "~/components/ui/card";
import { cardData } from "~/config/site";

const LocationCardGroup = () => {
    return (
        <div className="w-full overflow-x-scroll md:overflow-x-hidden">
            <div className="flex justify-center gap-5 md:px-5 w-[400vw] md:w-full">
                {
                    cardData.map(data => {
                        return (
                            <Card className="w-[100vw] md:w-auto shadow-none border-none bg-gray-100">
                                <CardHeader className="p-0 w-full">
                                    <img className="h-[13rem] rounded-sm object-cover w-auto" src={data.img} />
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
                                <CardFooter className="px-0 grid w-full">
                                    <h1 className="font-bold text-xl">${data.price}</h1>
                                    <p className="text-xs text-gray-500">includes fees and taxs</p>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default LocationCardGroup;