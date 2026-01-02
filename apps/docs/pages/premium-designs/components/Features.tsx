"use client";

import { motion } from "framer-motion";
import { features } from "./data";

const Features = () => {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      id="features"
    >
      <div className="absolute top-0 left-0 md:left-1/4 w-full md:w-[300px] lg:w-[500px] h-[200px] md:h-[400px] lg:h-[500px] bg-gradient-radial from-cyan-500/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 text-xs md:text-sm text-cyan-600 mb-3 md:mb-4">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4 text-foreground">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Build Fast
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Zaalim UI provides all the building blocks you need to create
            beautiful, accessible, and performant user interfaces.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-2 sm:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl bg-card/50 backdrop-blur-sm border border-cyan-500/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:from-cyan-500/30 group-hover:to-purple-500/20 transition-all duration-300">
                <feature.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-cyan-600 dark:text-cyan-400" />
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed sm:leading-normal">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
