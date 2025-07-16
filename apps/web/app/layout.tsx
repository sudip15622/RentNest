import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSession } from "../lib/session";
import NextTopLoader from "nextjs-toploader";
import { ToastProvider } from "../contexts/ToastContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "RentNest - Room Rental Service",
  description: "RentNest is a room rental service platfrom where you can find and book rooms online for rent as well as list your own properties like rooms, flats, apartment, and",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&display=swap"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastProvider>
          <NextTopLoader color="#a16207" showSpinner={true} />
          <div className="min-h-screen flex flex-col">
            <Navbar user={session?.user} />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
