"use client";

import { SearchIndex, SearchResult, search } from "@/lib/search";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const searchContext = createContext<{
  search: (query: string) => Promise<SearchResult[] | null>;
}>({
  search: async () => [],
});

export const useSearchContext = () => useContext(searchContext);

export function SearchProvider({ children }: PropsWithChildren) {
  const [searchIndex, setSearchIndex] = useState<SearchIndex>();

  // load search index with an async request
  useEffect(() => {
    fetch("/api/search-index", { method: "GET" }).then(async (response) => {
      setSearchIndex(await response.json());
    });
  }, []);

  return (
    <searchContext.Provider
      value={{
        search: async (query: string) => {
          if (!searchIndex) return null;

          return search({
            query,
            searchIndex: searchIndex,
          });
        },
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
