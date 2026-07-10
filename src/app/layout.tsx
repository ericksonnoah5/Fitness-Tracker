import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Noah and Katie's",
  description: "",
  icons: {
    icon: "/raspberrypi/favicon/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        ibmPlexSans.variable,
        playfairDisplay.variable,
      )}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
