import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SearchProvider } from "@/providers/search-provider";
import { Analytics } from "@vercel/analytics/react";
import { THEME_COOKIE_KEY } from "@/constants";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "German Docs",
  description: "The German language, explained in programmer's English.",
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
          <SearchProvider>{children}</SearchProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
