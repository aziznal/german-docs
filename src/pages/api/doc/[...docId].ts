import { getMarkdownContent } from "@/lib/markdown-utils.mjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { docId } = request.query;

  if (!docId) return response.status(404).end();

  let parsedDocPath: string;

  if (Array.isArray(docId)) {
    parsedDocPath = docId.join("/");
  } else {
    parsedDocPath = docId;
  }

  const doc = await getMarkdownContent(parsedDocPath);

  if (!doc)
    return response
      .status(404)
      .end("Could not find document with path: " + docId);

  const cacheSeconds = process.env.NODE_ENV === "production" ? "3600" : "0";

  return (
    response
      .status(200)
      .setHeader("content-type", "text/markdown; charset=utf-8")

      // cache for 1 hour
      .setHeader(
        "cache-control",
        `public, max-age=${cacheSeconds}, must-revalidate`,
      )
      .send(doc)
  );
}
