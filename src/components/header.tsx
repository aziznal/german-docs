import Link from "next/link";
import { LucideGithub, Sandwich } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Header = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <header
        {...props}
        ref={ref}
        className={cn(
          `sticky top-0 flex shrink-0 basis-[length:var(--header-height)] items-center bg-neutral-900 pr-12 text-white`,
          className,
        )}
      >
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
    );
  },
);

Header.displayName = "Header";

export default Header;
