import { PropsWithChildren } from "react";
import Link from "next/link";
import { LucideGithub, Sandwich } from "lucide-react";
import Image from "next/image";
import HighlightedLink from "@/components/ui/highlighted-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 flex shrink-0 basis-[length:var(--header-height)] items-center bg-neutral-900 pr-12 text-white">
        <div className="flex h-full cursor-pointer items-center justify-center px-6 transition hover:bg-neutral-800 lg:w-[length:var(--left-sidebar-width)] lg:px-0">
          <Sandwich size={36} />
        </div>

        <div className="flex grow items-center justify-end gap-4">
          <span className="flex grow justify-center text-center text-5xl lg:flex-grow-0">
            <Image
              src="/germany-flag.png"
              width={50}
              height={70}
              alt="German flag"
            />
          </span>

          <div className="hidden gap-4 lg:flex">
            <span className="w-[200px] bg-neutral-700">Search</span>

            <Link
              href="/"
              className="font-bold uppercase"
            >
              Landing Page
            </Link>
          </div>

          <div className="hidden lg:block">
            <a
              href="https://github.com/aziznal/german-docs"
              target="_blank"
            >
              <LucideGithub />
            </a>
          </div>
        </div>
      </header>

      {/* Page Body */}
      <div className="flex grow">
        {/* Left sidebar */}
        <div className="sticky top-[length:var(--header-height)] hidden h-[length:var(--left-sidebar-height)] w-[length:var(--left-sidebar-width)] shrink-0 flex-col bg-neutral-100 px-6 pt-16 lg:flex">
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

        <div className="flex grow flex-col">
          <div className="flex grow">
            {/* Main content */}
            <main className="grow px-6 py-20 text-sm text-neutral-700 lg:px-20">
              {children}
            </main>

            {/* Right sidebar */}
            <div className="sticky top-[length:var(--header-height)] hidden h-fit basis-[250px] bg-green-300 lg:flex lg:shrink-0">
              right sidebar
            </div>
          </div>

          <footer className="flex items-center justify-center bg-neutral-900 py-12 text-white">
            Footer
          </footer>
        </div>
      </div>
    </div>
  );
}
