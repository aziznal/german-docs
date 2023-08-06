import { getMarkdownListings } from "@/lib/markdown.utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HighlightedLink from "@/components/ui/highlighted-link";

/** returns a link with dashes replaced with spaces and first character capitalized  */
function formatLink(link: string): string {
  return link
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function LeftSidebarLinks() {
  const listings = await getMarkdownListings();

  return (
    <>
      <HighlightedLink
        className="text-sm font-bold"
        href="/introduction"
      >
        INTRODUCTION
      </HighlightedLink>

      <Accordion
        type="multiple"
        className="mt-3 text-sm"
      >
        {listings.map((listing) => (
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
              {formatLink(listing.name)}
            </AccordionTrigger>

            <AccordionContent
              id="sidebar-links"
              aria-labelledby={listing.name}
            >
              <ul className="flex flex-col gap-2 pl-4 text-xs font-normal">
                {listing.files?.map((file) => (
                  <HighlightedLink
                    href={file.href}
                    key={file.name}
                  >
                    {formatLink(file.name)}
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
