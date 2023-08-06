import path from "path";

import { rm, mkdir } from "fs/promises";

import { unified } from "unified";
import remarkParse from "remark-parse";
import { getMarkdownContent, getMarkdownListings } from "./markdown.utils";
import { generateHtmlId } from "./utils";
import { toString as getTextContent } from "mdast-util-to-string";

export type BuildResult = {
  pageName: string;
  headings: {
    title: string;
    paragraphs: string[];
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

export async function build(): Promise<void> {
  // remove prev. build and create new folder
  await rm(BUILT_MARKDOWN_FOLDER_PATH, { recursive: true, force: true });
  await mkdir(BUILT_MARKDOWN_FOLDER_PATH);

  // load all markdown files
  const markdownFiles = (await getMarkdownListings()).reduce((acc, next) => {
    return {
      ...acc,
      files: [...(acc.files || []), ...(next.files || [])],
    };
  }).files;

  if (!markdownFiles)
    throw new Error("No markdown files found while building search db!");

  // parse everything into searchable format
  const parsedMarkdown: BuildResult[] = await Promise.all(
    markdownFiles.map(async (file) => {
      const markdownContent = await getMarkdownContent(file.href);

      if (!markdownContent)
        throw new Error(
          `Error while reading markdown content during building search db. Reading content from file ${file.href} returned null.`,
        );

      const parsed = parseToMatchableBlock({
        markdown: markdownContent,
        parentHref: file.href,
      });

      return {
        pageName: file.name,
        headings: parsed,
      };
    }),
  );

  // save as json
}

function parseToMatchableBlock({
  markdown,
  parentHref,
}: {
  markdown: string;
  parentHref: string;
}): BuildResult["headings"] {
  const tree = unified().use(remarkParse).parse(markdown);

  let headings = [] as BuildResult["headings"];
  let currentHeading: BuildResult["headings"][0] | null = null;

  tree.children.forEach((child, i) => {
    // 1. if child is heading, push currentHeading (if it has content) and create new heading
    if (child.type === "heading") {
      if (currentHeading) headings.push(currentHeading);

      const headingText = getTextContent(child);

      currentHeading = {
        title: headingText,
        paragraphs: [] as string[],
        href: `${parentHref}#${generateHtmlId(headingText)}`,
      };
    }

    // 2. If next child is not heading, store it under current heading
    if (child.type === "paragraph") {
      const paragraphText = getTextContent(child);
      currentHeading?.paragraphs.push(paragraphText);
    }

    // push last currentHeading only if it has matching paragraphs
    if (i === tree.children.length - 1 && currentHeading) {
      headings.push(currentHeading);
    }
  });

  console.log(headings);

  return headings;
}

export function search({ query }: { query: string }): SearchResult[] {
  // 1. read all json files in the build folder
  // 2. find all headings that match the query or contain a paragraph that matches the query
  // 3. return the results

  throw new Error("Not implemented");
}
