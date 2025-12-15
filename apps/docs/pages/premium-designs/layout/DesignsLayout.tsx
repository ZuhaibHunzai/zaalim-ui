// components/layout/PremiumDesignsLayout.tsx
import { ReactNode } from "react";
import { PremiumDesignsSidebar } from "./Sidebar";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

interface PremiumDesignsLayoutProps {
  children: ReactNode;
}

export const PremiumDesignsLayout = ({
  children,
}: PremiumDesignsLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Always visible */}
      <PremiumDesignsSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">{children}</div>
        <Footer />
      </main>
    </div>
  );
};
