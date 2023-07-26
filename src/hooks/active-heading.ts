import { useEffect, useState, useRef } from "react";

export function useActiveHeadingObserver() {
  const observer = useRef<IntersectionObserver>();
  const [activeHeadingId, setActiveHeadingId] = useState("");

  useEffect(() => {
    const handleObsever = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveHeadingId(entry.target.id);
          break;
        }
      }
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "0% 0% -10% 0px",
    });

    const elements = document.querySelectorAll("main h1, main h2, main h3");

    elements.forEach((elem) => observer?.current?.observe(elem));

    // Trigger a synthetic scroll event to force an immediate check
    window.dispatchEvent(new Event("scroll"));

    return () => observer.current?.disconnect();
  }, []);

  return { activeHeadingId };
}
