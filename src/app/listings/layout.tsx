import { notFound } from "next/navigation";

import { MainNav } from "~/_components/main-nav";
import { DashboardNav } from "~/_components/nav";
//import { SiteFooter } from "~/_components/site-footer";
import { UserAccountNav } from "~/_components/user-account-nav";
import { AdminConfig } from "~/config/admin";
import { getServerAuthSession } from "~/server/auth";
import Navbar from "../_components/Navbar";

interface ListingsLayoutProps {
  children?: React.ReactNode;
}

export default async function ListingsLayout({
  children,
}: ListingsLayoutProps) {
  const session = await getServerAuthSession();
  const user = session?.user;

  if (!user) {
    return notFound();
  }

  return (
    <div className="">
        <Navbar session={session} />
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
  );
}
