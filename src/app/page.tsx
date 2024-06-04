import { unstable_noStore as noStore } from "next/cache";
import Header from "./_components/Header";
import LocationsDisplay from "./_components/LocationsDisplay";
import Deals from "./_components/Deals";
import FoodDisplay from "./_components/FoodDisplay";
import InfoBoxes from "./_components/InfoBoxes";
import { getServerAuthSession } from "~/server/auth";
import TwoColumnFooter from "~/_components/Footer";

export default async function Home() {
  const session = await getServerAuthSession();

  noStore();

  return (
    <main className="min-h-[150vh]">
      <Header session={session} />
      <LocationsDisplay />
      <Deals />
      <FoodDisplay />
      <InfoBoxes />
      <div className="p-8">
        <TwoColumnFooter />
      </div>
    </main>
  );
}
