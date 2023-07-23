import Link from "next/link";
import { LucideGithub, Menu, Sandwich } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  isLeftSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className, toggleSidebar, isLeftSidebarOpen, ...props }, ref) => {
    return (
      <header
        {...props}
        ref={ref}
        className={cn(
          `sticky top-0 flex shrink-0 basis-[length:var(--header-height)] items-center bg-neutral-900 pr-12 text-white`,
          className,
        )}
      >
        <div
          className={cn(
            `flex h-full w-[80px] cursor-pointer items-center justify-center px-6 transition-all duration-200 hover:bg-neutral-800`,
            isLeftSidebarOpen && "lg:w-[length:var(--left-sidebar-width)]",
          )}
          onClick={toggleSidebar}
        >
          <Menu size={32} />
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