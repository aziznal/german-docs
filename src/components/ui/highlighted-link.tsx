"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

import clsx from "clsx";

export type HighlightedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A link that highlights when the current path starts with the `href` prop.
 */
export default function HighlightedLink({
  href,
  children,
  className,
}: HighlightedLinkProps) {
  const active = href === usePathname().replace(/\//, "");

  console.log(href, usePathname().replace(/\//, ""), active);

  return (
    <Link
      href={href}
      className={`${cn(
        clsx(active && "font-semibold text-rose-600"),
        "hover:font-semibold hover:text-rose-600",
        className,
      )}`}
      prefetch={true}
    >
      {children}
    </Link>
  );
}
