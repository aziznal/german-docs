import { cn, isRootLink } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { generateHtmlId } from "@/lib/html-utils.mjs";
import { ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark";

const getNodeText = (node: any): string | undefined => {
  if (["string", "number"].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join("");
  if (typeof node === "object" && node) return getNodeText(node.props.children);
};

/*
 * This component takes in a raw string of markdown and parses it into HTML
 *
 * @see https://www.npmjs.com/package/react-markdown
 */
export const ParsedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkFrontmatter]}
      className={cn(`
          prose
          prose-neutral

          max-w-none 
          text-foreground

          lg:prose-lg

          dark:text-foreground
      `)}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            {...props}
            className={cn("scroll-mt-28 dark:text-foreground", props.className)}
            id={generateHtmlId(props.children.toString())}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            {...props}
            className={cn("scroll-mt-28 dark:text-foreground", props.className)}
            id={generateHtmlId(props.children.toString())}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            {...props}
            className={cn("scroll-mt-28 dark:text-foreground", props.className)}
            id={generateHtmlId(props.children.toString())}
          />
        ),
        h4: ({ node, ...props }) => (
          <h4
            {...props}
            className={cn("scroll-mt-28 dark:text-foreground", props.className)}
            id={generateHtmlId(props.children.toString())}
          />
        ),
        a: ({ node, children, ...props }) => (
          <Link
            {...props}
            href={props.href ?? "/"}
            target={isRootLink(props.href) ? "_self" : "_blank"}
            className={cn(
              `mr-1 inline-flex items-center gap-2 text-foreground hover:text-rose-600`,
              props.className,
            )}
            id={generateHtmlId(children.toString())}
          >
            <span>{children}</span>
            {isRootLink(props.href) ? null : <ArrowUpRightFromSquare />}
          </Link>
        ),
        strong: ({ node, ...props }) => (
          <strong
            {...props}
            className={cn("dark:text-foreground", props.className)}
            id={generateHtmlId(props.children.toString())}
          />
        ),
        i: ({ node, ...props }) => (
          <strong
            {...props}
            className={cn("dark:text-foreground", props.className)}
            id={generateHtmlId(props.children.toString())}
          />
        ),
        code: ({ node, ...props }) => (
          <code
            {...props}
            className={cn(
              `
                dark:overflow-clip 
                dark:overflow-ellipsis
                dark:rounded-md
                dark:border-neutral-600
                dark:bg-neutral-900
                dark:py-0.5
                dark:font-mono
                dark:text-foreground
                dark:shadow-sm
            `,
              props.className,
            )}
          />
        ),
        pre: ({ node, ...props }) => (
          <SyntaxHighlighter
            language="shell"
            style={theme}
          >
            {getNodeText(props.children) ?? ""}
          </SyntaxHighlighter>
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            className={cn(
              "dark:border-l-neutral-500 dark:text-foreground",
              props.className,
            )}
          />
        ),
        hr: ({ node, ...props }) => (
          <hr
            {...props}
            className={cn("border-neutral-600", props.className)}
          />
        ),
        table: ({ node, ...props }) => (
          <table
            {...props}
            className={cn(`mx-auto`, props.className)}
          />
        ),
        thead: ({ node, ...props }) => (
          <thead
            {...props}
            className={cn(`[&_*]:!bg-transparent`, props.className)}
          />
        ),
        tr: ({ node, ...props }) => (
          <tr
            {...props}
            className={cn(
              `
                transition-colors
                duration-100
                odd:bg-neutral-100 

                hover:bg-neutral-300
                first:hover:bg-none
               
                dark:border-neutral-600
                dark:odd:bg-neutral-800
                dark:hover:bg-neutral-900
                dark:first:hover:bg-none
            `,
              props.className,
            )}
          />
        ),
        th: ({ node, ...props }) => (
          <th
            {...props}
            title={props.children.toString()}
            className={cn(
              `
                overflow-clip
                overflow-ellipsis
                !px-2
                text-foreground
            `,
              props.className,
            )}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            {...props}
            title={props.children.toString()}
            className={cn(`!px-2`, props.className)}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
