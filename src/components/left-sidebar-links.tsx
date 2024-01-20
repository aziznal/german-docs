"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HighlightedLink from "@/components/ui/highlighted-link";
import { unique } from "@/lib/utils";
import { useLinks } from "@/providers/links-provider";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// returns the first part of a path after the first slash.
//
// e.g. "/Hello-World/Getting-Started" -> "/Hello-World"
//
// If the path is just "/", returns "/".
function getPathFirstSegment(path?: string): string | null {
  if (!path) return null;

  const segments = path.split("/");
  return segments.length > 1 ? "/" + segments[1] : "/";
}

export default function LeftSidebarLinks() {
  // used to open the accordion in wihch the current link is active (if it exists)
  const path = getPathFirstSegment(usePathname() ?? undefined) ?? "";

  const { links } = useLinks();

  const [accordionValue, setAccordionValue] = useState<string[]>([path]);

  // open accordion if `path` to a page whose link is in a closed accordion
  // (e.g. from the search or back button)
  useEffect(() => {
    setAccordionValue((currentValues) => unique([...currentValues, path]));
  }, [path]);

  const openAllAccordions = () => {
    setAccordionValue(links.map((link) => link.rootHref));
  };

  const closeAllAccordionsExceptActive = () => {
    setAccordionValue([path]);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <div
          className="mb-4 flex w-fit cursor-pointer items-center gap-1 text-xs text-neutral-400 hover:text-rose-600"
          onClick={openAllAccordions}
          title="Expand all links"
        >
          <span>Expand</span>

          <ChevronsUpDown size={16} />
        </div>

        <div
          className="mb-4 flex w-fit cursor-pointer items-center gap-1 text-xs text-neutral-400 hover:text-rose-600"
          onClick={closeAllAccordionsExceptActive}
          title="Collapse all links"
        >
          <span>Collapse</span>

          <ChevronsDownUp size={16} />
        </div>
      </div>

      <HighlightedLink
        href="/"
        className="text-sm font-bold hover:font-bold"
      >
        WELCOME
      </HighlightedLink>

      <Accordion
        type="multiple"
        className="mt-3 text-sm [&_*]:shrink-0 [&_*]:whitespace-nowrap"
        value={accordionValue}
        onValueChange={(value) => setAccordionValue(value)}
      >
        {links.map((listing) => (
          <AccordionItem
            value={listing.rootHref}
            key={listing.name}
          >
            <AccordionTrigger
              id={listing.name}
              className="text-start uppercase"
              aria-controls="sidebar-links"
            >
              {listing.name}
            </AccordionTrigger>

            <AccordionContent
              id={"sidebar-links" + listing.name}
              aria-labelledby={listing.name}
            >
              <ul className="flex flex-col gap-2 pl-4 font-normal">
                {listing.children.map((file) => (
                  <HighlightedLink
                    href={file.href}
                    key={file.name}
                  >
                    {file.name}
                  </HighlightedLink>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
