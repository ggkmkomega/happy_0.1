"use client";

// react stuff
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// components
import { Button } from "~/_components/ui/button";
import { UserAccountNav } from "~/_components/user-account-nav";

// assets
import {
  Activity,
  AlignJustify,
  Armchair,
  Bell,
  BookOpenCheck,
  CircleHelp,
  Compass,
  Cookie,
  DraftingCompass,
  type LucideIcon,
  X,
} from "lucide-react";
import unitedStatesIcon from "~/app/assets/united-states.png";
import { type Session } from "next-auth";

const MobileMenuConf = {
  list: [
    {
      icon: BookOpenCheck,
      text: "Change currency",
    },
    {
      icon: Activity,
      text: "Change currency",
    },
    {
      icon: Armchair,
      text: "Locations",
    },
    {
      icon: Cookie,
      text: "Manage Cookies",
    },
    {
      icon: Compass,
      text: "Navigate",
    },
    {
      icon: DraftingCompass,
      text: "Explore",
    },
  ],
};

const Navbar = ({ session }: { session: Session | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const MenuItem = ({
    Icon,
    text,
  }: {
    text: string;
    Icon: LucideIcon | string;
  }) => {
    return (
      <div className="flex h-full items-center gap-4 px-8 active:bg-gray-200">
        <div>{<Icon className="h-6 w-6" />}</div>
        <div className="pb-1">{text}</div>
      </div>
    );
  };

  const NavMenu = () => {
    return (
      <div className="fadeInUp fixed top-0 z-30 h-[100vh] w-full bg-gray-100 py-6">
        <div
          onClick={toggleMenu}
          className="flex items-center justify-end px-5"
        >
          <X />
        </div>
        <h1 className="px-8 pb-9 pt-5 text-3xl font-bold">More</h1>
        <div className="grid h-[68%]">
          {MobileMenuConf.list.map((item) => {
            return (
              <div key={item.text} onClick={toggleMenu}>
                <MenuItem Icon={item.icon} text={item.text} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* only shows on mobile */}
      {isMenuOpen && <NavMenu />}
      <nav className="flex w-full items-center justify-between bg-pink-600 px-3 text-white md:px-7">
        <Link
          aria-label="logo"
          className="flex h-16 flex-none items-center text-lg font-bold md:w-40 md:text-2xl"
          href="/"
        >
          Happy Stays
        </Link>
        {/* list items */}
        <ul className="flex flex-row-reverse items-center justify-end md:gap-3">
          <li onClick={toggleMenu} className="ps-3 md:hidden">
            <AlignJustify className="h-8 w-8" />
          </li>

          {session?.user.id ? (
            <>
              <li className="flex items-center px-3">
                <UserAccountNav
                  user={{
                    name: session.user.name,
                    image: session.user.image,
                    email: session.user.email,
                  }}
                />
              </li>
            </>
          ) : (
            <>
              <li className="hidden md:block">
                <Button variant="secondary" className="text-pink-600">
                  <Link href={"/api/auth/signin"}>Sign In</Link>
                </Button>
              </li>
              <li className="hidden md:block">
                <Button variant="secondary" className="text-pink-600">
                  <Link href={"/api/auth/signin"}>Register</Link>
                </Button>
              </li>
            </>
          )}

          <li className="hidden md:block">
            <Button variant="ghost" className="px-6 py-6">
              <Link href={"/signIn"}>List your property</Link>
            </Button>
          </li>

          {session && (
            <>
              <li>
                <Button variant="ghost" size="icon" className="h-12 w-12 p-1">
                  <Bell className="h-6 w-auto" />
                </Button>
              </li>
            </>
          )}

          <li className="hidden items-center md:flex">
            <Button variant="ghost" size="icon" className="h-12 w-12 p-1">
              <CircleHelp className="h-7 w-auto" />
            </Button>
          </li>

          <li className="hidden items-center md:flex">
            <Button variant="ghost" size="icon" className="h-12 w-12 p-1">
              <Image
                alt="image"
                src={unitedStatesIcon}
                className="h-8 w-auto"
              />
            </Button>
          </li>

          <li className="hidden items-center md:flex">
            <Button variant="ghost" size="icon" className="px-8 py-6 text-lg">
              DZD
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
