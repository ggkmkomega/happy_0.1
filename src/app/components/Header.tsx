import { getServerAuthSession } from "~/server/auth";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const session = await getServerAuthSession() || null;

const Header = () => {

    return (
        <header className="p-2 md:p-3">
            <div className="items-start rounded-lg bg-gray-300 min-h-[95vh] bg-center bg-cover bg-no-repeat"
                style={{ "backgroundImage": "linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) ), url('https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                <div className="w-full overflow-hidden rounded-t-lg">
                    <Navbar session={session} />
                </div>
                <div className="grid items-start pt-14 md:pt-20 text-center  h-full">
                    <div className="md:pb-16 w-[80%] mx-auto ">
                        <h1 className="text-4xl md:text-7xl text-white font-bold py-3 capitalize">Tailored Travel, <br /> Compared For You</h1>
                        <p className="text-gray-200 text-sm md:text-lg py-2">Instantly find the best deals on flights , hotels , vacation packages. <br /> Start planning your dream getaway today!</p>
                        <div className="flex justify-center gap-1">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;