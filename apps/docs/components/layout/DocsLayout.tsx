import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { QuickLinks } from "./QuickLinks";
import { ThemeProvider, defaultTheme } from "zaalim-ui";
import { Header } from "../general/Header";
import { Footer } from "../general/Footer";

interface DocsLayoutProps {
  children: ReactNode;
}

export const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <ThemeProvider value={defaultTheme}>
      <Header />
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content - Centered with margins for both sidebars */}
        <main className="flex-1 mx-64">
          {" "}
          {/* Changed ml-64 to mx-64 for both sides */}
          <div className="max-w-4xl mx-auto p-8">{children}</div>
        </main>

        {/* Right Quick Links Sidebar */}
        <QuickLinks />
      </div>
      <Footer />
    </ThemeProvider>
  );
};
