import { Map } from "lucide-react";
import { Button } from "~/components/ui/button";
import { darkenedBgImage } from "~/lib/utils";

const InfoBoxes = () => {
    return (
        <div className="flex flex-col md:flex-row w-full gap-2 p-3">
            <div className="grid gap-2">
                <div
                    style={{ "backgroundImage": darkenedBgImage("https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") }}
                    className="flex items-center px-3 bg-red-100 bg-center bg-cover bg-no-repeat rounded h-[46vh] w-full md:w-[35vw]">
                    <div className="flex flex-col items-start gap-2 md:gap-5 py-3">
                        <Button
                            variant={"secondary"}
                            className="p-2">
                            <Map />
                        </Button>
                        <h1 className="text-xl text-white font-bold md:w-9/12">
                            Explore more to get out of your comfort zone
                        </h1>
                        <p className="text-white">Book your perfect stay with us.</p>
                        <Button variant={"outline"}>
                            Book a trip now
                        </Button>
                    </div>
                </div>

                <div
                    style={{ "backgroundImage": darkenedBgImage("https://images.unsplash.com/photo-1712971404210-658cb22c84fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") }}
                    className="flex items-end bg-center bg-cover bg-no-repeat rounded min-h-[24vh] md:h-[33vh] w-full md:w-[35vw]">
                    <div className="text-white px-3 py-4">
                        <p>
                            Destinations available
                        </p>
                        <h1 className="text-3xl font-bold">1,242</h1>
                    </div>
                </div>
            </div>

            <div
                style={{ "backgroundImage": darkenedBgImage("https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") }}
                className="flex items-center justify-center text-white bg-center bg-cover bg-no-repeat rounded h-[50vh] md:h-[80vh] w-full md:w-[65vw]">
                <div className="w-11/12 md:w-9/12 text-xl md:text-3xl font-bold text-center">
                    Beyound acommodations, creating memories of a lifetime
                </div>
            </div>
        </div>
    );
}

export default InfoBoxes;