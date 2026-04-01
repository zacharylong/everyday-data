import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Everyday Data — Practical conversations about Data & AI",
    template: "%s | Everyday Data",
  },
  description:
    "A podcast about data, AI, and how teams make them useful. Hosted by Patricia and Zac — NYU Stern MS in Business Analytics & AI alumni.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://everydaydata.show"
  ),
  openGraph: {
    type: "website",
    siteName: "Everyday Data",
    title: "Everyday Data — Practical conversations about Data & AI",
    description:
      "Practical conversations about Data, AI, and how teams make them useful. No hype. Real use cases.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everyday Data",
    description:
      "Practical conversations about Data, AI, and how teams make them useful.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-midnight text-text-primary antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
