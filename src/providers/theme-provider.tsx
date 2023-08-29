"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Cookie from "js-cookie";
import { THEME_COOKIE_KEY } from "@/constants";

export type Theme = "light" | "dark";

export const ThemeContext = createContext<{
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  currentTheme: "light",
  setTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

// Setting dark theme includes the following:
// - whether user explicitly selected anything, in which case:
//    * set the theme to whatever the user has explicitly selected
//
// - whether user preference is dark or light, in which case just use it

function isValidTheme(theme: string | undefined): theme is Theme {
  return theme === "dark" || theme === "light";
}

export type ThemeProviderProps = PropsWithChildren & {
  initialTheme?: string;
};

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    isValidTheme(initialTheme) ? initialTheme : "light",
  );

  // detect system theme and set it in context
  useEffect(() => {
    const theme = Cookie.get(THEME_COOKIE_KEY);

    if (!theme || !isValidTheme(theme)) {
      setCurrentTheme("light");
      return;
    }

    setCurrentTheme(theme);
  }, [initialTheme]);

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
    }

    // store theme locally
    Cookie.set(THEME_COOKIE_KEY, currentTheme, { expires: 365 });
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
