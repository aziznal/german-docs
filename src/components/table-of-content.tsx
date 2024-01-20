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

    // used to make sure last clicked heading is always active
    const [lastClickedHeadingId, setLastClickedHeadingId] = useState<string>();

    // if the observer detects a new active heading, reset the last clicked heading
    // so the correct heading is active
    useEffect(() => {
      setLastClickedHeadingId(undefined);
    }, [activeHeadingId]);

    useEffect(() => {
      const main = document.querySelector("main");

      if (!main) return;

      const headings = Array.from(main.querySelectorAll("h2")).map(
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
          `sticky top-[calc(var(--header-height)_+_48px)] hidden h-fit shrink-0 basis-[180px] flex-col lg:flex`,
          className,
        )}
      >
        {headings &&
          headings.length > 1 &&
          headings.map(({ id, text }) => {
            const isActive =
              // active heading is used only when there is no last clicked heading
              // This works because last clicked heading is reset when a new heading is scrolled into being active
              id === (!lastClickedHeadingId && activeHeadingId) ||
              id === lastClickedHeadingId;

            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => {
                  setLastClickedHeadingId(id);
                }}
                className={cn(
                  "group flex items-start gap-6 text-sm text-neutral-700 hover:text-rose-600 dark:text-foreground dark:hover:text-rose-600",
                  isActive && "font-bold text-rose-600 dark:text-rose-600",
                )}
              >
                <div className="flex translate-y-[6px] flex-col items-center">
                  <span
                    className={cn(
                      "border-3 block h-2 w-2 shrink-0 rounded-full bg-background outline outline-2 -outline-offset-1 outline-gray-100 transition dark:outline-gray-700",
                      isActive && "bg-rose-600 outline-0 dark:bg-rose-600",
                    )}
                  ></span>

                  <span className="h-[30px] w-[2px] bg-gray-100 group-last:hidden dark:bg-gray-700"></span>
                </div>

                <span className="block overflow-x-hidden text-ellipsis whitespace-nowrap">
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
