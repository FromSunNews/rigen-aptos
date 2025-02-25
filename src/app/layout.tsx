import { DM_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/shared/ui/toaster";
import { Providers } from "@/providers";
import { Metadata, Viewport } from "next";
import { VideoBackground } from "@/components/shared/custom/video-background";

// Add Inter font configuration
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

// Or use Outfit for more modern look
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

// Google Font
const mono_dm = DM_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Rigen - Leverage Yield Farming on Aptos",
  description: "Using Leverage Yield Farming on Aptos",
  keywords: ["Aptos", "DeFi", "Yield Farming", "Leverage", "Crypto"],
  authors: [{ name: "Rigen Team" }],

  // OpenGraph metadata
  openGraph: {
    title: "Rigen - Leverage Yield Farming on Aptos",
    description: "Using Leverage Yield Farming on Aptos",
    url: "https://rigen-dex.vercel.app/",
    siteName: "Rigen - Leverage Yield Farming on Aptos",
    images: [
      {
        url: "/seo/og-image.png", //URL to image preview
        width: 1200,
        height: 630,
        alt: "Rigen Finance Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Rigen - Leverage Yield Farming on Aptos",
    description: "Using Leverage Yield Farming on Aptos",
    images: ["/seo/twitter-image.png"], // Url to image preview Twitter
    creator: "@Rigen",
  },

  // Canonical URL
  alternates: {
    canonical: "https://rigen-dex.vercel.app/",
  },

  // Favicon and icons
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },

  // Manifest for PWA
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mono_dm.variable} ${outfit.variable} fcol relative min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <VideoBackground isBlur={true} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Providers>
            <main className="flex-grow">{children}</main>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
