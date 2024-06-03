// UI components / style
import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Toaster } from "~/_components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font/sans";

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
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
