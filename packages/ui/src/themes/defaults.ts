export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
}

export const defaultTheme: Theme = {
  colors: {
    primary: "#3B82F6",
    secondary: "#6B7280",
    accent: "#8B5CF6",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#60A5FA",
    secondary: "#9CA3AF",
    accent: "#A78BFA",
    background: "#111827",
    surface: "#1F2937",
    text: {
      primary: "#F9FAFB",
      secondary: "#D1D5DB",
    },
  },
};
