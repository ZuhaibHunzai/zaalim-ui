"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Check, Github } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @zaalim/ui");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4 bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main cyan glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[630px] bg-gradient-to-b from-cyan-500/25 via-cyan-500/10 to-transparent rounded-full blur-3xl"
        />
        {/* Purple accent glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-cyan-500/30 text-sm text-cyan-600 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Now with 100+ components
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground"
        >
          Build Beautiful UIs
          <br />
          <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Without the Hassle
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          A comprehensive React component library with stunning themes, full
          accessibility, and seamless customization. Free, open-source, and
          ready for production.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 shadow-lg hover:shadow-xl text-base px-8 py-4">
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 border border-border bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 hover:border-cyan-500/50 text-base px-8 py-4">
            <Github className="w-5 h-5" />
            Star on GitHub
          </button>
        </motion.div>

        {/* Install Command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
        >
          <code className="text-sm sm:text-base font-mono text-muted-foreground">
            <span className="text-cyan-500">$</span> npm install{" "}
            <span className="text-foreground">@zaalim-ui</span>
          </code>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-cyan-500"
          >
            {copied ? (
              <Check className="w-4 h-4 text-cyan-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-16 text-sm text-muted-foreground"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-500 mb-1">100+</div>
            <div>Components</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-500 mb-1">6</div>
            <div>Themes</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-500 mb-1">5k+</div>
            <div>GitHub Stars</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
