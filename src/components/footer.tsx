import { cn } from "@/lib/utils";
import { LucideGithub } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

const Footer = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        {...props}
        ref={ref}
        className={cn(
          `flex flex-col items-center justify-center gap-2 bg-neutral-900 px-4 py-12 text-center text-sm text-neutral-500`,
          className,
        )}
      >
        <Image
          className="mb-2 rounded border border-neutral-600"
          src="/germany-flag.png"
          width={50}
          height={70}
          alt="German flag"
        />

        <div className="inline-flex flex-wrap justify-center gap-1 text-center">
          <p>
            <span>Made by</span>

            <a
              href="https://github.com/aziznal/german-docs"
              target="_blank"
              className="mx-1 inline-flex gap-1 font-bold text-rose-600"
            >
              aziznal <LucideGithub />
            </a>

            <span>using NextJS 13</span>
          </p>

          <p>
            | Hosted by <span className="ml-1 font-bold">Vercel</span>
          </p>
        </div>

        <p>July 2023</p>

        <p className="mt-4">Disclaimer:</p>

        <p>
          This is just a project I made for educational and recreational
          programming purposes.
        </p>

        <p>
          Upon the request of relevant parties responsible for NestJS, I will
          change the design to something less lawsuity.
        </p>

        <p className="mt-4">
          contact email:{" "}
          <a
            className="underline"
            href="mailto:aziznal.dev@gmail.com"
          >
            aziznal.dev@gmail.com
          </a>
        </p>
      </footer>
    );
  },
);

Footer.displayName = "Footer";

export default Footer;
