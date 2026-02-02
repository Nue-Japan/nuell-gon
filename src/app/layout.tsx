import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NUE-JAPAN",
  description: "The Chimera of Data & Logic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSerifJP.variable} antialiased bg-obsidian text-white`}
      >
        {children}
      </body>
    </html>
  );
}
