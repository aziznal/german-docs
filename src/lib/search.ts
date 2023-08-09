import * as fs from "fs/promises";
import path from "path";

export type SearchResult = {
  pageName: string;
  headings: {
    title: string;
    matchingParagraph: string;
    href: string;
  }[];
};

const MARKDOWN_SEARCH_INDEX_FOLDER_PATH = path.join(
  process.cwd(),
  "search-index",
);

const MARKDOWN_SEARCH_INDEX_FILE_PATH = `${MARKDOWN_SEARCH_INDEX_FOLDER_PATH}/markdown-index.json`;

export async function search({
  query,
}: {
  query: string;
}): Promise<SearchResult[] | null> {
  // 1. read build index
  const searchIndex = JSON.parse(
    (await fs.readFile(MARKDOWN_SEARCH_INDEX_FILE_PATH)).toString(),
  ) as typeof import("../../search-index/markdown-index.json");

  // 2. find all headings that match the query or contain a paragraph that matches the query
  const matches = searchIndex
    .filter((page) => {
      const pageMatches = fuzzify(page.pageName).includes(fuzzify(query));

      const headingsMatches = page.headings.some((heading) => {
        const headingMatches = fuzzify(heading.title).includes(fuzzify(query));

        const paragraphMatches = heading.paragraphs.some((paragraph) =>
          fuzzify(paragraph).includes(fuzzify(query)),
        );

        return headingMatches || paragraphMatches;
      });

      return pageMatches || headingsMatches;
    })
    .slice(0, 10)
    .map((match) => {
      return {
        pageName: match.pageName,
        headings: match.headings.map((heading) => {
          return {
            title: heading.title,
            matchingParagraph:
              heading.paragraphs.find((paragraph) =>
                paragraph.includes(fuzzify(query)),
              ) ?? "",
            href: heading.href,
          };
        }),
      };
    });

  // 3. return the results
  return matches.length > 0 ? matches : null;
}

function fuzzify(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}
