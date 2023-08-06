import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");

  if (!search)
    return new NextResponse("No search term provided", { status: 400 });

  return new NextResponse("Heard you loud and clear!", { status: 200 });
}
