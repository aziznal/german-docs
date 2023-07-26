"use client";

import { cn } from "@/lib/utils";
import { ReactNode, forwardRef, useEffect, useState } from "react";

type RightSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  renderedMarkdown: ReactNode;
};

type Heading = {
  id: string;
  text: string;
};

const RightSidebar = forwardRef<HTMLDivElement, RightSidebarProps>(
  ({ className, renderedMarkdown, ...props }, ref) => {
    const [headings, setHeadings] = useState<Heading[]>();

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
              className="block px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900"
            >
              {text}
            </a>
          ))}
      </div>
    );
  },
);

RightSidebar.displayName = "RightSidebar";

export default RightSidebar;
