"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useLeftSidebarState } from "@/providers/left-sidebar-provider";

type LeftSidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const LeftSidebar = forwardRef<HTMLDivElement, LeftSidebarProps>(
  ({ className, children, ...props }, ref) => {
    const { isLeftSidebarOpen: isOpen } = useLeftSidebarState();

    return (
      <div
        {...props}
        ref={ref}
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
