import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

interface ListingsLayoutProps {
    children?: React.ReactNode;
}

export default async function ListingsLayout({
    children,
}: ListingsLayoutProps) {

    const session = await getServerAuthSession();
    const user = session?.user;

    if(!user) redirect("/sign-in")
        
    return (
        <div className="">
            <main className="flex w-full flex-1 flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}
