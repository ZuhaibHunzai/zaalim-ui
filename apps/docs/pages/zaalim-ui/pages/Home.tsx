import { ThemeProvider, defaultTheme, darkTheme } from "zaalim-ui";
import { useState } from "react";
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
  const currentTheme = activeTheme === "light" ? defaultTheme : darkTheme;

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
