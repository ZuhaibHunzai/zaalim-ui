"use client";

import { motion } from "framer-motion";
import { Check, Github, Twitter, MessageCircle } from "lucide-react";

const themes = [
  {
    name: "Aurora",
    description: "Our signature cyan & purple theme",
    primary: "#4BE5D1",
    accent: "#9E7BFF",
    background: "hsl(var(--background))",
    isActive: true,
  },
  {
    name: "Ocean",
    description: "Deep blues inspired by the sea",
    primary: "#0EA5E9",
    accent: "#06B6D4",
    background: "hsl(var(--background))",
    isActive: false,
  },
  {
    name: "Amber",
    description: "Warm golden tones for comfort",
    primary: "#F59E0B",
    accent: "#DC2626",
    background: "hsl(var(--background))",
    isActive: false,
  },
  {
    name: "Rose",
    description: "Elegant pink and rose hues",
    primary: "#EC4899",
    accent: "#DB2777",
    background: "hsl(var(--background))",
    isActive: false,
  },
  {
    name: "Mint",
    description: "Fresh and calming green palette",
    primary: "#10B981",
    accent: "#059669",
    background: "hsl(var(--background))",
    isActive: false,
  },
  {
    name: "Sunset",
    description: "Vibrant orange to red gradient",
    primary: "#F97316",
    accent: "#EF4444",
    background: "hsl(var(--background))",
    isActive: false,
  },
];

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Components", href: "#components" },
    { label: "Themes", href: "#themes" },
  ],
  Resources: [
    { label: "Documentation", href: "#docs" },
    { label: "Examples", href: "#examples" },
    { label: "Blog", href: "#blog" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Support", href: "#support" },
  ],
};

export const ThemesShowcase = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden" id="themes">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-t from-cyan-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full backdrop-blur-md bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-500 mb-4">
            Themes
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Beautiful Themes,{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Zero Effort
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully crafted themes or create your own with a
            simple config file.
          </p>
        </motion.div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-card/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent}15)`,
                }}
              />

              <div className="relative p-6">
                {/* Color Preview */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                    }}
                  />
                  <div
                    className="w-8 h-8 rounded-lg border-2"
                    style={{
                      backgroundColor: theme.primary,
                      borderColor: theme.accent,
                    }}
                  />
                  <div
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>

                {/* Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ color: theme.primary }}
                    >
                      {theme.name}
                      {theme.isActive && (
                        <span
                          className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <Check className="w-3 h-3 text-background" />
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>
                </div>

                {/* Sample UI Preview */}
                <div className="mt-4 p-4 rounded-xl border border-cyan-500/20 bg-background/50 space-y-3">
                  <div
                    className="h-8 rounded-lg text-xs font-medium flex items-center justify-center text-background"
                    style={{
                      background: `linear-gradient(to right, ${theme.primary}, ${theme.accent})`,
                    }}
                  >
                    Primary Button
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="flex-1 h-6 rounded"
                      style={{ backgroundColor: `${theme.primary}30` }}
                    />
                    <div
                      className="w-16 h-6 rounded"
                      style={{ backgroundColor: `${theme.accent}30` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Theme Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center"
        >
          <p className="text-muted-foreground mb-2">
            Don't see your perfect theme?
          </p>
          <p className="text-foreground font-medium">
            Create your own by adding a simple{" "}
            <code className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-500 font-mono text-sm">
              theme.config.ts
            </code>{" "}
            file
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-cyan-500/20 py-16 px-4 bg-background/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-background font-bold text-sm">Z</span>
              </div>
              <span className="font-bold text-lg text-foreground">
                Zaalim UI
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              Build beautiful UIs without the hassle.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-cyan-500/10 transition-colors text-muted-foreground hover:text-cyan-500"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-cyan-500/10 transition-colors text-muted-foreground hover:text-cyan-500"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-cyan-500/10 transition-colors text-muted-foreground hover:text-cyan-500"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4 text-foreground">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-cyan-500/10">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zaalim UI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-cyan-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
