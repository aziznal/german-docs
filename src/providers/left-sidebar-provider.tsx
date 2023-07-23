"use client";

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
}>({
  isLeftSidebarOpen: false,
  toggleSidebar: () => {},
});

export const useLeftSidebarState = () => useContext(LeftSidebarStateContext);

export default function LeftSidebarStateProvider({ children }: PropsWithChildren) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);

  // check screen size on first load to determine whether to keep sidebar open
  useEffect(() => {
    setIsLeftSidebarOpen(window.innerWidth > 1024);
  }, []);

  // close self when screen size is less that lg
  useEffect(() => {
    function changeToggleState() {
      setIsLeftSidebarOpen(window.innerWidth > 1024);
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
      }}
    >
      {children}
    </LeftSidebarStateContext.Provider>
  );
}
