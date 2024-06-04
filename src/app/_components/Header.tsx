import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { type Session } from "next-auth";
import heroImage from "~/app/assets/hero.png";

const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="p-2 md:p-3">
      <div
        className="min-h-[95vh] items-start rounded-lg bg-gray-300 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) ), url('https://images.unsplash.com/photo-1535585538107-e457d37fbde5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="w-full overflow-hidden rounded-t-lg">
          <Navbar session={session} />
        </div>
        <div className="grid h-full items-start pt-14 text-center  md:pt-20">
          <div className="mx-auto w-[80%] md:pb-16 ">
            <h1 className="py-3 text-4xl font-bold capitalize text-white md:text-7xl">
              Tailored Travel, <br /> Compared For You
            </h1>
            <p className="py-2 text-sm text-gray-200 md:text-lg">
              Instantly find the best deals on flights , hotels , vacation
              packages. <br /> Start planning your dream getaway today!
            </p>
            <div className="flex justify-center gap-1">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
