"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { Genre } from "@/lib/genre-data";

interface AnatomyTimelineProps {
  genres: Genre[];
}

export function AnatomyTimeline({ genres }: AnatomyTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const [activeNode, setActiveNode] = useState<string>("scifi");

  const activeGenre = genres.find((g) => g.id === activeNode) || genres[0];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(168,85,247,0.05),transparent_50%)]" />

      <div className="mx-auto max-w-7xl relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.span
            className="inline-block mb-4 font-mono text-xs tracking-[0.3em] uppercase text-primary"
          >
            Interactive Study
          </motion.span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            The Anatomy of <span className="text-primary">The Arrival</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Every genre has its own visual vocabulary for introducing characters, 
            settings, and atmosphere. Explore how different genres interpret the 
            same fundamental moment.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          {/* Horizontal timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          {/* Timeline nodes */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative">
            {genres.slice(0, 5).map((genre, index) => (
              <motion.button
                key={genre.id}
                onClick={() => setActiveNode(genre.id)}
                className="group relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Node circle */}
                <motion.div
                  className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    activeNode === genre.id
                      ? "border-transparent"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  style={{
                    backgroundColor:
                      activeNode === genre.id
                        ? `${genre.accentColor}20`
                        : "transparent",
                    borderColor:
                      activeNode === genre.id ? genre.accentColor : undefined,
                  }}
                >
                  {/* Active glow */}
                  {activeNode === genre.id && (
                    <motion.div
                      layoutId="timelineGlow"
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: `0 0 30px ${genre.accentColor}40`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Inner dot */}
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        activeNode === genre.id
                          ? genre.accentColor
                          : "var(--muted-foreground)",
                    }}
                    animate={{
                      scale: activeNode === genre.id ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: activeNode === genre.id ? Infinity : 0,
                    }}
                  />
                </motion.div>

                {/* Label */}
                <span
                  className={`mt-4 text-sm font-medium transition-colors duration-300 ${
                    activeNode === genre.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {genre.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="mt-16 p-8 md:p-12 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm"
              style={{
                boxShadow: `0 0 60px ${activeGenre.accentColor}10`,
              }}
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Description */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-light mb-6"
                  >
                    How{" "}
                    <span style={{ color: activeGenre.accentColor }}>
                      {activeGenre.name}
                    </span>{" "}
                    Handles Arrivals
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground leading-relaxed text-lg"
                  >
                    {activeGenre.arrival.description}
                  </motion.p>
                </div>

                {/* Elements */}
                <div>
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6"
                  >
                    Key Visual Elements
                  </motion.h4>
                  <div className="grid grid-cols-2 gap-4">
                    {activeGenre.arrival.elements.map((element, index) => (
                      <motion.div
                        key={element}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-background/50"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: activeGenre.accentColor }}
                        />
                        <span className="text-sm">{element}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
