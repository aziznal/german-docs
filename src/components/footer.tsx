import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Footer = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        {...props}
        ref={ref}
        className={cn(
          `flex items-center justify-center bg-neutral-900 py-12 text-white`,
          className,
        )}
      >
        Footer
      </footer>
    );
  },
);

Footer.displayName = "Footer";

export default Footer;
