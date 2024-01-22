import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SearchProvider } from "@/providers/search-provider";
import { Analytics } from "@vercel/analytics/react";
import { THEME_COOKIE_KEY } from "@/constants";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import LinksProvider from "@/providers/links-provider";

export const metadata: Metadata = {
  title: "German Docs",
  description: "The German language, explained in programmer's English.",
  openGraph: {
    title: "German Docs",
    description: "The German language, explained in programmer's English.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://german-docs.aziznal.com/german-docs-banner.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "German Docs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "German Docs",
    description: "The German language, explained in programmer's English.",
    images: [
      {
        url: "https://german-docs.aziznal.com/german-docs-banner.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "German Docs",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeCookie = cookies().get(THEME_COOKIE_KEY)?.value;

  return (
    <html
      lang="en"
      className={cn("h-full", themeCookie === "dark" && "dark")}
    >
      <body className={`h-full font-sans`}>
        <ThemeProvider initialTheme={themeCookie}>
          <SearchProvider>
            <LinksProvider>{children}</LinksProvider>
          </SearchProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
