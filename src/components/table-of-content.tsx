"use client";

import { useActiveHeadingObserver } from "@/hooks/active-heading";
import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, useEffect, useState } from "react";

type TableOfContentProps = React.HTMLAttributes<HTMLDivElement> & {
  renderedMarkdown: ReactNode;
};

type Heading = {
  id: string;
  text: string;
};

const TableOfContent = forwardRef<HTMLDivElement, TableOfContentProps>(
  ({ className, renderedMarkdown, ...props }, ref) => {
    const [headings, setHeadings] = useState<Heading[]>();
    const { activeHeadingId } = useActiveHeadingObserver();

    useEffect(() => {
      const main = document.querySelector("main");

      if (!main) return;

      const headings = Array.from(main.querySelectorAll("h1, h2")).map(
        (heading) => {
          const id = heading.id;
          const text = heading.textContent;

          return { id, text } as Heading;
        },
      );

      setHeadings(headings);
    }, []);

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          `sticky top-[length:var(--header-height)] hidden h-fit basis-[250px] flex-col lg:flex lg:shrink-0`,
          className,
        )}
      >
        {headings &&
          headings.map(({ id, text }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "block px-4 py-2 text-sm text-neutral-700 hover:text-rose-600",
                id === activeHeadingId && "text-rose-600",
              )}
            >
              {text}
            </a>
          ))}
      </div>
    );
  },
);

TableOfContent.displayName = "TableOfContent";

export default TableOfContent;
