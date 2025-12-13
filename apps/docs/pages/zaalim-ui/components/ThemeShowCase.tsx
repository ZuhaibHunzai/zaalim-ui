"use client";

import { motion } from "framer-motion";
import { Check, Copy, Github, Twitter, MessageCircle } from "lucide-react";
import { useState } from "react";
import { footerLinks, codeExample, themeConfigCode } from "./data";

const themes = [
  {
    name: "Aurora",
    description: "Our signature cyan & purple theme",
    primary: "#4BE5D1",
    accent: "#9E7BFF",
    background: "#0A0F12",
    isActive: true,
  },
  {
    name: "Ember",
    description: "Warm orange & coral vibes",
    primary: "#FF6B35",
    accent: "#FFB347",
    background: "#0F0A0A",
  },
  {
    name: "Ocean",
    description: "Deep blue & teal harmony",
    primary: "#0EA5E9",
    accent: "#14B8A6",
    background: "#0A0F14",
  },
  {
    name: "Rose",
    description: "Elegant pink & purple blend",
    primary: "#F43F5E",
    accent: "#E879F9",
    background: "#0F0A0D",
  },
  {
    name: "Mint",
    description: "Fresh green & lime combo",
    primary: "#22C55E",
    accent: "#84CC16",
    background: "#0A0F0C",
  },
  {
    name: "Sunset",
    description: "Golden amber & warm hues",
    primary: "#F59E0B",
    accent: "#EF4444",
    background: "#0F0D0A",
  },
];

// ============================================
// THEMES SHOWCASE SECTION
// ============================================
export const ThemesShowcase = () => {
  const [selectedTheme, setSelectedTheme] = useState(0);

  return (
    <section className="relative py-32 px-4 overflow-hidden" id="themes">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-radial from-brand-500/10 to-transparent" />
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
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary mb-4">
            Themes
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Beautiful Themes, <span className="text-gradient">Zero Effort</span>
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
              className="group relative rounded-2xl overflow-hidden"
              style={{ background: theme.background }}
            >
              {/* Gradient border effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}20, ${theme.accent}20)`,
                }}
              />

              {/* Border */}
              <div
                className="absolute inset-0 rounded-2xl border transition-colors duration-300"
                style={{
                  borderColor: theme.isActive
                    ? theme.primary
                    : "hsl(var(--border))",
                }}
              />

              <div className="relative p-6">
                {/* Color Preview */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl"
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
                      style={{
                        color: theme.isActive ? theme.primary : undefined,
                      }}
                    >
                      {theme.name}
                      {theme.isActive && (
                        <span
                          className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: theme.background }}
                          />
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>
                </div>

                {/* Sample UI Preview */}
                <div className="mt-4 p-4 rounded-xl border border-border/50 bg-background/50 space-y-3">
                  <div
                    className="h-8 rounded-lg text-xs font-medium flex items-center justify-center"
                    style={{
                      backgroundColor: theme.primary,
                      color: theme.background,
                    }}
                  >
                    Primary Button
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-6 rounded bg-muted/50" />
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl glass-strong text-center"
        >
          <p className="text-muted-foreground mb-2">
            Don't see your perfect theme?
          </p>
          <p className="text-foreground font-medium">
            Create your own by adding a simple{" "}
            <code className="px-2 py-1 rounded bg-primary/10 text-primary font-mono text-sm">
              theme.config.ts
            </code>{" "}
            file
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER SECTION
// ============================================
const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  Z
                </span>
              </div>
              <span className="font-bold text-lg">Zaalim UI</span>
            </a>
            <p className="text-sm text-muted-foreground mb-4">
              Build beautiful UIs without the hassle.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zaalim UI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
