// ZAALIM UI THEME TEMPLATE
// Copy this entire file and replace colors as needed

export interface ZaalimTheme {
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

// LIGHT THEME - Replace these colors
export const lightTheme: ZaalimTheme = {
  colors: {
    primary: "#3B82F6", // Change primary color
    secondary: "#6B7280", // Change secondary color
    accent: "#8B5CF6", // Change accent color
    background: "#FFFFFF", // Change background
    surface: "#F9FAFB", // Change surface color
    text: {
      primary: "#111827", // Change primary text
      secondary: "#6B7280", // Change secondary text
    },
  },
};

// DARK THEME - Replace these colors
export const darkTheme: ZaalimTheme = {
  colors: {
    primary: "#60A5FA", // Change primary for dark
    secondary: "#9CA3AF", // Change secondary for dark
    accent: "#A78BFA", // Change accent for dark
    background: "#111827", // Change dark background
    surface: "#1F2937", // Change dark surface
    text: {
      primary: "#F9FAFB", // Change dark text primary
      secondary: "#D1D5DB", // Change dark text secondary
    },
  },
};

// USAGE:
// 1. Copy this entire file
// 2. Replace colors as needed
// 3. Import in your app:
//    import { ThemeProvider } from 'zaalim-ui'
//    import { lightTheme, darkTheme } from './your-theme-file'
//
//    <ThemeProvider value={lightTheme}>
//      <YourApp />
//    </ThemeProvider>
