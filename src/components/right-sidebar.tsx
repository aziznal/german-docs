import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const RightSidebar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        `sticky top-[length:var(--header-height)] hidden h-fit basis-[250px] bg-green-300 lg:flex lg:shrink-0`,
        className,
      )}
    >
      right sidebar
    </div>
  );
});

RightSidebar.displayName = "RightSidebar";

export default RightSidebar;
