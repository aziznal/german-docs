"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLeftSidebarState } from "@/providers/left-sidebar-provider";
import { useTailwindBreakpoints } from "@/hooks/breakpoints";

type LeftSidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const LeftSidebar = forwardRef<HTMLDivElement, LeftSidebarProps>(
  ({ className, children, ...props }, _ref) => {
    const { isLeftSidebarOpen: isOpen, closeSidebar } = useLeftSidebarState();

    const { isOnSmallScreen } = useTailwindBreakpoints();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const closeOnUnfocus = (event: MouseEvent) => {
        // if header-sidebar-toggle is the id of the button that opens the sidebar
        // then we don't want to close the sidebar when that button is clicked
        if ((event.target as HTMLElement).id === "header-sidebar-toggle")
          return;

        // if the click was inside the sidebar then we don't want to close it
        if (ref.current?.contains(event.target as Node)) return;

        if (isOnSmallScreen && isOpen) {
          closeSidebar();
        }
      };

      window.addEventListener("click", closeOnUnfocus);

      return () => {
        window.removeEventListener("click", closeOnUnfocus);
      };
    }, [isOnSmallScreen, isOpen, closeSidebar]);

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          `fixed top-[length:var(--header-height)] h-[length:var(--left-sidebar-height)] shrink-0 flex-col overflow-y-auto bg-neutral-100 px-6 pb-10 pt-16 transition-all duration-200 lg:sticky lg:flex`,
          isOpen && "w-[length:var(--left-sidebar-width)]",
          !isOpen && "w-0 flex-shrink overflow-x-hidden px-0",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

LeftSidebar.displayName = "LeftSidebar";

export default LeftSidebar;
