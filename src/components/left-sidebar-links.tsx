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
        className="text-sm"
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
            value={listing.name}
            key={listing.name}
          >
            <AccordionTrigger className="uppercase">
              {formatLink(listing.name)}
            </AccordionTrigger>

            <AccordionContent>
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
