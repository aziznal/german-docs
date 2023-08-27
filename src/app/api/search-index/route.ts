import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { MARKDOWN_SEARCH_INDEX_FILE_PATH } from "@/lib/markdown.utils";

export async function GET(_request: NextRequest) {
  const searchIndex = readFileSync(MARKDOWN_SEARCH_INDEX_FILE_PATH).toString();

  return new NextResponse(searchIndex, {
    headers: {
      "content-type": "application/json",

      // cache for 1 days
      "cache-control": `public, max-age=${
        process.env.NODE_ENV === "production" ? "86400" : "0"
      }, must-revalidate`,
    },
  });
}
