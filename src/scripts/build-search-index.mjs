import path from "path";
import { rm, mkdir, writeFile } from "fs/promises";

import { unified } from "unified";

import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import { toString as getTextContent } from "mdast-util-to-string";

import {
  getMarkdownContent,
  getMarkdownListings,
} from "../lib/markdown-utils.mjs";
import { generateHtmlId } from "../lib/html-utils.mjs";

/**
 * @typedef {Object} Heading
 * @property {string} title - The title of the heading.
 * @property {string[]} paragraphs - The paragraphs under the heading.
 * @property {string} href - The URL for the heading.
 */

/**
 * @typedef {Object} BuildResult
 * @property {string} pageName - The name of the page.
 * @property {string[]} [tags] - The tags associated with the build.
 * @property {Heading[]} headings - The headings in the build result.
 */

/**
 * @typedef {Object} Frontmatter
 * @property {string} [title] - The title of the page.
 * @property {string[]} [tags] - The tags associated with the page.
 */

const MARKDOWN_SEARCH_INDEX_FOLDER_PATH = path.join(
  process.cwd(),
  "search-index",
);

const MARKDOWN_SEARCH_INDEX_FILE_PATH = `${MARKDOWN_SEARCH_INDEX_FOLDER_PATH}/markdown-index.json`;

/**
 * Creates a json file where all markdown files are in a format which is easier
 * to search.
 *
 * This is meant to be ran every time the markdown content has changed
 *
 * @returns {Promise<void>}
 */
async function buildSearchIndex() {
  // load all markdown files into one list
  const markdownFiles = (await getMarkdownListings()).reduce((acc, next) => {
    return {
      ...acc,
      files: [...(acc.files || []), ...(next.files || [])],
    };
  }).files;

  if (!markdownFiles)
    throw new Error("No markdown files found while building search db!");

  // parse everything into searchable format
  /** @type {BuildResult[]} */
  const parsedMarkdown = await Promise.all(
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

      const frontmatter = getFrontmatter(markdownContent);

      return {
        pageName: file.name.replace("-", " "),
        tags: frontmatter?.tags,
        headings: parsed,
      };
    }),
  );

  // remove prev. index and create new one
  await rm(MARKDOWN_SEARCH_INDEX_FOLDER_PATH, { recursive: true, force: true });
  await mkdir(MARKDOWN_SEARCH_INDEX_FOLDER_PATH);

  // save as json
  const searchDb = JSON.stringify(parsedMarkdown, null, 2);

  await writeFile(MARKDOWN_SEARCH_INDEX_FILE_PATH, searchDb);
}

/**
 * Gets the frontmatter from a markdown string
 *
 * @param {string} markdown - The title of the page.
 * @returns {Frontmatter | null}
 */
const getFrontmatter = (markdown) => {
  return (
    unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkParseFrontmatter)
      .use(remarkStringify)
      .processSync(markdown).data?.frontmatter ?? null
  );
};

/**
 * Parses markdown into a format which is easier to search.
 *
 * @param {string} markdown - The markdown to parse.
 * @param {string} parentHref - The href of the parent markdown file.
 * @returns {Heading[]} The parsed markdown.
 */
function parseToMatchableBlock({ markdown, parentHref }) {
  const tree = unified().use(remarkParse).parse(markdown);

  /** @type {Heading[]} */
  let headings = [];

  /** @type {Heading | null} */
  let currentHeading = null;

  tree.children.forEach((child, i) => {
    // 1. if child is heading, push currentHeading (if it has content) and create new heading
    if (child.type === "heading") {
      if (currentHeading) headings.push(currentHeading);

      const headingText = getNodeTextContent(child);

      currentHeading = {
        title: headingText,
        paragraphs: [],
        href: `${parentHref}#${generateHtmlId(headingText)}`,
      };
    }

    // 2. If next child is not heading, store it under current heading
    if (child.type === "paragraph") {
      const paragraphText = getNodeTextContent(child);
      currentHeading?.paragraphs.push(paragraphText);
    }

    // push last currentHeading only if it has matching paragraphs
    if (i === tree.children.length - 1 && currentHeading) {
      headings.push(currentHeading);
    }
  });

  return headings;
}

/**
 * Gets the text content of a node.
 *
 * @param {unknown} value - The node to get the text content from.
 * @returns {string} The text content of the node.
 * @returns {string}
 */
function getNodeTextContent(value) {
  return getTextContent(value, {
    includeHtml: false,
    includeImageAlt: false,
  }).replaceAll("\n", " ");
}

buildSearchIndex();
