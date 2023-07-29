import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        placeholder="Search the docs..."
        className={cn(
          "rounded bg-neutral-800 px-4 py-2 text-muted-foreground",
          className,
        )}
      />
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
