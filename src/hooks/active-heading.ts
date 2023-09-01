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
      // These confusing a** values mean the following:
      // 10% - Trigger when the element is 10% from the top of the viewport
      // 0% - Trigger when the element is 0% from the bottom of the viewport
      // -45% - Trigger when the element is 45% from the top of the viewport
      // 0px - Trigger when the element is 0px from the bottom of the viewport
      rootMargin: "10% 0% -45% 0px",
    });

    const elements = document.querySelectorAll("main h2");

    elements.forEach((elem) => observer?.current?.observe(elem));

    // Trigger a synthetic scroll event to force an immediate check
    window.dispatchEvent(new Event("scroll"));

    return () => observer.current?.disconnect();
  }, []);

  return { activeHeadingId };
}
