import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HighlightedLink from "@/components/ui/highlighted-link";

type Link = {
  name: string;
  children: {
    name: string;
    href: string;
  }[];
};

const links: Link[] = [
  {
    name: "Hello World",
    children: [
      {
        name: "Getting Started",
        href: "/hello-world/getting-started",
      },
      {
        name: "Your Roadmap",
        href: "/hello-world/roadmap",
      },
    ],
  },
];

export default function LeftSidebarLinks() {
  return (
    <>
      <HighlightedLink
        href="/introduction"
        className="text-sm font-bold hover:font-bold"
      >
        INTRODUCTION
      </HighlightedLink>

      <Accordion
        type="multiple"
        className="mt-3 text-sm"
      >
        {links.map((listing) => (
          <AccordionItem
            id={listing.name}
            value={listing.name}
            key={listing.name}
          >
            <AccordionTrigger
              className="text-start uppercase"
              id={listing.name}
              aria-controls="sidebar-links"
            >
              {listing.name}
            </AccordionTrigger>

            <AccordionContent
              id="sidebar-links"
              aria-labelledby={listing.name}
            >
              <ul className="flex flex-col gap-2 pl-4 text-xs font-normal">
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
