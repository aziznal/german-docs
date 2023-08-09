import { NextRequest, NextResponse } from "next/server";

import { search } from "@/lib/search";

export async function GET(request: NextRequest) {
  const searchInput = request.nextUrl.searchParams.get("q");

  if (!searchInput)
    return new NextResponse("No search term provided", { status: 400 });

  const result = await search({ query: searchInput });

  if (!result) return new NextResponse("No results found", { status: 404 });

  return new NextResponse(JSON.stringify(result), {
    headers: {
      "content-type": "application/json",
    },
  });
}
