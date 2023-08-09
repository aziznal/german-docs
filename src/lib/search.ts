export type SearchResult = {
  pageName: string;
  headings: {
    title: string;
    matchingParagraph: string;
    href: string;
  }[];
};

export function search({ query }: { query: string }): SearchResult[] {
  // 1. read all json files in the build folder
  // 2. find all headings that match the query or contain a paragraph that matches the query
  // 3. return the results

  throw new Error("Not implemented");
}
