// UI components / style
import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Toaster } from "~/_components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";

export const metadata = {
  title: "Happy Stays",
  description: "Plan your next Trip",
  icons: [{ rel: "icon", url: "/bg-logo.png" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <TRPCReactProvider>
          {/*          <Navbar session={session} />*/}
          <NextTopLoader showSpinner={false} />
          <div className="flex h-10 w-full items-center justify-center bg-pink-600  text-white">
            <span>We Proudly Support The State Of Palestine</span>
            <span className="ml-2 shadow-sm">
              <Image
                src="/Palestine-1024.webp"
                height={24}
                width={24}
                alt="palestine"
              />
            </span>
          </div>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
