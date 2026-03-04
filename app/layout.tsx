import type { Metadata } from "next";
import "./globals.css";
import ScrollUp from "@/components/ScrollUp";
import localFont from "next/font/local";

const cairo = localFont({
  src: "./fonts/Cairo-Bold.woff2",
  variable: "--cairo",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.amrabdo.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amr Abdo | Frontend Developer",
    template: "%s | Amr Abdo",
  },
  description:
    "Amr Abdo is a frontend developer specializing in React, Next.js, and modern UI/UX, building fast, responsive websites and dashboards for brands in Egypt, Turkey, and Saudi Arabia.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Amr Abdo",
    "Amr Abdo portfolio",
    "frontend developer",
    "front-end developer",
    "React developer",
    "Next.js developer",
    "web developer",
    "Saudi Arabia developer",
    "Egypt developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "UI developer",
    "web performance",
    "SEO",
  ],
  openGraph: {
    title: "Amr Abdo | Frontend Developer",
    description:
      "Portfolio of Amr Abdo, a frontend developer crafting fast, responsive web experiences with React, Next.js, and modern tooling.",
    url: "/",
    siteName: "Amr Abdo Portfolio",
    images: [
      {
        url: "/amr.jpg",
        width: 1200,
        height: 630,
        alt: "Amr Abdo - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amr Abdo | Frontend Developer",
    description:
      "Portfolio of Amr Abdo, a frontend developer crafting fast, responsive web experiences with React, Next.js, and modern tooling.",
    images: ["/amr.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={` ${cairo.variable} antialiased`} suppressHydrationWarning>
        <ScrollUp />
        {children}
      </body>
    </html>
  );
}
