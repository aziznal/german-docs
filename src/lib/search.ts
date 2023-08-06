import path from "path";

export type BuildResult = {
  pageName: string;
  headings: {
    title: string;
    matchingParagraph: string;
    href: string;
  }[];
};

export type SearchResult = {
  pageName: string;
  headings: {
    title: string;
    matchingParagraph: string;
    href: string;
  }[];
};

const MARKDOWN_FOLDER_PATH = path.join(process.cwd(), "markdown");

const BUILT_MARKDOWN_FOLDER_PATH = path.join(process.cwd(), "built-markdown");

export async function build(): Promise<BuildResult[]> {
  // 1. delete previous build folder if it exists
  // 2. create new build folder
  // 3. read all markdown files
  // 4. for each markdown file, parse it into an AST
  // 5. convert the AST into json and write it to the build folder

  throw new Error("Not implemented");
}

export function search({ query }: { query: string }): SearchResult[] {
  // 1. read all json files in the build folder
  // 2. find all headings that match the query or contain a paragraph that matches the query
  // 3. return the results

  throw new Error("Not implemented");
}
