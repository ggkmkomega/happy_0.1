// UI components / style
import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";
import { Toaster } from "~/_components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "~/trpc/react";

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
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          {/*          <Navbar session={session} />*/}
          <NextTopLoader />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
