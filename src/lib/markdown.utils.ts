import fs from "fs";
import path from "path";

const MARKDOWN_FOLDER_PATH = path.join(process.cwd(), "markdown");

export type BetterListing = {
  name: string;
  files: {
    name: string;
    path: string;
    href: string;
  }[];
};

export type Listing = {
  name: string;
  path: string;
  type: "dir" | "markdown";
};

export type FolderListing = Listing & {
  type: "dir";
};

export type FileListing = Listing & {
  type: "markdown";
};

export type NavLink = {
  name: string;
  files: string[];
};

/** Returns a list of folder names within given path */
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

/** Returns a list of entities representing folders and the files inside them as a list */
export function getNavLinks(): NavLink[] {
  const allFolders: FolderListing[] = getDirectoryNames(
    MARKDOWN_FOLDER_PATH,
  ).map((dirName) => {
    return {
      name: dirName,
      path: `${MARKDOWN_FOLDER_PATH}/${dirName}`,
      type: "dir",
    };
  });

  const navLinks: NavLink[] = allFolders.map((folder) => {
    return {
      name: folder.name,
      files: getMarkdownFileNames(folder.path).map((fileName) =>
        fileName.replace(".md", ""),
      ),
    };
  });

  return navLinks;
}

/** Returns the contents of the file with the given path */
export function getMarkdownContent(path: string): string | null {
  const listings = getMarkdownListings();
  const markdownFile = listings.find((listing) => listing.name === path);

  if (!markdownFile) return null;

  return fs.readFileSync(`${markdownFile.path}`).toString();
}
