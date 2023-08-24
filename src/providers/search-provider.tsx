"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Fuse from "fuse.js";

export type SearchResult = {
  pageName: string;
  headings: {
    title: string;
    matchingParagraph: string;
    href: string;
  }[];
};

export type SearchIndex =
  typeof import("../../search-index/markdown-index.json");

const searchContext = createContext<{
  search: (query: string) => Promise<SearchResult[] | null>;
}>({
  search: async () => [],
});

export const useSearchContext = () => useContext(searchContext);

export function SearchProvider({ children }: PropsWithChildren) {
  const [searchIndex, setSearchIndex] = useState<SearchIndex>();
  const [fuseInstance, setFuseInstance] = useState<Fuse<SearchIndex[0]>>();

  // load search index with an async request
  useEffect(() => {
    fetch("/api/search-index", { method: "GET" }).then(async (response) => {
      setSearchIndex(await response.json());
    });
  }, []);

  useEffect(() => {
    if (!searchIndex) return;

    setFuseInstance(
      new Fuse(searchIndex, {
        keys: ["pageName", "headings.title", "headings.paragraphs"],
        includeScore: true,
        threshold: 0.3,
      }),
    );
  }, [searchIndex]);

  return (
    <searchContext.Provider
      value={{
        search: async (query: string) => {
          if (!searchIndex || !fuseInstance) return null;

          const matches = fuseInstance.search(query);

          return matches.map((match) => {
            return {
              pageName: match.item.pageName,
              headings: match.item.headings.map((heading) => {
                const matchingParagraph = heading.paragraphs.find((paragraph) =>
                  paragraph.toLowerCase().includes(query.toLowerCase()),
                );

                return {
                  title: heading.title,
                  matchingParagraph: matchingParagraph || "",
                  href: heading.href,
                };
              }),
            };
          });
        },
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
