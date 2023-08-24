"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "theme";

export const ThemeContext = createContext<{
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  currentTheme: "system",
  setTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

// Setting dark theme includes the following:
// - whether user explicitly selected anything, in which case:
//    * set the theme to whatever the user has explicitly selected
//
// - whether user preference is dark or light, in which case just use it

function isValidTheme(theme: string): theme is Theme {
  return theme === "dark" || theme === "light" || theme === "system";
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");

  // detect system theme and set it in context
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (!theme || !isValidTheme(theme)) {
      setCurrentTheme("system");
      return;
    }

    setCurrentTheme(theme);
  }, []);

  // update system theme when it changes
  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];

    switch (currentTheme) {
      case "dark":
        root.classList.add("dark");
        break;
      case "light":
        root.classList.remove("dark");
        break;
      case "system":
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        media.matches
          ? root.classList.add("dark")
          : root.classList.remove("light");
        break;
    }

    // store theme locally
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: currentTheme,
        setTheme: setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
