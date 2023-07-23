import { ParsedMarkdown } from "@/components/parsed-markdown";
import { getMarkdownContent } from "@/lib/markdown.utils";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    docsId: string;
  };
};

export default async function MarkdownPage({ params }: PageProps) {
  const markdownContent = getMarkdownContent(params.docsId);

  if (!markdownContent) return redirect("/404-not-found");

  return <ParsedMarkdown>{markdownContent}</ParsedMarkdown>;
}
