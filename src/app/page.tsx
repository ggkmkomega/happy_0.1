import { unstable_noStore as noStore } from "next/cache";
import Header from "./components/Header";
import LocationsDisplay from "./components/LocationsDisplay";
import Deals from "./components/Deals";
import FoodDisplay from "./components/FoodDisplay";
import InfoBoxes from "./components/InfoBoxes";

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
