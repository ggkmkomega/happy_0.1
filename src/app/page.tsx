import { unstable_noStore as noStore } from "next/cache";
import Header from "./__components/Header";
import LocationsDisplay from "./__components/LocationsDisplay";
import Deals from "./__components/Deals";
import FoodDisplay from "./__components/FoodDisplay";
import InfoBoxes from "./__components/InfoBoxes";

export default async function Home() {
  noStore();

  return (
    <main className="min-h-[150vh] bg-gray-100">
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
