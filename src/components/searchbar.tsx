"use client";

import { cn } from "@/lib/utils";
import {
  ChangeEvent,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetPlatform } from "@/hooks/platform";
import { Input } from "@/components/ui/input";
import { ArrowRight, Hash, SearchIcon } from "lucide-react";
import Link from "next/link";
import { type SearchResult } from "@/lib/search";
import { useSearchContext } from "@/providers/search-provider";
import { useRouter } from "next/navigation";

export type SearchBarProps = HTMLAttributes<HTMLDivElement> & {};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    const { isMacos } = useGetPlatform();
    const { search: performFuzzySearch } = useSearchContext();

    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

    const [searchResults, setSearchResults] = useState([] as SearchResult[]);
    const [flattenedSearchResults, setFlattenedSearchResults] =
      useState<SearchResult["headings"]>();

    const [searchInput, setSearchInput] = useState("");

    const [focusedResultKey, setFocusedResultKey] = useState("");

    const router = useRouter();

    const handleSearch = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        setSearchInput(inputValue);

        if (!inputValue) {
          setSearchResults([]);
          return;
        }

        const results = await performFuzzySearch(inputValue);

        if (!results) return;

        setSearchResults(results);
      },
      [performFuzzySearch],
    );

    // Reset input and search results when the search overlay is closed
    useEffect(() => {
      if (!isSearchOverlayOpen) {
        setSearchInput("");
        setSearchResults([]);
        setFlattenedSearchResults([]);
        setFocusedResultKey("");
      }
    }, [isSearchOverlayOpen]);

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

    // Create flattened search results for easier focus navigation
    useEffect(() => {
      if (!searchResults) return;

      const flattenedResults = searchResults.reduce(
        (acc, curr) => [...acc, ...curr.headings],
        [] as SearchResult["headings"],
      );

      // clear focused key when results change
      setFocusedResultKey("");

      setFlattenedSearchResults(flattenedResults);
    }, [searchResults]);

    // set first result as focused if none is focused
    useEffect(() => {
      if (
        focusedResultKey !== "" ||
        !flattenedSearchResults ||
        flattenedSearchResults.length === 0
      )
        return;

      const key =
        flattenedSearchResults[0].title +
        flattenedSearchResults[0].matchingParagraph;

      setFocusedResultKey(key);
    }, [searchResults, focusedResultKey, flattenedSearchResults]);

    // Listen to arrow keys to navigate through search results
    useEffect(() => {
      if (!flattenedSearchResults || flattenedSearchResults.length === 0)
        return;

      const findCurrentFocusedIndex = (): number => {
        const index = flattenedSearchResults.findIndex(
          (result) =>
            result.title + result.matchingParagraph === focusedResultKey,
        );

        if (index === -1) return 0;

        return index;
      };

      const focus = (searchResult?: SearchResult["headings"][0]) => {
        if (!searchResult) return;

        const key = searchResult.title + searchResult.matchingParagraph;

        setFocusedResultKey(key);

        // make sure the result is in the viewport
        const element = document.getElementById(key);

        if (!element) return;

        element.scrollIntoView({
          block: "end",
        });
      };

      const moveFocusDown = () => {
        const currentFocusedIndex = findCurrentFocusedIndex();

        if (currentFocusedIndex === -1) return;

        const newFocusElement = flattenedSearchResults[currentFocusedIndex + 1];

        // wrap around to the top if we're at the bottom
        if (currentFocusedIndex === flattenedSearchResults.length - 1) {
          focus(flattenedSearchResults[0]);
          return;
        }

        focus(newFocusElement);
      };

      const moveFocusUp = () => {
        const currentFocusedIndex = findCurrentFocusedIndex();

        if (currentFocusedIndex === -1) return;

        // wrap around to the bottom if we're at the top
        if (currentFocusedIndex === 0) {
          focus(flattenedSearchResults[flattenedSearchResults.length - 1]);
          return;
        }

        focus(flattenedSearchResults[currentFocusedIndex - 1]);
      };

      const navigateToFocusedResult = () => {
        const currentFocusedIndex = findCurrentFocusedIndex();

        if (currentFocusedIndex === -1) return;

        const currentFocusedResult =
          flattenedSearchResults[currentFocusedIndex];

        if (!currentFocusedResult) return;

        router.push(currentFocusedResult.href);

        setIsSearchOverlayOpen(false);
      };

      const handleInteractionWithResult = (e: KeyboardEvent) => {
        if (!isSearchOverlayOpen) return;

        if (e.key === "ArrowDown") {
          moveFocusDown();
        }

        if (e.key === "ArrowUp") {
          moveFocusUp();
        }

        if (e.key === "Enter") {
          navigateToFocusedResult();
        }
      };

      document.addEventListener("keydown", handleInteractionWithResult);

      return () => {
        document.removeEventListener("keydown", handleInteractionWithResult);
      };
    }, [
      isSearchOverlayOpen,
      setFocusedResultKey,
      focusedResultKey,
      flattenedSearchResults,
      router,
    ]);

    return (
      <>
        <div
          className={cn("relative flex items-center", className)}
          onClick={() => {
            setIsSearchOverlayOpen(true);
            setSearchInput("");
          }}
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
          onOpenChange={(state) => {
            setIsSearchOverlayOpen(state);
            setSearchInput("");
          }}
        >
          <DialogContent className="fixed top-48 border-neutral-300 p-0 pb-6 dark:border-neutral-700 dark:bg-neutral-800 md:max-w-[700px] lg:absolute lg:top-[40%] [&>*]:mx-6">
            {/* Search input */}
            <div className="mt-12 flex items-center rounded border border-neutral-700 px-4 focus-within:border-rose-500">
              <SearchIcon />

              <Input
                value={searchInput}
                onChange={handleSearch}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                    return;
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                    return;
                  }
                }}
                placeholder="Search for anything..."
                className="rounded-0 h-16 border-0 bg-transparent outline-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Search results */}
            <div className="flex max-h-[70dvh] min-h-[200px] flex-col gap-6 overflow-y-auto lg:max-h-[50vh]">
              {searchResults.map((searchResult) => {
                return (
                  <div
                    className="space-y-3"
                    key={searchResult.pageName}
                  >
                    <div className="text-lg font-bold">
                      {searchResult.pageName}
                    </div>

                    {searchResult.headings.map((heading) => {
                      return (
                        <Link
                          onClick={() => setIsSearchOverlayOpen(false)}
                          id={heading.title + heading.matchingParagraph}
                          key={heading.title + heading.matchingParagraph}
                          href={heading.href}
                          className={cn(
                            `
                                flex
                                cursor-pointer
                                items-center
                                justify-between
                                rounded
                                bg-neutral-200
                                p-3
                                transition
                                duration-75

                                hover:bg-rose-500
                                focus:bg-rose-500
                                focus:text-white
                                focus:outline-0

                                dark:bg-neutral-700
                                dark:hover:bg-rose-500
                                dark:focus:bg-rose-500
                                dark:focus:outline-0
                          `,
                            heading.title + heading.matchingParagraph ===
                              focusedResultKey &&
                              "bg-rose-500 text-white dark:bg-rose-500 dark:text-white",
                          )}
                        >
                          <div className="flex gap-2">
                            <Hash /> <span>{heading.title}</span>
                          </div>

                          <ArrowRight />
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
