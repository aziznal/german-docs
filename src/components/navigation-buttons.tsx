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
  }, [isMacos]);

  return (
    <div className="mt-12 flex items-center justify-between">
      <div>
        {prevLink && (
          <Link
            href={prevLink.href}
            className="flex items-center gap-1 hover:text-rose-600"
            title={`Shortcut: Cmd + Left Arrow`}
          >
            <ArrowLeft size={16} />
            <span>Back to {prevLink.name}</span>
          </Link>
        )}
      </div>

      <div>
        {nextLink && (
          <Link
            href={nextLink.href}
            className="flex items-center gap-1 hover:text-rose-600"
            title={`Shortcut: Cmd + Right Arrow`}
          >
            <span>Next to {nextLink.name}</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};

NavigationButtons.displayName = "NavigationButtons";
