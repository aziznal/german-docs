import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function generateHeadingId(text: string) {
  return text
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");
}

/*
 * This component takes in a raw string of markdown and parses it into HTML
 *
 * @see https://www.npmjs.com/package/react-markdown
 */
export const ParsedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-sm prose-neutral max-w-none lg:prose-base"
      components={{
        h1: ({ node, ...props }) => (
          <h1
            {...props}
            className={cn("scroll-mt-28", props.className)}
            id={generateHeadingId(props.children.toString())}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            {...props}
            className={cn("scroll-mt-28", props.className)}
            id={generateHeadingId(props.children.toString())}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            {...props}
            className={cn("scroll-mt-28", props.className)}
            id={generateHeadingId(props.children.toString())}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
