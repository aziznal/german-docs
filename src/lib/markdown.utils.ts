import fs from "fs";

const MARKDOWN_FOLDER_PATH = "markdown";

type Listing = {
  name: string;
  path: string;
  type: "dir" | "markdown";
};

/** Returns a list of folder names within givne path */
export function getDirectories(path: string): string[] {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/** Returns a list of .md file names within given path */
export function getMarkdownFiles(path: string): string[] {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name);
}

export function getMarkdownListings(): Listing[] {
  const allFolders: Listing[] = getDirectories(MARKDOWN_FOLDER_PATH).map(
    (dirName) => {
      return {
        name: dirName,
        path: `${MARKDOWN_FOLDER_PATH}/${dirName}`,
        type: "dir",
      };
    },
  );

  const allFiles: Listing[] = [];

  allFiles.push(
    ...getMarkdownFiles(MARKDOWN_FOLDER_PATH).map((fileName) => {
      return {
        name: fileName,
        path: `${MARKDOWN_FOLDER_PATH}/${fileName}`,
        type: "markdown" as const,
      };
    }),
  );

  allFolders.forEach((folder) => {
    const markdownFiles = getMarkdownFiles(folder.path);

    allFiles.push(
      ...markdownFiles.map((fileName) => {
        return {
          name: fileName,
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

  const markdownFile = listings.find(
    (listing) => listing.name.includes(path) && listing.type === "markdown",
  );

  if (!markdownFile) return null;

  return fs.readFileSync(`${markdownFile.path}`).toString();
}
