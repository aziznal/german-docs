"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

import clsx from "clsx";
import { useLeftSidebarState } from "@/providers/left-sidebar-provider";
import { useTailwindBreakpoints } from "@/hooks/breakpoints";

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
  const active = href.includes(usePathname());

  const { closeSidebar } = useLeftSidebarState();
  const { isOnSmallScreen } = useTailwindBreakpoints();

  return (
    <Link
      href={href}
      className={`${cn(
        clsx(active && "font-semibold text-rose-600"),
        "hover:font-semibold hover:text-rose-600",
        className,
      )}`}
      prefetch={true}
      onClick={
        isOnSmallScreen
          ? () => {
              closeSidebar();
            }
          : undefined
      }
    >
      {children}
    </Link>
  );
}
