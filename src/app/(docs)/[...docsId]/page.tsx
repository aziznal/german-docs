import { ParsedMarkdown } from "@/components/parsed-markdown";
import { getMarkdownContent } from "@/lib/markdown.utils";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    docsId: string | string[];
  };
};

export default async function MarkdownPage({ params }: PageProps) {
  // params.docsId is an array of strings or a string
  //
  // if it's a string, it's a single page, simply pass it on
  let markdownContent: string | null;

  if (typeof params.docsId === "string") {
    markdownContent = await getMarkdownContent(params.docsId);
  } else {
    // if it's an array, it's a nested page, so we need to join the strings
    // together to get the full path
    markdownContent = await getMarkdownContent(params.docsId.join("/"));
  }

  if (!markdownContent) return redirect("/page-not-found");

  return <ParsedMarkdown>{markdownContent}</ParsedMarkdown>;
}
