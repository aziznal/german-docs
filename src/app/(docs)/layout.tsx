import { PropsWithChildren } from "react";
import Link from "next/link";
import { LucideGithub, Sandwich } from "lucide-react";
import Image from "next/image";

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <header className="foo flex basis-[84px] items-center bg-neutral-900 pr-12 text-white">
        <div className="flex h-full cursor-pointer items-center justify-center px-6 transition hover:bg-neutral-800 lg:w-[length:var(--left-sidebar-width)] lg:px-0">
          <Sandwich size={36} />
        </div>

        <div className="flex grow items-center justify-end gap-4">
          <span className="flex grow justify-center text-center text-5xl lg:flex-grow-0">
            <Image
              src="/germany-flag.png"
              width={100}
              height={100}
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

      <div className="flex grow">
        {/* Left sidebar */}
        <div className="hidden w-[length:var(--left-sidebar-width)] shrink-0 items-center justify-center bg-neutral-100 lg:flex">
          <span>left sidebar</span>
        </div>

        <div className="flex grow flex-col">
          <main className="grow px-6 py-20 lg:px-8">{children}</main>

          <footer className="h-[300px] bg-neutral-900">Footer</footer>
        </div>

        {/* Right sidebar */}
        <div className="hidden basis-48 bg-green-300 lg:flex lg:shrink-0">
          right sidebar
        </div>
      </div>
    </div>
  );
}
