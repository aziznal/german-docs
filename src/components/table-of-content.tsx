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
          `sticky top-[calc(var(--header-height)_+_48px)] hidden h-fit basis-[180px] flex-col gap-3 lg:flex lg:shrink-0`,
          className,
        )}
      >
        <span className="absolute left-[3px] top-3 z-0 h-[80%] w-[2px] bg-gray-100"></span>

        {headings &&
          headings.map(({ id, text }) => {
            const isActive = id === activeHeadingId;

            return (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "z-10 flex items-center gap-6 text-sm text-neutral-700 hover:text-rose-600",
                  isActive && "font-bold text-rose-600",
                )}
              >
                <span
                  className={cn(
                    "border-3 block h-2 w-2 shrink-0 rounded-full bg-white outline outline-2 -outline-offset-1 outline-gray-100 transition",
                    isActive && "bg-rose-600 outline-0",
                  )}
                ></span>

                <span className="overflow-x-hidden text-ellipsis whitespace-nowrap">
                  {text}
                </span>
              </a>
            );
          })}
      </div>
    );
  },
);

TableOfContent.displayName = "TableOfContent";

export default TableOfContent;
