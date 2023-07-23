import * as fsPromises from "fs/promises";

import path from "path";

const MARKDOWN_FOLDER_PATH = path.join(process.cwd(), "markdown");

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
  const files = await fsPromises.readdir(path, { withFileTypes: true });

  return files
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/** Returns a list of .md file names within given path */
export async function getMarkdownFileNames(path: string): Promise<string[]> {
  const files = await fsPromises.readdir(path, { withFileTypes: true });

  return files
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

/** Recursively returns all markdown files available in application  */
export async function getMarkdownListings(): Promise<FolderListing[]> {
  const folderListings: FolderListing[] = (
    await getDirectoryNames(MARKDOWN_FOLDER_PATH)
  ).map((dirName) => {
    return {
      name: dirName,
    } satisfies FolderListing;
  });

  await Promise.all(
    folderListings.map(async (folderListing) => {
      const markdownFiles = await getMarkdownFileNames(
        `${MARKDOWN_FOLDER_PATH}/${folderListing.name}`,
      );

      folderListing.files = markdownFiles.map((fileName) => {
        return {
          name: fileName.replace(".md", ""),
          href: `/${folderListing.name}/${fileName.replace(".md", "")}`,
        } satisfies FileListing;
      });
    }),
  );

  return folderListings;
}

/** Returns the contents of the file with the given path */
export async function getMarkdownContent(path: string): Promise<string | null> {
  // const listings = getMarkdownListings();
  // const markdownFile = listings.find((listing) => listing.name === path);
  //
  // if (!markdownFile) return null;

  return (
    await fsPromises.readFile(`${MARKDOWN_FOLDER_PATH}/${path}.md`)
  ).toString();
}
