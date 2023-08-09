import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { SearchProvider } from "@/providers/search-provider";

export const metadata: Metadata = {
  title: "German Docs",
  description: "The German language, explained in programmer's English.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html
        lang="en"
        className="h-full"
      >
        <body className={`h-full font-sans`}>
          <SearchProvider>{children}</SearchProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
