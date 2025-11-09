import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/core/providers/Providers";
import { Toaster } from "@/core/presentation/components/ui/sonner";
import LayoutWrapper from "@/core/presentation/layouts/LayoutWrapper";
import schoolConfig from "@/config";

const generalSans = localFont({
  src: [
    {
      path: "../core/presentation/assets/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../core/presentation/assets/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../core/presentation/assets/fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: schoolConfig.metadata.title,
  description: schoolConfig.metadata.description,
  keywords: schoolConfig.metadata.keywords,
  metadataBase: schoolConfig.metadata.baseUrl
    ? new URL(schoolConfig.metadata.baseUrl)
    : undefined,
  openGraph: schoolConfig.metadata.openGraph,
  twitter: schoolConfig.metadata.twitter,
  icons: schoolConfig.metadata.icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${generalSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
