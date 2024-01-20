"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLeftSidebarState } from "@/providers/left-sidebar-provider";
import { useTailwindBreakpoints } from "@/hooks/breakpoints";
import { useGetPlatform } from "@/hooks/platform";

type LeftSidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const LeftSidebar = forwardRef<HTMLDivElement, LeftSidebarProps>(
  ({ className, children, ...props }, _ref) => {
    const {
      isLeftSidebarOpen: isOpen,
      closeSidebar,
      toggleSidebar,
    } = useLeftSidebarState();

    const { isOnSmallScreen } = useTailwindBreakpoints();

    const { isMacos } = useGetPlatform();

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

    // Toggle on Cmd+/ or Ctrl+/
    useEffect(() => {
      const toggleSidebarState = (e: KeyboardEvent) => {
        // Cmd+/ for macOS
        if (isMacos && e.key === "/" && e.metaKey) {
          e.preventDefault();
          toggleSidebar();
          return;
        }

        // Ctrl+/ for Windows/Linux
        if (e.key === "/" && e.ctrlKey) {
          e.preventDefault();
          toggleSidebar();
        }
      };

      document.addEventListener("keydown", toggleSidebarState);

      return () => {
        document.removeEventListener("keydown", toggleSidebarState);
      };
    }, [isMacos, toggleSidebar]);

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          `
            fixed
            top-[var(--header-height)]
            h-[var(--left-sidebar-height)]
            shrink-0
            flex-col
            overflow-y-auto
            bg-neutral-100
            px-6
            pb-10
            pt-16
            transition-all
            duration-200
            dark:bg-neutral-900

            lg:sticky
            lg:flex
          `,
          isOpen && "w-[var(--left-sidebar-width)]",
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
