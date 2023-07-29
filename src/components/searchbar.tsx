"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {};

function isMac(): boolean {
  return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

    // Listen to Cmd+K or Ctrl+K to open the search overlay
    useEffect(() => {
      const openSearchOverlay = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          setIsSearchOverlayOpen(true);
        }
      };

      document.addEventListener("keydown", openSearchOverlay);

      return () => {
        document.removeEventListener("keydown", openSearchOverlay);
      };
    }, []);

    return (
      <>
        <div className="relative flex items-center">
          <input
            {...props}
            ref={ref}
            placeholder="Search the docs..."
            onClick={() => setIsSearchOverlayOpen(true)}
            className={cn(
              "cursor-pointer rounded bg-neutral-800 px-4 py-2 pr-2 text-muted-foreground transition-colors duration-200 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-none",
              className,
            )}
          />

          <span className="absolute right-0 hidden items-center gap-1 pr-3 font-mono text-sm text-muted-foreground lg:flex">
            {isMac() ? (
              <span className="text-lg">⌘</span>
            ) : (
              <span className="text-lg">C</span>
            )}

            <span>K</span>
          </span>
        </div>

        <Dialog
          open={isSearchOverlayOpen}
          onOpenChange={setIsSearchOverlayOpen}
        >
          <DialogContent className="absolute top-52 border-neutral-300 bg-neutral-700">
            Hello World!
          </DialogContent>
        </Dialog>
      </>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
