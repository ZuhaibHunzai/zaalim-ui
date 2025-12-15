import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Github } from "lucide-react";

export const CTA = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-brand-500/15 via-brand-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-accent/10 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Ready to build something amazing?
          </span>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Start Building with <span className="text-gradient">Zaalim UI</span>{" "}
            Today
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of developers building beautiful applications. Free,
            open source, and ready for production.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:bg-brand-400 glow-md hover:glow-lg text-base px-8 py-4">
              Get Started Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary hover:text-primary text-base px-8 py-4">
              <BookOpen className="w-5 h-5" />
              Read the Docs
            </button>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              View Examples
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Join Discord
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
