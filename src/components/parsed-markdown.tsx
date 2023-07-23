import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/*
 * This component takes in a raw string of markdown and parses it into HTML
 *
 * @see https://www.npmjs.com/package/react-markdown
 */
export const ParsedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose max-w-none"
    >
      {children}
    </ReactMarkdown>
  );
};
