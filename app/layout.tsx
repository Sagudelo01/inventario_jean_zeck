import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://sagudelo01.github.io/inventario_jean_zeck/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jean Zeck Inventory",
  description: "Clothing inventory management: stock, movements and metrics.",
  openGraph: {
    title: "Jean Zeck Inventory",
    description: "A clothing inventory dashboard with stock movements, metrics and CSV export.",
    url: siteUrl,
    type: "website",
    images: [{ url: "og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jean Zeck Inventory",
    description: "A clothing inventory dashboard with stock movements, metrics and CSV export.",
    images: ["og-image.png"],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('jeanzeck:theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-bg font-sans text-fg">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
