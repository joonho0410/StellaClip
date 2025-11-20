import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppLayout } from "@/1_views/layout";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stella Clip - Design System",
  description: "A modern component library built with Linear's design principles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}