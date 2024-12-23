"use client";

import "./globals.css";
import { AccommodationsProvider } from "@/context/AccommodationsContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Athlos Travel | Your Travel Companion</title>
        <meta
          name="description"
          content="Discover the best accommodations worldwide with Athlos Travel."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="w-full">
        <Header />
        <AccommodationsProvider>
          <main className="w-full mx-auto mb-8">{children}</main>
        </AccommodationsProvider>
        <Footer />
      </body>
    </html>
  );
}
