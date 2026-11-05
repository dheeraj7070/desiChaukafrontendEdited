import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.707032dk.workers.dev"), // apna asli domain
  title: {
    default: "Desi Chauka",
    template: "%s | Desi Chauka",
  },
  description: "माटी की खुशबू, परंपरा का स्वाद",
  openGraph: {
    title: "Desi Chauka",
    description: "माटी की खुशबू, परंपरा का स्वाद",
    url: "/",
    siteName: "Desi Chauka",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Desi Chauka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desi Chauka",
    description: "माटी की खुशबू, परंपरा का स्वाद",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
       
      <body>{children}</body>
    </html>
  );
}
