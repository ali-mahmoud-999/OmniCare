export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import { Providers } from "@/components/Providers";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";
import Script from "next/script";

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
      <head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1602442077533235&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="bg-gray-50 text-navy transition-all duration-300">
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1602442077533235');
            fbq('track', 'PageView');
          `}
        </Script>
        <LanguageProvider>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
