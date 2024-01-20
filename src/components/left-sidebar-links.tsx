"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HighlightedLink from "@/components/ui/highlighted-link";
import { unique } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Link = {
  name: string;
  rootHref: string;
  children: {
    name: string;
    href: string;
  }[];
};

const links: Link[] = [
  {
    name: "Hello World",
    rootHref: "/Hello-World",
    children: [
      {
        name: "Getting Started",
        href: "/Hello-World/Getting-Started",
      },
      {
        name: "The Alphabet",
        href: "/Hello-World/The-Alphabet",
      },
      {
        name: "Your Roadmap",
        href: "/Hello-World/Roadmap",
      },
    ],
  },
  {
    name: "Genders",
    rootHref: "/Genders",
    children: [
      {
        name: "Genders",
        href: "/Genders/Genders",
      },
    ],
  },
  {
    name: "The Tivs (Grammatical Cases)",
    rootHref: "/The-Tivs",
    children: [
      {
        name: "Articles",
        href: "/The-Tivs/Articles",
      },
      {
        name: "The Nominative",
        href: "/The-Tivs/The-Nominative",
      },
      {
        name: "The Accusative",
        href: "/The-Tivs/The-Accusative",
      },
      {
        name: "The Dative",
        href: "/The-Tivs/The-Dative",
      },
      {
        name: "The Genitive",
        href: "/The-Tivs/The-Genitive",
      },
    ],
  },
];

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

  const [accordionValue, setAccordionValue] = useState<string[]>([path]);

  useEffect(() => {
    setAccordionValue((currentValues) => unique([...currentValues, path]));
  }, [path]);

  return (
    <>
      <HighlightedLink
        href="/"
        className="text-sm font-bold hover:font-bold"
      >
        WELCOME
      </HighlightedLink>

      <Accordion
        type="multiple"
        className="mt-3 text-sm"
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
