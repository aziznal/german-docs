import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { build } from "@/lib/search";

export const metadata: Metadata = {
  title: "German Docs",
  description: "The German language, explained in programmer's English.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  build();

  return (
    <ThemeProvider>
      <html
        lang="en"
        className="h-full"
      >
        <body className={`h-full font-sans`}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
