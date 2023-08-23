import { ParsedMarkdown } from "@/components/parsed-markdown";
import TableOfContent from "@/components/table-of-content";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    docsId: string | string[];
  };
};

export default async function MarkdownPage({ params }: PageProps) {
  const requestPath =
    process.env.NEXT_PUBLIC_BASE_URL +
    "/api/doc/" +
    (typeof params.docsId === "string"
      ? params.docsId
      : params.docsId.join("/"));

  const markdownContent = await fetch(requestPath, {
    method: "GET",
  }).then((res) => res.text());

  if (!markdownContent) return redirect("/page-not-found");

  const parsedMarkdown = <ParsedMarkdown>{markdownContent}</ParsedMarkdown>;

  return (
    <div className="mt-20 flex grow gap-24 px-6 pb-20 text-sm text-neutral-700 lg:px-20">
      <div className="grow">{parsedMarkdown}</div>

      <TableOfContent renderedMarkdown={parsedMarkdown} />
    </div>
  );
}
