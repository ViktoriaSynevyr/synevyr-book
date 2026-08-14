import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://synevyr-book.vercel.app"),

  title: {
    default: "Legend of Lake Synevyr",
    template: "%s | Legend of Lake Synevyr",
  },

  description:
    "Enter the world of Legend of Lake Synevyr — a fantasy novel inspired by Ukrainian mythology, ancient spirits, forgotten legends, and the living memory of the Carpathians.",

  keywords: [
    "Legend of Lake Synevyr",
    "Lake Synevyr",
    "Ukrainian fantasy",
    "Ukrainian mythology",
    "Ukrainian folklore",
    "Carpathian folklore",
    "Carpathian mythology",
    "fantasy novel",
    "young adult fantasy",
    "YA fantasy",
    "Synevyr",
    "Mavka",
    "Vodianyk",
  ],

  authors: [
    {
      name: "Viktoriia-Anna Nievienchenko",
    },
  ],

  creator: "Viktoriia-Anna Nievienchenko",
  publisher: "Viktoriia-Anna Nievienchenko",

  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },

  openGraph: {
    type: "website",
    siteName: "Legend of Lake Synevyr",
    title: "Legend of Lake Synevyr",
    description:
      "A fantasy novel inspired by Ukrainian mythology, ancient spirits, forgotten legends, and the living memory of the Carpathians.",
    url: "https://synevyr-book.vercel.app",
    images: [
      {
        url: "/icon.jpg",
        width: 1200,
        height: 630,
        alt: "Legend of Lake Synevyr",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Legend of Lake Synevyr",
    description:
      "A fantasy novel inspired by Ukrainian mythology, ancient spirits, forgotten legends, and the living memory of the Carpathians.",
    images: ["/icon.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}