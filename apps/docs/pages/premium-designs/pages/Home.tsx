import { ThemeProvider, defaultTheme, darkTheme } from "zaalim-ui";
import { useState, useEffect } from "react";
import HeroSection from "../components/Hero";
import Features from "../components/Features";
import ComponentsShowcase from "../components/ComponentShowcase";
import { Footer } from "@/components/general/Footer";
import { Navbar } from "../components/Navbar";
import CodePreview from "../components/CodePreview";
import { CTA } from "../components/CTA";
import { ThemesShowcase } from "../components/ThemeShowCase";

export default function HomePage() {
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Wait until after client-side hydration to show theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

  // Prevent server-side rendering of themed content
  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          {/* Optional loading state */}
        </div>
      </main>
    );
  }

  return (
    <ThemeProvider value={currentTheme}>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <Features />
        <ComponentsShowcase />
        <ThemesShowcase />
        <CodePreview />
        <CTA />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
