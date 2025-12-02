// ============================================
// ZAALIM UI - USER THEME TEMPLATE
// ============================================
// Copy and replace ALL colors below with your theme colors
// Then import and use in your app

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

// === LIGHT THEME ===
// Replace ALL these colors with your light theme colors
export const userLightTheme: Theme = {
  colors: {
    primary: "#3B82F6", // Your primary brand color
    secondary: "#6B7280", // Your secondary color
    accent: "#8B5CF6", // Your accent color (for highlights)
    background: "#FFFFFF", // Your background color
    surface: "#F9FAFB", // Your surface color (cards, modals)
    text: {
      primary: "#111827", // Your primary text color
      secondary: "#6B7280", // Your secondary text color
    },
  },
};

// === DARK THEME ===
// Replace ALL these colors with your dark theme colors
export const userDarkTheme: Theme = {
  colors: {
    primary: "#60A5FA", // Your dark theme primary color
    secondary: "#9CA3AF", // Your dark theme secondary color
    accent: "#A78BFA", // Your dark theme accent color
    background: "#111827", // Your dark background color
    surface: "#1F2937", // Your dark surface color
    text: {
      primary: "#F9FAFB", // Your dark primary text color
      secondary: "#D1D5DB", // Your dark secondary text color
    },
  },
};

// ============================================
// USAGE INSTRUCTIONS:
// ============================================
// 1. Copy this entire file
// 2. Replace ALL color values with your theme colors
// 3. Save as `my-theme.ts` in your project
// 4. Import and use in your app:
//
//    import { ThemeProvider } from 'zaalim-ui'
//    import { userLightTheme } from './my-theme'
//
//    function App() {
//      return (
//        <ThemeProvider value={userLightTheme}>
//          <YourComponents />
//        </ThemeProvider>
//      )
//    }
//
// 5. For dark mode, use `userDarkTheme`
// ============================================
