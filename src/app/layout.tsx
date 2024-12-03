import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reggie - Event Registration Platform",
  description:
    "A modern platform for event organizers and agents to manage registrations and assignments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-h-screen overflow-hidden h-screen ">
      <body className={inter.className}>
        <Navigation />
        <div className="h-full min-h-full overflow-y-auto scrollbar-hide">{children}</div>
      </body>
    </html>
  );
}
