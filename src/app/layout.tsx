import "./globals.css";
import type { Metadata } from "next";

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
    <html
      lang="en"
      className="h-full"
    >
      <body className={`h-full font-sans`}>{children}</body>
    </html>
  );
}
