import { Map } from "lucide-react";
import { Button } from "~/_components/ui/button";
import { darkenedBgImage } from "~/lib/utils";

const InfoBoxes = () => {
  return (
    <div className="grid md:flex w-full gap-2 p-2">
      <div className="grid gap-2">
        <div
          style={{
            backgroundImage: darkenedBgImage(
              "https://images.unsplash.com/photo-1595168318069-217391d91943?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ),
          }}
          className="flex h-[46vh] w-full items-center rounded bg-red-100 bg-cover bg-center bg-no-repeat px-3 md:w-[35vw]"
        >
          <div className="flex flex-col items-start gap-2 py-3 md:gap-5">
            <Button variant={"secondary"} className="p-2">
              <Map />
            </Button>
            <h1 className="text-xl font-bold text-white md:w-9/12">
              Explore more to get out of your comfort zone
            </h1>
            <p className="text-white">Book your perfect stay with us.</p>
            <Button variant={"outline"}>Book a trip now</Button>
          </div>
        </div>

        <div
          style={{
            backgroundImage: darkenedBgImage(
              "https://images.unsplash.com/photo-1588676449872-3eaa8b242e69?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ),
          }}
          className="flex min-h-[24vh] w-full items-end rounded bg-cover bg-center bg-no-repeat md:h-[33vh] md:w-[35vw]"
        >
          <div className="px-3 py-4 text-white">
            <p>Destinations available</p>
            <h1 className="text-3xl font-bold">1,242</h1>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: darkenedBgImage(
            "https://images.unsplash.com/photo-1535585538107-e457d37fbde5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ),
        }}
        className="flex h-[50vh] w-full items-center justify-center rounded bg-cover bg-center bg-no-repeat text-white md:h-[80vh] md:w-[65vw]"
      >
        <div className="w-11/12 text-center text-xl font-bold md:w-9/12 md:text-3xl">
          Beyound acommodations, creating memories of a lifetime
        </div>
      </div>
    </div>
  );
};

export default InfoBoxes;
