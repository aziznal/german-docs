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

export async function search({
  query,
  searchIndex,
}: {
  query: string;
  searchIndex: SearchIndex;
}): Promise<SearchResult[] | null> {
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
        headings: match.headings
          .filter((heading) => {
            return (
              fuzzify(heading.title).includes(fuzzify(query)) ||
              heading.paragraphs.some((paragraph) =>
                fuzzify(paragraph).includes(fuzzify(query)),
              )
            );
          })
          .map((heading) => {
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
