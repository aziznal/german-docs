import { readdir, readFile } from "fs/promises";
import path from "path";

export const MARKDOWN_FOLDER_PATH = path.join(process.cwd(), "markdown");
export const MARKDOWN_SEARCH_INDEX_FOLDER_PATH = path.join(
  process.cwd(),
  "search-index",
);

export const MARKDOWN_SEARCH_INDEX_FILE_PATH = `${MARKDOWN_SEARCH_INDEX_FOLDER_PATH}/markdown-index.json`;

/**
 * @typedef {Object} FileListing
 * @property {string} name
 * @property {string} href
 */

/**
 * @typedef {Object} FolderListing
 * @property {string} name
 * @property {FileListing[]} [files]
 */

/**
 * Returns a list of folder names within given path.
 * @param {string} path - The folder path.
 * @returns {Promise<string[]>} - List of folder names.
 */
export async function getDirectoryNames(path) {
  const files = await readdir(path, { withFileTypes: true });
  return files
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/**
 * Returns a list of .md file names within given path.
 * @param {string} path - The folder path.
 * @returns {Promise<string[]>} - List of markdown file names.
 */
export async function getMarkdownFileNames(path) {
  const files = await readdir(path, { withFileTypes: true });
  return files
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

/**
 * Recursively returns all markdown files available in application.
 * @returns {Promise<FolderListing[]>} - List of folder listings with markdown files.
 */
export async function getMarkdownListings() {
  const folderListings = (await getDirectoryNames(MARKDOWN_FOLDER_PATH)).map(
    (dirName) => ({ name: dirName }),
  );

  await Promise.all(
    folderListings.map(async (folderListing) => {
      const markdownFiles = await getMarkdownFileNames(
        `${MARKDOWN_FOLDER_PATH}/${folderListing.name}`,
      );
      folderListing.files = markdownFiles.map((fileName) => ({
        name: fileName.replace(".md", ""),
        href: `/${folderListing.name}/${fileName.replace(".md", "")}`,
      }));
    }),
  );

  return folderListings;
}

/**
 * Returns the contents of the file with the given path.
 * @param {string} path - The file path.
 * @returns {Promise<string|null>} - File content or null if file not found.
 */
export async function getMarkdownContent(path) {
  return readFile(`${MARKDOWN_FOLDER_PATH}/${path}.md`)
    .then((buffer) => buffer.toString())
    .catch(() => null);
}
