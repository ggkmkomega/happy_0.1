"use client";


// react stuff
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// components
import { Button } from "~/components/ui/button";
import { UserAccountNav } from "~/components/user-account-nav";

// assets
import { Activity, AlignJustify, Armchair, Bell, BookOpenCheck, CircleHelp, CircleUser, Compass, Cookie, DraftingCompass, LucideIcon, X } from "lucide-react";
import unitedStatesIcon from "~/app/assets/united-states.png";
import { Session } from "next-auth";


const MobileMenuConf = {
  list: [
    {
      icon: BookOpenCheck,
      text: "Change currency"
    },
    {
      icon: Activity,
      text: "Change currency"
    },
    {
      icon: Armchair,
      text: "Locations"
    },
    {
      icon: Cookie,
      text: "Manage Cookies"
    },
    {
      icon: Compass,
      text: "Navigate"
    },
    {
      icon: DraftingCompass,
      text: "Explore"
    },
  ]
}

const Navbar = ({ session }: { session: Session }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const MenuItem = ({ Icon, text }: { text: string, Icon: LucideIcon | string }) => {
    return (
      <div className="active:bg-gray-200 h-full flex items-center gap-4 px-8">
        <div>
          {<Icon className="h-6 w-6" />}
        </div>
        <div className="pb-1">
          {text}
        </div>
      </div>
    )
  }

  const NavMenu = () => {
    return (
      <div className="fadeInUp fixed top-0 bg-gray-100 z-30 h-[100vh] w-full py-6">
        <div onClick={toggleMenu} className="flex justify-end items-center px-5">
          <X />
        </div>
        <h1 className="text-3xl font-bold pt-5 pb-9 px-8">More</h1>
        <div className="grid h-[68%]">
          {
            MobileMenuConf.list.map(item => {
              return (
                <div onClick={toggleMenu}>
                  <MenuItem Icon={item.icon} text={item.text} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  return (
    <>
      {/* only shows on mobile */}
      {isMenuOpen && <NavMenu />}
      <nav className="flex items-center justify-between w-full bg-pink-600 text-white px-3 md:px-7">
        <Link
          aria-label="logo"
          className="text-lg md:text-2xl font-bold flex h-16 md:w-40 flex-none items-center"
          href="/">
          Happy Stays
        </Link>
        {/* list items */}
        <ul className="flex flex-row-reverse items-center justify-end md:gap-3">
          <li onClick={toggleMenu} className="ps-3 md:hidden">
            <AlignJustify className="h-8 w-8" />
          </li>

          {session &&
            <>
              <li className="px-3 flex items-center">
                <UserAccountNav
                  user={{
                    name: session.user.name,
                    image: session.user.image,
                    email: session.user.email,
                  }}
                />
              </li>
            </>
          }

          {!session &&
            <li>
              <Link href={"/api/auth/signin"}>
                <CircleUser className="md:hidden h-8 w-8" />
              </Link>
            </li>
          }

          {!session &&
            <>
              <li className="hidden md:block">
                <Button variant="secondary" className="text-pink-600">
                  <Link
                    href={"/api/auth/signin"}
                  >
                    Sign In
                  </Link>
                </Button>
              </li>
              <li className="hidden md:block">
                <Button variant="secondary" className="text-pink-600">
                  <Link
                    href={"/api/auth/signin"}
                  >
                    Register
                  </Link>
                </Button>
              </li>
            </>
          }

          <li className="hidden md:block">
            <Button variant="ghost" className="px-6 py-6">
              <Link
                href={"/signIn"}
              >
                List your property
              </Link>
            </Button>
          </li>

          {session &&
            <>
              <li>
                <Button variant="ghost" size="icon" className="p-1 h-12 w-12">
                  <Bell className="h-6 w-auto" />
                </Button>
              </li>
            </>
          }

          <li className="items-center hidden md:flex">
            <Button variant="ghost" size="icon" className="p-1 h-12 w-12">
              <CircleHelp className="h-7 w-auto" />
            </Button>
          </li>

          <li className="hidden md:flex items-center">
            <Button variant="ghost" size="icon" className="p-1 h-12 w-12">
              <Image alt="image" src={unitedStatesIcon} className="h-8 w-auto" />
            </Button>
          </li>

          <li className="hidden md:flex items-center">
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
