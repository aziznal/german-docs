"use client";

import { useGetPlatform } from "@/hooks/platform";
import { useLinks } from "@/providers/links-provider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NavigationButtons = () => {
  const { nextLink, prevLink } = useLinks();

  const router = useRouter();

  const { isMacos } = useGetPlatform();

  useEffect(() => {
    const changePage = (e: KeyboardEvent) => {
      if (isMacos) {
        if (e.metaKey && e.key === "ArrowLeft") {
          e.preventDefault();
          if (prevLink) router.push(prevLink.href);
          return;
        }

        if (e.metaKey && e.key === "ArrowRight") {
          e.preventDefault();
          if (nextLink) router.push(nextLink.href);
          return;
        }
      }

      if (!isMacos) {
        if (e.ctrlKey && e.key === "ArrowLeft") {
          e.preventDefault();
          if (prevLink) router.push(prevLink.href);
          return;
        }

        if (e.ctrlKey && e.key === "ArrowRight") {
          e.preventDefault();
          if (nextLink) router.push(nextLink.href);
          return;
        }
      }
    };

    document.addEventListener("keydown", changePage);

    return () => {
      document.removeEventListener("keydown", changePage);
    };
  }, [isMacos, nextLink, prevLink, router]);

  return (
    <div className="mt-24 flex flex-col gap-4 items-center justify-between lg:flex-row dark:text-neutral-300">
      <div>
        {prevLink && (
          <Link
            href={prevLink.href}
            className="flex items-center gap-1 text-lg hover:text-rose-600"
            title={`Shortcut: Cmd + Left Arrow`}
          >
            <ArrowLeft size={20} />
            <span>
              Back to <span className="font-bold">{prevLink.name}</span>
            </span>
          </Link>
        )}
      </div>

      <div>
        {nextLink && (
          <Link
            href={nextLink.href}
            className="flex items-center gap-1 text-lg hover:text-rose-600"
            title={`Shortcut: Cmd + Right Arrow`}
          >
            <span>
              Next to <span className="font-bold">{nextLink.name}</span>
            </span>
            <ArrowRight size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

NavigationButtons.displayName = "NavigationButtons";
