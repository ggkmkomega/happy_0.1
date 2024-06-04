import { redirect } from "next/navigation";

import { MainNav } from "~/_components/main-nav";
import { DashboardNav } from "~/_components/nav";
//import { SiteFooter } from "~/_components/site-footer";
import { UserAccountNav } from "~/_components/user-account-nav";
import { AdminConfig } from "~/config/admin";
import { getServerAuthSession } from "~/server/auth";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerAuthSession();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav admin items={AdminConfig.mainNav} />
          <UserAccountNav
            admin
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={AdminConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  );
}
