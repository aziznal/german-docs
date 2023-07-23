"use client";

import { forwardRef } from "react";
import HighlightedLink from "@/components/ui/highlighted-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type LeftSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
};

const LeftSidebar = forwardRef<HTMLDivElement, LeftSidebarProps>(
  ({ className, isOpen, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          `sticky top-[length:var(--header-height)] h-[length:var(--left-sidebar-height)] shrink-0 flex-col overflow-y-auto bg-neutral-100 px-6 pb-10 pt-16 transition-all duration-200 lg:flex`,
          isOpen && "w-[length:var(--left-sidebar-width)]",
          !isOpen && "w-0 flex-shrink overflow-x-hidden px-0",
          className,
        )}
      >
        <HighlightedLink
          href="/"
          className="text-sm"
        >
          INTRODUCTION
        </HighlightedLink>

        <Accordion
          type="multiple"
          className="mt-3 text-sm"
        >
          <AccordionItem value="overview">
            <AccordionTrigger>OVERVIEW</AccordionTrigger>

            <AccordionContent>
              <ul className="flex flex-col gap-2 pl-4 text-xs font-normal">
                <HighlightedLink href="/">First Steps</HighlightedLink>
                <HighlightedLink href="/foo">Foo</HighlightedLink>
                <HighlightedLink href="/bar">Bar</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>

                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>


                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
                <HighlightedLink href="/baz">Baz</HighlightedLink>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
);

LeftSidebar.displayName = "LeftSidebar";

export default LeftSidebar;
