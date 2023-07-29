import { useEffect, useState } from "react";

/**
 * Returns whether the user is on MacOS, Windows or Linux
 */
export const useGetPlatform = () => {
  const [isMacos, setIsMacos] = useState(false);
  const [isWindows, setIsWindows] = useState(false);
  const [isLinux, setIsLinux] = useState(false);

  useEffect(() => {
    if (window.navigator.userAgent.toUpperCase().includes("WINDOWS"))
      setIsWindows(true);

    if (window.navigator.userAgent.toUpperCase().includes("MAC"))
      setIsMacos(true);

    if (
      window.navigator.userAgent.toUpperCase().includes("X11") ||
      window.navigator.userAgent.toUpperCase().includes("LINUX")
    )
      setIsLinux(true);
  }, []);

  return { isMacos, isWindows, isLinux };
};
