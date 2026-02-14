import type { Metadata } from "next";
import { Inter, Sora, Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Campus Connect – Induction Intelligence Engine",
  description:
    "One platform for every campus opportunity. Simplifying club inductions with intelligence and design.",
  openGraph: {
    title: "Campus Connect – Induction Intelligence Engine",
    description:
      "One platform for every campus opportunity. Simplifying club inductions with intelligence and design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${spaceGrotesk.variable} ${orbitron.variable} font-sans antialiased noise`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
