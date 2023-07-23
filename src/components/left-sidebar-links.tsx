import { getNavLinks } from "@/lib/markdown.utils";
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

export default function LeftSidebarLinks() {
  const listings = getNavLinks();

  return (
    <Accordion
      type="multiple"
      className="mt-3 text-sm"
    >
      {listings.map((listing) => (
        <AccordionItem value={listing.name}>
          <AccordionTrigger className="uppercase">
            {formatLink(listing.name)}
          </AccordionTrigger>

          <AccordionContent>
            <ul className="flex flex-col gap-2 pl-4 text-xs font-normal">
              {listing.files.map((file) => (
                <HighlightedLink href={file}>{formatLink(file)}</HighlightedLink>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
