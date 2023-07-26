import { ParsedMarkdown } from "@/components/parsed-markdown";
import TableOfContent from "@/components/table-of-content";
import { getMarkdownContent } from "@/lib/markdown.utils";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    docsId: string | string[];
  };
};

export default async function MarkdownPage({ params }: PageProps) {
  let markdownContent: string | null;

  if (typeof params.docsId === "string") {
    markdownContent = await getMarkdownContent(params.docsId);
  } else {
    markdownContent = await getMarkdownContent(params.docsId.join("/"));
  }

  if (!markdownContent) return redirect("/page-not-found");

  const parsedMarkdown = <ParsedMarkdown>{markdownContent}</ParsedMarkdown>;

  return (
    <div className="mt-20 flex grow gap-24 pb-20 text-sm text-neutral-700 lg:px-20">
      <div className="grow">{parsedMarkdown}</div>

      <TableOfContent renderedMarkdown={parsedMarkdown} />
    </div>
  );
}
