"use client";

import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Search,
  Bell,
  Settings,
  User,
  Mail,
  Lock,
  Plus,
  Heart,
  Star,
  MoreHorizontal,
} from "lucide-react";

// ============================================
// COMPONENT SHOWCASE SECTION
// ============================================
const ComponentsShowcase = () => {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6"
      id="components"
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
            Components
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Beautiful, <span className="text-gradient">Ready-to-Use</span>{" "}
            Components
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-5xl sm:max-w-2xl mx-auto">
            From simple buttons to complex data tables. Every component is
            designed with attention to detail and accessibility in mind.
          </p>
        </motion.div>

        {/* Components Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Buttons Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl glass-strong"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
              Buttons
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:bg-brand-400 glow-sm hover:glow-md h-9 sm:h-10 px-3 sm:px-4 md:px-5">
                  Primary
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 sm:h-10 px-3 sm:px-4 md:px-5">
                  Secondary
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border border-border bg-transparent text-foreground hover:bg-secondary hover:border-border-hover h-9 sm:h-10 px-3 sm:px-4 md:px-5">
                  Outline
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-secondary hover:text-foreground h-9 sm:h-10 px-3 sm:px-4 md:px-5 text-muted-foreground">
                  Ghost
                </button>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 bg-accent text-accent-foreground hover:bg-accent/90 glow-accent h-9 sm:h-10 px-3 sm:px-4 md:px-5">
                  Accent
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 sm:h-10 px-3 sm:px-4 md:px-5">
                  Destructive
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 bg-primary/10 text-primary hover:bg-primary/20 h-9 sm:h-10 px-3 sm:px-4 md:px-5">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  With Icon
                </button>
              </div>
            </div>
          </motion.div>

          {/* Inputs Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl glass-strong"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent" />
              Inputs
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search components..."
                  className="w-full h-9 sm:h-10 pl-8 md:pl-10 pr-3 md:pr-4 rounded-lg border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="relative">
                  <Mail className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-9 sm:h-10 pl-8 md:pl-10 pr-3 md:pr-4 rounded-lg border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-sm"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-9 sm:h-10 pl-8 md:pl-10 pr-3 md:pr-4 rounded-lg border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>
              <div className="relative">
                <select className="w-full h-9 sm:h-10 px-3 md:px-4 rounded-lg border border-border bg-secondary/50 text-foreground focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer text-sm">
                  <option>Select a theme...</option>
                  <option>Aurora</option>
                  <option>Ember</option>
                  <option>Ocean</option>
                </select>
                <ChevronDown className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Cards Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl glass-strong"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-success" />
              Cards
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* User Card */}
              <div className="flex-1 p-3 sm:p-4 rounded-lg md:rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm">
                    JD
                  </div>
                  <div>
                    <div className="font-medium text-xs sm:text-sm">
                      John Doe
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Developer
                    </div>
                  </div>
                </div>
                <button className="w-full h-7 sm:h-8 rounded-lg bg-primary/10 text-primary text-xs sm:text-sm font-medium hover:bg-primary/20 transition-colors">
                  Follow
                </button>
              </div>

              {/* Stats Card */}
              <div className="flex-1 p-3 sm:p-4 rounded-lg md:rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Downloads
                  </span>
                  <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-success/10 text-success">
                    +12%
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold mb-1">24.5k</div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Avatars & Badges Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl glass-strong"
          >
            <h3 className="text-base sm:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-warning" />
              Avatars & Badges
            </h3>
            <div className="space-y-4 md:space-y-6">
              {/* Avatars */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex -space-x-2 sm:-space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm border-2 border-background">
                    A
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-accent to-destructive flex items-center justify-center text-accent-foreground font-semibold text-xs sm:text-sm border-2 border-background">
                    B
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-success to-info flex items-center justify-center text-white font-semibold text-xs sm:text-sm border-2 border-background">
                    C
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground font-semibold text-xs sm:text-sm border-2 border-background">
                    +5
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  8 contributors
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  React
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  TypeScript
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  Accessible
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                  New
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-info/10 text-info">
                  v2.0
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">128</span>
                </button>
                <button className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-warning">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">42</span>
                </button>
                <button className="p-1 sm:p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                  <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* More Components Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
          >
            <span>View all 100+ components</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-[-90deg]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentsShowcase;
