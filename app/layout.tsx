import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aaru Cab | Safe Rides. On Time. Every Time.",
  description:
    "Premium cab service for local rides, outstation trips, airport transfers, and corporate travel. Your Journey, Our Commitment.",
  keywords: [
    "cab service",
    "taxi booking",
    "airport transfer",
    "outstation cab",
    "Aaru Cab",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full scroll-smooth`}>
      <body className="min-h-full antialiased font-sans">{children}</body>
    </html>
  );
}
