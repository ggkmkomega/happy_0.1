import { unstable_noStore as noStore } from "next/cache";
import Deals from "./components/Deals";
import FoodDisplay from "./components/FoodDisplay";
import Header from "./components/Header";
import InfoBoxes from "./components/InfoBoxes";
import LocationsDisplay from "./components/LocationsDisplay";

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
  )
}
