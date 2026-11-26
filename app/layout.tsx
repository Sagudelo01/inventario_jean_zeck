import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg">
          Skip to content
        </a>
        <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold text-accent-fg">JZ</span>
            <span className="font-semibold">Jean Zeck</span>
            <span className="ml-auto">
              <ThemeToggle />
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
