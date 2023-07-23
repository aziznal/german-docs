import fs from "fs";
import path from "path";

const MARKDOWN_FOLDER_PATH = path.join(process.cwd(), "markdown");

type Listing = {
  name: string;
  path: string;
  type: "dir" | "markdown";
};

type FolderListing = Listing & {
  type: "dir";
};

type FileListing = Listing & {
  type: "markdown";
};

/** Returns a list of folder names within givne path */
export function getDirectoryNames(path: string): string[] {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/** Returns a list of .md file names within given path */
export function getMarkdownFileNames(path: string): string[] {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

/** Recursively returns all markdown files available in application  */
export function getMarkdownListings(): FileListing[] {
  const allFolders: FolderListing[] = getDirectoryNames(
    MARKDOWN_FOLDER_PATH,
  ).map((dirName) => {
    return {
      name: dirName,
      path: `${MARKDOWN_FOLDER_PATH}/${dirName}`,
      type: "dir",
    };
  });

  const allFiles: FileListing[] = [];

  allFiles.push(
    ...getMarkdownFileNames(MARKDOWN_FOLDER_PATH).map((fileName) => {
      return {
        name: fileName.replace(".md", ""),
        path: `${MARKDOWN_FOLDER_PATH}/${fileName}`,
        type: "markdown" as const,
      };
    }),
  );

  allFolders.forEach((folder) => {
    const markdownFiles = getMarkdownFileNames(folder.path);

    allFiles.push(
      ...markdownFiles.map((fileName) => {
        return {
          name: fileName.replace(".md", ""),
          path: `${folder.path}/${fileName}`,
          type: "markdown" as const,
        };
      }),
    );
  });

  return allFiles;
}

/** Returns the contents of the file with the given path */
export function getMarkdownContent(path: string): string | null {
  const listings = getMarkdownListings();
  const markdownFile = listings.find((listing) => listing.name === path);

  if (!markdownFile) return null;

  return fs.readFileSync(`${markdownFile.path}`).toString();
}
