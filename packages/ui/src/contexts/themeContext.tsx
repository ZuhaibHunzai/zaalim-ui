"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Theme, defaultTheme } from "../themes/defaults";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  value?: Theme;
}

export function ThemeProvider({
  children,
  value = defaultTheme,
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(value);

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, setTheme: setCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
