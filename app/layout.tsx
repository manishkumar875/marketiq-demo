import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MarketIQ — Global Market Research & Consumer Insights",
  description: "Turning consumer data into business growth. AI-accelerated market research, brand tracking, customer experience measurement, and consumer intelligence for businesses worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
