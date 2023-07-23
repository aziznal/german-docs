import { forwardRef } from "react";
import HighlightedLink from "@/components/ui/highlighted-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const LeftSidebar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        `sticky top-[length:var(--header-height)] hidden h-[length:var(--left-sidebar-height)] w-[length:var(--left-sidebar-width)] shrink-0 flex-col bg-neutral-100 px-6 pt-16 lg:flex`,
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
        className="text-sm"
      >
        <AccordionItem value="overview">
          <AccordionTrigger>OVERVIEW</AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col gap-2 pl-4 text-xs font-normal">
              <HighlightedLink href="/">First Steps</HighlightedLink>
              <HighlightedLink href="/foo">Foo</HighlightedLink>
              <HighlightedLink href="/bar">Bar</HighlightedLink>
              <HighlightedLink href="/baz">Baz</HighlightedLink>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

LeftSidebar.displayName = "LeftSidebar";

export default LeftSidebar;
