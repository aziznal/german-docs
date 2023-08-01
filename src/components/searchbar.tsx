"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetPlatform } from "@/hooks/platform";
import { Input } from "@/components/ui/input";
import { ArrowRight, Hash, Search } from "lucide-react";

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
            {isMacos ? <span className="text-lg">⌘</span> : <span>Ctrl</span>}

            <span>K</span>
          </div>
        </div>

        <Dialog
          open={isSearchOverlayOpen}
          onOpenChange={setIsSearchOverlayOpen}
        >
          <DialogContent className="border-neutral-300 p-0 pb-6 dark:bg-neutral-700 md:max-w-[700px] [&>*]:mx-6">
            {/* Search input */}
            <div className="mt-12 flex items-center rounded border px-4 focus-within:border-rose-500">
              <Search />

              <Input
                placeholder="Search for anything..."
                className="rounded-0 h-16 border-0 bg-transparent outline-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Search results */}
            <div className="flex max-h-[70dvh] flex-col gap-6 overflow-y-auto lg:max-h-[50vh]">
              <div className="space-y-3">
                <div className="text-lg font-bold">Der Die Das</div>

                <div className="flex cursor-pointer items-center justify-between rounded bg-neutral-200 p-3 transition duration-75 hover:bg-rose-500 dark:bg-neutral-600">
                  <div className="flex gap-2">
                    <Hash /> <span>Nominative (the The in german)</span>
                  </div>

                  <ArrowRight />
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded bg-neutral-200 p-3 transition duration-75 hover:bg-rose-500 dark:bg-neutral-600">
                  <div className="flex gap-2">
                    <Hash /> <span>Nominative (the The in german)</span>
                  </div>

                  <ArrowRight />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
