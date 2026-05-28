"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Genre } from "@/lib/genre-data";

interface GenreExplorerProps {
  genres: Genre[];
  activeGenre: Genre;
  onGenreSelect: (id: string) => void;
}

export function GenreExplorer({ genres, activeGenre, onGenreSelect }: GenreExplorerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="genre-explorer"
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background ambient glow */}
      <motion.div
        className={`fixed inset-0 bg-gradient-to-br ${activeGenre.color} opacity-30 transition-all duration-1000 pointer-events-none`}
        style={{ zIndex: -1 }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.span
            className="inline-block mb-4 font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: activeGenre.accentColor }}
          >
            Genre Explorer
          </motion.span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            Discover the Language of{" "}
            <span className="relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeGenre.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{ color: activeGenre.accentColor }}
                  className="inline-block"
                >
                  {activeGenre.name}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
        </motion.div>

        {/* Genre selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onGenreSelect(genre.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeGenre.id === genre.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeGenre.id === genre.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: genre.accentColor,
                    backgroundColor: `${genre.accentColor}15`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{genre.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Main content grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGenre.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Left column - Genre info */}
            <div className="space-y-10">
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl italic text-muted-foreground"
              >
                &ldquo;{activeGenre.tagline}&rdquo;
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {activeGenre.description}
              </motion.p>

              {/* Visual Tropes */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                  Visual Tropes
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {activeGenre.tropes.map((trope, index) => (
                    <motion.div
                      key={trope.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group relative p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-border transition-all duration-300 cursor-default"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: activeGenre.accentColor,
                      }}
                    >
                      <span className="text-2xl mb-2 block">{trope.icon}</span>
                      <span className="text-xs text-muted-foreground">{trope.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column - Masterpiece Showcase */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                Masterpiece Showcase
              </h3>
              <div className="grid gap-6">
                {activeGenre.masterpieces.map((film, index) => (
                  <motion.div
                    key={film.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.15 }}
                    className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    onMouseEnter={() => setHoveredCard(film.title)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-center gap-6 p-4">
                      {/* Image */}
                      <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={film.image}
                          alt={film.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to top, ${activeGenre.accentColor}30, transparent)`,
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredCard === film.title ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h4 className="font-[family-name:var(--font-cormorant)] text-xl font-medium mb-1 group-hover:text-foreground transition-colors">
                          {film.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">{film.director}</p>
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-mono"
                          style={{
                            backgroundColor: `${activeGenre.accentColor}15`,
                            color: activeGenre.accentColor,
                          }}
                        >
                          {film.year}
                        </span>
                      </div>

                      {/* Hover indicator */}
                      <motion.div
                        className="w-1 h-16 rounded-full"
                        style={{ backgroundColor: activeGenre.accentColor }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: hoveredCard === film.title ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
