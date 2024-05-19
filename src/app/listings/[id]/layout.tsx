import { notFound } from "next/navigation";

import { MainNav } from "~/_components/main-nav";
import { DashboardNav } from "~/_components/nav";
//import { SiteFooter } from "~/_components/site-footer";
import { UserAccountNav } from "~/_components/user-account-nav";
import Navbar from "~/app/_components/Navbar";
import { dashboardConfig } from "~/config/dashboard";
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
        return notFound();
    }

    return (
        <>
            <Navbar session={session}/>
            <main>
                {children}
            </main>
        </>
    );
}
