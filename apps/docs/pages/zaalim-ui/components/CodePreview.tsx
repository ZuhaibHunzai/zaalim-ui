"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { codeExample, themeConfigCode } from "./data";

const CodePreview = () => {
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedTheme, setCopiedTheme] = useState(false);

  function highlightSyntax(line: string): string {
    return line
      .replace(
        /(import|export|from|default|const|return|function)/g,
        '<span style="color: hsl(259 100% 74%)">$1</span>'
      )
      .replace(
        /('[@\w\/.-]+')/g,
        '<span style="color: hsl(142 71% 45%)">$1</span>'
      )
      .replace(
        /("[@\w\/.-]+")/g,
        '<span style="color: hsl(142 71% 45%)">$1</span>'
      )
      .replace(
        /(#[A-Fa-f0-9]{6})/g,
        '<span style="color: hsl(43 96% 56%)">$1</span>'
      )
      .replace(/(\/\/.*)/g, '<span style="color: hsl(200 15% 55%)">$1</span>')
      .replace(
        /(\{|\}|\(|\))/g,
        '<span style="color: hsl(200 15% 55%)">$1</span>'
      )
      .replace(
        /(className|variant|src|fallback|size|colors|brand|accent)/g,
        '<span style="color: hsl(168 76% 60%)">$1</span>'
      );
  }

  const handleCopy = (code: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6"
      id="code"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 lg:mb-20 px-2"
        >
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full glass text-xs md:text-sm text-primary mb-3 md:mb-4">
            Developer Experience
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Write Less, <span className="text-gradient">Ship More</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-5xl sm:max-w-2xl mx-auto">
            Clean, intuitive APIs that feel natural. No learning curve, just
            productivity.
          </p>
        </motion.div>

        {/* Code Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Main Example */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="rounded-xl md:rounded-2xl glass-strong overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-border/50">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-warning/60" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono truncate ml-2">
                  ProfileCard.tsx
                </span>
                <button
                  onClick={() => handleCopy(codeExample, setCopiedMain)}
                  className="p-1 md:p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground ml-2"
                >
                  {copiedMain ? (
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  )}
                </button>
              </div>

              {/* Code */}
              <pre className="p-3 md:p-4 overflow-x-auto text-xs md:text-sm">
                <code className="font-mono">
                  {codeExample.split("\n").map((line, i) => (
                    <div key={i} className="leading-relaxed">
                      <span className="text-muted-foreground/50 mr-3 md:mr-4 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightSyntax(line),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
            <div className="absolute -bottom-2 md:-bottom-4 left-2 right-2 md:left-4 md:right-4 h-6 md:h-8 bg-gradient-radial from-primary/20 to-transparent blur-xl md:blur-2xl" />
          </motion.div>

          {/* Theme Config Example */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="rounded-xl md:rounded-2xl glass-strong overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-border/50">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-warning/60" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono truncate ml-2">
                  theme.config.ts
                </span>
                <button
                  onClick={() => handleCopy(themeConfigCode, setCopiedTheme)}
                  className="p-1 md:p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground ml-2"
                >
                  {copiedTheme ? (
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  )}
                </button>
              </div>

              {/* Code */}
              <pre className="p-3 md:p-4 overflow-x-auto text-xs md:text-sm">
                <code className="font-mono">
                  {themeConfigCode.split("\n").map((line, i) => (
                    <div key={i} className="leading-relaxed">
                      <span className="text-muted-foreground/50 mr-3 md:mr-4 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightSyntax(line),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            <div className="absolute -bottom-2 md:-bottom-4 left-2 right-2 md:left-4 md:right-4 h-6 md:h-8 bg-gradient-radial from-accent/20 to-transparent blur-xl md:blur-2xl" />

            {/* Hint */}
            <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-lg md:rounded-xl border border-dashed border-border flex items-start md:items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
                <span className="text-lg md:text-xl">✨</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Define your brand colors once, and they automatically cascade to
                all 100+ components.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodePreview;
