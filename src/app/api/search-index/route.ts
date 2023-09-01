import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { MARKDOWN_SEARCH_INDEX_FILE_PATH } from "@/lib/markdown-utils.mjs";

export async function GET(_request: NextRequest) {
  const searchIndex = readFileSync(MARKDOWN_SEARCH_INDEX_FILE_PATH).toString();

  const cacheSeconds = process.env.NODE_ENV === "production" ? "3600" : "0";

  return new NextResponse(searchIndex, {
    headers: {
      "content-type": "application/json",

      // cache for 1 days
      "cache-control": `public, max-age=${cacheSeconds}, must-revalidate`,
    },
  });
}
