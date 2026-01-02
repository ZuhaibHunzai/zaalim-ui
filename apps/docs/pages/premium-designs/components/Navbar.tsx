"use client";

import { useState } from "react";
import { Github, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Components", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Examples", href: "#" },
  { label: "Themes", href: "#" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 backdrop-blur-md bg-white/80 border-b border-slate-300/20"></div>

      <div className="relative mx-4 mt-4">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
                <span className="text-teal-700 font-bold text-sm">Z</span>
              </div>
              <span className="font-bold text-lg text-slate-900">
                Zaalim UI
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-cyan-100/50 transition-colors text-slate-500 hover:text-slate-900"
              >
                <Github className="w-5 h-5" />
              </a>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 bg-cyan-500 text-teal-700 hover:bg-cyan-400 h-9 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cyan-100/50 transition-colors text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-slate-300/20">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-cyan-100/50 transition-colors text-slate-500 hover:text-slate-900"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 bg-cyan-500 text-teal-700 hover:bg-cyan-400 h-9 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
