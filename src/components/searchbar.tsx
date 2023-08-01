"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetPlatform } from "@/hooks/platform";

export type SearchBarProps = HTMLAttributes<HTMLDivElement> & {};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    const { isMacos } = useGetPlatform();
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

    // Listen to Cmd+K or Ctrl+K to open the search overlay
    useEffect(() => {
      const openSearchOverlay = (e: KeyboardEvent) => {
        // Cmd+K for macOS
        if (isMacos && e.key === "k" && e.metaKey) {
          e.preventDefault();
          setIsSearchOverlayOpen(true);
          return;
        }

        // Ctrl+K for Windows/Linux
        if (e.key === "k" && e.ctrlKey) {
          e.preventDefault();
          setIsSearchOverlayOpen(true);
        }
      };

      document.addEventListener("keydown", openSearchOverlay);

      return () => {
        document.removeEventListener("keydown", openSearchOverlay);
      };
    }, [isMacos]);

    return (
      <>
        <div
          className={cn("relative flex items-center", className)}
          onClick={() => setIsSearchOverlayOpen(true)}
        >
          <div
            {...props}
            ref={ref}
            className="grow cursor-pointer rounded bg-neutral-800 px-4 py-2 text-muted-foreground transition-colors duration-200 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none"
          >
            Quick search...
          </div>

          <div className="pointer-events-none absolute right-0 hidden cursor-pointer items-center gap-2 pr-3 font-mono text-sm text-muted-foreground lg:flex">
            {isMacos ? (
              <span className="mb-[2px] text-lg">⌘</span>
            ) : (
              <span>Ctrl</span>
            )}

            <span>K</span>
          </div>
        </div>

        <Dialog
          open={isSearchOverlayOpen}
          onOpenChange={setIsSearchOverlayOpen}
        >
          <DialogContent className="fixed top-52 border-neutral-300 dark:bg-neutral-700">
            Hello World!
          </DialogContent>
        </Dialog>
      </>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
