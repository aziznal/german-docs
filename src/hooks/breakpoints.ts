import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { useEffect, useState } from "react";

const screens = resolveConfig(tailwindConfig).theme?.screens as {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export const useTailwindBreakpoints = () => {
  const [isOnSmallScreen, setIsOnSmallScreen] = useState(false);

  useEffect(() => {
    const foo = () => {
      const isOnSmallScreen = window.matchMedia(
        `(max-width: ${screens.lg})`,
      ).matches;

      setIsOnSmallScreen(isOnSmallScreen);
    };

    window.addEventListener("resize", foo);

    // run once to setup initial values
    foo();

    return () => window.removeEventListener("resize", foo);
  }, []);

  return { isOnSmallScreen };
};
