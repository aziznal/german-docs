import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { SearchProvider } from "@/providers/search-provider";

import { Analytics } from "@vercel/analytics/react";
import { buildSearchIndex } from "@/lib/build-search-index";

export const metadata: Metadata = {
  title: "German Docs",
  description: "The German language, explained in programmer's English.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  process.env.NODE_ENV === "development" && buildSearchIndex();

  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className={`h-full font-sans`}>
        <ThemeProvider>
          <SearchProvider>{children}</SearchProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
