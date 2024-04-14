// UI components / style
import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { Toaster } from "~/components/ui/toaster"
import NextTopLoader from 'nextjs-toploader';
import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Happy Stays",
  description: "Plan your next Trip",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
<<<<<<< HEAD
          {/* <Navbar session={session} /> */}

=======
          <Navbar session={session} />
          <NextTopLoader />
>>>>>>> 628e99ffaf9f7427c936d3dd4f2edc64448e1d0c
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
