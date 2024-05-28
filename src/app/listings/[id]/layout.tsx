import { notFound } from "next/navigation";

//import { SiteFooter } from "~/_components/site-footer";
import Navbar from "~/app/_components/Navbar";
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
