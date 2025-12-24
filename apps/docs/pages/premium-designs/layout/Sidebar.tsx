// components/layout/PremiumDesignsSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const designLinks = [
  { href: "/premium-designs", label: "Get Started", isHome: true },
  { href: "/premium-designs/designs/Cards", label: "Cards", count: 10 },
  { href: "/premium-designs/designs/Buttons", label: "Buttons", count: 50 },
  { href: "/premium-designs/inputs", label: "Inputs", count: 6 },
  { href: "/premium-designs/badges", label: "Badges", count: 5 },
  { href: "/premium-designs/designs/Avatars", label: "Avatars", count: 20 },
];

export const PremiumDesignsSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background overflow-y-auto">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h2 className="font-semibold">Premium Designs</h2>
              <p className="text-xs text-muted-foreground">Zaalim UI</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Browse Designs
          </h3>

          <div className="space-y-1">
            {designLinks.map((link) => {
              const isActive = link.isHome
                ? pathname === "/premium-designs"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span>{link.label}</span>

                  {link.count && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Divider */}
        <div className="my-6 h-px bg-border" />

        {/* Quick Info */}
        <div className="p-3 bg-secondary/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            All designs are built with Zaalim UI components and are fully
            responsive.
          </p>
        </div>
      </div>
    </aside>
  );
};
