"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

import clsx from "clsx";
import { useLeftSidebarState } from "@/providers/left-sidebar-provider";
import { useTailwindBreakpoints } from "@/hooks/breakpoints";
import { useEffect, useState } from "react";

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
  const pathName = usePathname();

  const [active, setActive] = useState(false);

  const { closeSidebar } = useLeftSidebarState();
  const { isOnSmallScreen } = useTailwindBreakpoints();

  useEffect(() => {
    if (!pathName) return;

    if (href.includes(pathName)) {
      setActive(true);
    }

    return () => {
      setActive(false);
    };
  }, [pathName, href]);

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
