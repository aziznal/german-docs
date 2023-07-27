"use client";

import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({});

export default function ThemeProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    if (media.matches) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}
