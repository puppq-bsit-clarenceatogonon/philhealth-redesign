import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PhilHealth — Universal Health Care for Every Filipino",
  description:
    "PhilHealth is the national health insurance program of the Philippines. Verify membership, check contributions, explore benefits, file claims, and access government healthcare services — all in one modern, accessible platform.",
  keywords: [
    "PhilHealth",
    "Philippine Health Insurance",
    "Universal Health Care",
    "Member Portal",
    "Contributions",
    "Benefits",
    "Claims",
    "Government Services",
  ],
  authors: [{ name: "PhilHealth" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "PhilHealth — Universal Health Care for Every Filipino",
    description:
      "Verify membership, check contributions, explore benefits, and access PhilHealth services online.",
    siteName: "PhilHealth",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#009966",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sourceSans.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Toaster />
        <SonnerToaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
