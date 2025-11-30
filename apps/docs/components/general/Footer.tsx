"use client";

import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      section: "Resources",
      links: [
        { label: "Documentation", href: "/docs", external: false },
        { label: "Components", href: "/components", external: false },
        { label: "Examples", href: "/examples", external: false },
      ],
    },
    {
      section: "Community",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/zaalim/zaalim-ui",
          external: true,
        },
        {
          label: "Issues",
          href: "https://github.com/zaalim/zaalim-ui/issues",
          external: true,
        },
        {
          label: "Discussions",
          href: "https://github.com/zaalim/zaalim-ui/discussions",
          external: true,
        },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/zaalim", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/zaalim", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/zaalim",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/50 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-blue-700">
                <span className="text-xs font-bold text-white">Z</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                Zaalim UI
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open-source React UI component library with theme support and
              professional documentation.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <div key={column.section}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {column.section}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {currentYear} Zaalim UI. Open source and MIT licensed.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
