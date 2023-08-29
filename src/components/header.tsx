"use client";

import { LucideGithub, Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useLeftSidebarState } from "@/providers/left-sidebar-provider";
import { useThemeContext } from "@/providers/theme-provider";
import { Switch } from "@/components/ui/switch";

import SearchBar from "./searchbar";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {};

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className, ...props }, ref) => {
    const { isLeftSidebarOpen, toggleSidebar } = useLeftSidebarState();

    const { setTheme, currentTheme } = useThemeContext();

    return (
      <header
        {...props}
        ref={ref}
        className={cn(
          `sticky top-0 flex shrink-0 basis-[var(--header-height)] items-center bg-neutral-900 pr-6 text-white dark:bg-neutral-950 sm:gap-7`,
          className,
        )}
      >
        {/* Header toggle */}
        <div
          className={cn(
            `flex h-full w-[80px] cursor-pointer items-center justify-center px-6 transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-700`,
            isLeftSidebarOpen && "lg:w-[var(--left-sidebar-width)]",
          )}
          onClick={toggleSidebar}
          id="header-sidebar-toggle"
        >
          <Menu
            onClick={(event) => {
              event.stopPropagation();
              toggleSidebar();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.stopPropagation();
                toggleSidebar();
              }
            }}
            size={32}
            id="header-sidebar-toggle"
            tabIndex={0}
          />
        </div>

        {/* Logo & Search */}
        <div className="flex grow items-center justify-center gap-4">
          <Image
            src="/germany-flag.png"
            className="hidden rounded border border-neutral-600 sm:block"
            width={50}
            height={70}
            alt="German flag"
          />

          <SearchBar
            className="grow sm:w-[300px] sm:grow-0"
            tabIndex={0}
          />
        </div>

        {/* Github link */}
        <div className="hidden lg:block">
          <a
            href="https://github.com/aziznal/german-docs"
            target="_blank"
          >
            <LucideGithub />
          </a>
        </div>

        {/* Theme switcher */}
        <div className="ml-4 flex items-center justify-center gap-2 sm:ml-0">
          <Sun />

          <Switch
            id="airplane-mode"
            checked={currentTheme === "dark"}
            className={cn(
              currentTheme === "dark" ? "!bg-blue-900" : "!bg-orange-400",
            )}
            onCheckedChange={(isDark) => {
              isDark ? setTheme("dark") : setTheme("light");
            }}
          />

          <Moon />
        </div>
      </header>
    );
  },
);

Header.displayName = "Header";

export default Header;
