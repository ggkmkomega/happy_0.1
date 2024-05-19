import { unstable_noStore as noStore } from "next/cache";
import Header from "./_components/Header";
import LocationsDisplay from "./_components/LocationsDisplay";
import Deals from "./_components/Deals";
import FoodDisplay from "./_components/FoodDisplay";
import InfoBoxes from "./_components/InfoBoxes";

export default async function Home() {
  noStore();

  return (
    <main className="min-h-[150vh]">
      <Header />
      <LocationsDisplay />
      <Deals />
      <FoodDisplay />
      <InfoBoxes />
      {/* TODO :
      - Footer
      */}
    </main>
  );
}
