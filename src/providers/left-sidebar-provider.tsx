"use client";

import { useTailwindBreakpoints } from "@/hooks/breakpoints";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const LeftSidebarStateContext = createContext<{
  isLeftSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}>({
  isLeftSidebarOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export const useLeftSidebarState = () => useContext(LeftSidebarStateContext);

export default function LeftSidebarStateProvider({
  children,
}: PropsWithChildren) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);

  const { isOnSmallScreen } = useTailwindBreakpoints();

  // check screen size on first load to determine whether to keep sidebar open
  useEffect(() => {
    setIsLeftSidebarOpen(window.innerWidth > 1024);
  }, []);

  // close self when screen size is less that lg
  useEffect(() => {
    function changeToggleState() {
      if (isOnSmallScreen) setIsLeftSidebarOpen(false);
    }

    window.addEventListener("resize", (_event) => changeToggleState());

    return () =>
      window.removeEventListener("resize", (_event) => changeToggleState());
  });

  return (
    <LeftSidebarStateContext.Provider
      value={{
        isLeftSidebarOpen,
        toggleSidebar: () => setIsLeftSidebarOpen((val) => !val),
        closeSidebar: () => setIsLeftSidebarOpen(false),
      }}
    >
      {children}
    </LeftSidebarStateContext.Provider>
  );
}
