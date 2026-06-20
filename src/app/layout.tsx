import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Dicto | Conversational AI Discovery & Recommendations",
  description: "Get the right AI tool in under 60 seconds. Stop browsing and start describing what you need. AI-Dicto recommends suitable tools through natural speech and chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col antialiased bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
