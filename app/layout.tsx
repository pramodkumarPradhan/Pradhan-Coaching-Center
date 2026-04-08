import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pradhan Coaching Center | Best Coaching in Shiamgir",
  description:
    "Pradhan Coaching Center offers quality education for classes 8th to 12th. Experienced faculty, regular tests, and study materials available.",
  keywords: [
    "Pradhan Coaching Center",
    "Coaching in Shiamgir",
    "Best coaching center",
    "Class 8 9 10 11 12 coaching",
    "Study materials Shiamgir",
  ],
  authors: [{ name: "Pradhan Coaching Center" }],
  openGraph: {
    title: "Pradhan Coaching Center",
    description:
      "Quality education for academic excellence.",
    url: "https://radharanicoaching.in",
    siteName: "Radharani Coaching",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="dark">
      <body>{children}</body>
    </html>
  );
}