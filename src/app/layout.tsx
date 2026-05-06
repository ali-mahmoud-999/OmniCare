import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import { Providers } from "@/components/Providers";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "OmniCare | Premium Healthcare & Lifestyle Services in Egypt",
  description: "Elite nursing, nannies, and luxury housekeeping services across Egypt.",
  openGraph: {
    title: "OmniCare | Premium Healthcare & Lifestyle Services in Egypt",
    description: "Elite nursing, nannies, and luxury housekeeping services across Egypt.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}>
      <body className="bg-gray-50 text-navy transition-all duration-300">
        <LanguageProvider>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
