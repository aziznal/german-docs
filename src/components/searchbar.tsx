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
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CornerDownLeft,
  Hash,
  SearchIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { SearchResult, useSearchContext } from "@/providers/search-provider";
import { useRouter } from "next/navigation";

import * as DialogPrimitive from "@radix-ui/react-dialog";

export type SearchBarProps = HTMLAttributes<HTMLDivElement> & {};

function createSearchResultKey(result: SearchResult["headings"][0]): string {
  return result.title + result.matchingParagraph;
}

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

        if (!results) return setSearchResults([]);

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
      if (!searchResults) setFlattenedSearchResults([]);

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

      const key = createSearchResultKey(flattenedSearchResults[0]);

      setFocusedResultKey(key);
    }, [searchResults, focusedResultKey, flattenedSearchResults]);

    // Listen to arrow keys to navigate through search results
    useEffect(() => {
      if (!flattenedSearchResults || flattenedSearchResults.length === 0)
        return;

      const findCurrentFocusedIndex = (): number => {
        return flattenedSearchResults.findIndex(
          (result) => createSearchResultKey(result) === focusedResultKey,
        );
      };

      const focus = (searchResult: SearchResult["headings"][0]) => {
        const key = createSearchResultKey(searchResult);

        setFocusedResultKey(key);

        // make sure the result is in the viewport
        const element = document.getElementById(key);

        if (!element) return;

        element.scrollIntoView({
          block: "end", // makes sure the element requiring scrolling is at the bottom of the viewport
        });
      };

      const moveFocusDown = () => {
        const currentFocusedIndex = findCurrentFocusedIndex();

        // wrap around to the top if we're at the bottom
        if (currentFocusedIndex === flattenedSearchResults.length - 1) {
          focus(flattenedSearchResults[0]);
          return;
        }

        focus(flattenedSearchResults[currentFocusedIndex + 1]);
      };

      const moveFocusUp = () => {
        const currentFocusedIndex = findCurrentFocusedIndex();

        // wrap around to the bottom if we're at the top
        if (currentFocusedIndex === 0) {
          focus(flattenedSearchResults[flattenedSearchResults.length - 1]);
          return;
        }

        focus(flattenedSearchResults[currentFocusedIndex - 1]);
      };

      const navigateToFocusedResult = () => {
        const currentFocusedIndex = findCurrentFocusedIndex();

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
            className="grow cursor-pointer rounded bg-neutral-800 px-4 py-2 text-muted-foreground transition-colors duration-200 ease-in-out hover:bg-neutral-700 focus:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.stopPropagation();
                event.preventDefault();
                setIsSearchOverlayOpen(true);
              }
            }}
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
          <DialogContent
            className={`
              fixed
              top-0
              border-neutral-300
              pb-6

              dark:border-neutral-700
              dark:bg-neutral-800

              md:top-[10%]
              md:max-w-[800px]

              lg:pb-0

              [&>*]:mx-6
            `}
          >
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
                className="rounded-0 h-16 border-0 bg-transparent text-lg outline-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-xl"
              />
            </div>

            {/* Search results */}
            <div className="!mr-0 mt-4 flex max-h-[70dvh] min-h-[100px] flex-col gap-6 overflow-y-auto pr-6 lg:max-h-[50vh]">
              {!searchResults ||
                (searchResults.length === 0 && (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    No recent searches
                  </div>
                ))}

              {searchResults.map((searchResult) => {
                return (
                  <div
                    className="flex min-h-fit flex-col gap-3"
                    key={searchResult.pageName}
                  >
                    <div className="text-lg font-bold">
                      {searchResult.pageName}
                    </div>

                    {searchResult.headings.map((heading) => {
                      return (
                        <Link
                          onClick={() => setIsSearchOverlayOpen(false)}
                          id={createSearchResultKey(heading)}
                          key={createSearchResultKey(heading)}
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
                                hover:text-white
                                hover:outline-0
                                focus:bg-rose-500
                                focus:text-white
                                focus:outline-0

                                dark:bg-neutral-700
                                dark:hover:bg-rose-500
                                dark:hover:outline-0
                                dark:focus:bg-rose-500
                                dark:focus:outline-0
                          `,
                            createSearchResultKey(heading) ===
                              focusedResultKey &&
                              "bg-rose-500 text-white dark:bg-rose-500 dark:text-white",
                          )}
                        >
                          <div className="flex flex-col">
                            <div className="flex gap-2">
                              <Hash /> <span>{heading.title}</span>
                            </div>

                            {heading.matchingParagraph && (
                              <div className="flex dark:text-neutral-100">
                                {heading.matchingParagraph}
                              </div>
                            )}
                          </div>

                          <ArrowRight />
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <DialogPrimitive.Close className="absolute right-0 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>

            <div className="!mx-0 hidden items-center gap-8 border-t border-t-neutral-300 p-4 text-xs text-neutral-900 dark:border-t-neutral-700 dark:text-neutral-700 lg:flex">
              <div className="flex items-center gap-2">
                <kbd className="rounded bg-neutral-200 p-1.5 font-bold shadow-md shadow-neutral-400 dark:bg-neutral-400 dark:shadow-black">
                  Esc
                </kbd>
                <span className="text-muted-foreground">to close</span>
              </div>

              <div className="flex items-center gap-2">
                <kbd className="flex items-center rounded bg-neutral-200 p-1.5 font-bold shadow-md shadow-neutral-400 dark:bg-neutral-400 dark:shadow-black">
                  <span>Enter</span>
                  <CornerDownLeft size={10} />
                </kbd>
                <span className="text-muted-foreground">to select</span>
              </div>

              <div className="flex items-center gap-2">
                <kbd className="flex items-center rounded bg-neutral-200 p-1.5 shadow-md shadow-neutral-400 dark:bg-neutral-400 dark:shadow-black">
                  <ArrowUp
                    size={10}
                    className="fill-black"
                  />
                </kbd>

                <kbd className="flex items-center rounded bg-neutral-200 p-1.5 shadow-md shadow-neutral-400 dark:bg-neutral-400 dark:shadow-black">
                  <ArrowDown
                    size={10}
                    className="fill-black"
                  />
                </kbd>

                <span className="text-muted-foreground">to navigate</span>
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
