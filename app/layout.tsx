import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pradhancoaching.com"),
  title: "Pradhan Coaching Center - Best Coaching in Tekhand, Okhla Phase 1, New Delhi",
  description:
    "Pradhan Coaching Center in Tekhand, Okhla Phase 1, New Delhi provides quality education for classes 8th to 12th with experienced teachers, regular tests, and study materials.",
  keywords: [
    "Pradhan Coaching Center Tekhand",
    "Coaching in Okhla Phase 1",
    "Best coaching in New Delhi",
    "Class 8 9 10 11 12 coaching Delhi",
    "Tuition center Tekhand Delhi",
  ],
  authors: [{ name: "Pradhan Coaching Center" }],
  openGraph: {
    title: "Pradhan Coaching Center",
    description: "Best coaching center in Tekhand, Okhla Phase 1, New Delhi.",
    url: "https://pradhancoaching.com",
    siteName: "Pradhan Coaching Center",
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