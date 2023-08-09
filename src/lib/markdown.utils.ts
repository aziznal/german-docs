import { readdir, readFile } from "fs/promises";

import path from "path";

export const MARKDOWN_FOLDER_PATH = path.join(process.cwd(), "markdown");

export const MARKDOWN_SEARCH_INDEX_FOLDER_PATH = path.join(
  process.cwd(),
  "search-index",
);

export const MARKDOWN_SEARCH_INDEX_FILE_PATH = `${MARKDOWN_SEARCH_INDEX_FOLDER_PATH}/markdown-index.json`;

export type FileListing = {
  name: string;
  href: string;
};

export type FolderListing = {
  name: string;
  files?: FileListing[];
};

/** Returns a list of folder names within given path */
export async function getDirectoryNames(path: string): Promise<string[]> {
  const files = await readdir(path, { withFileTypes: true });

  return files
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/** Returns a list of .md file names within given path */
export async function getMarkdownFileNames(path: string): Promise<string[]> {
  const files = await readdir(path, { withFileTypes: true });

  return files
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

/** Recursively returns all markdown files available in application  */
export async function getMarkdownListings(): Promise<FolderListing[]> {
  const folderListings = (await getDirectoryNames(MARKDOWN_FOLDER_PATH)).map(
    (dirName) => {
      return {
        name: dirName,
      } as FolderListing;
    },
  );

  await Promise.all(
    folderListings.map(async (folderListing) => {
      const markdownFiles = await getMarkdownFileNames(
        `${MARKDOWN_FOLDER_PATH}/${folderListing.name}`,
      );

      folderListing.files = markdownFiles.map((fileName) => {
        return {
          name: fileName.replace(".md", ""),
          href: `/${folderListing.name}/${fileName.replace(".md", "")}`,
        };
      });
    }),
  );

  return folderListings;
}

/** Returns the contents of the file with the given path */
export async function getMarkdownContent(path: string): Promise<string | null> {
  return readFile(`${MARKDOWN_FOLDER_PATH}/${path}.md`)
    .then((buffer) => buffer.toString())
    .catch((_error: unknown) => {
      return null;
    });
}
