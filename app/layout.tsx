import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chocolate Cinematic | Premium Chocolate Experience",
  description:
    "Immerse yourself in a cinematic chocolate experience. Discover our premium collection of Dark Chocolate, Lemon White Chocolate, and Strawberry Chocolate.",
  keywords: [
    "premium chocolate",
    "dark chocolate",
    "lemon chocolate",
    "strawberry chocolate",
    "luxury chocolate",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-outfit antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
