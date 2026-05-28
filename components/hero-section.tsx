"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { Genre } from "@/lib/genre-data";

interface HeroSectionProps {
  genres: Genre[];
  activeGenre: Genre;
  onGenreSelect: (id: string) => void;
}

export function HeroSection({ genres, activeGenre, onGenreSelect }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titleChars = "THE CINEMA CANVAS".split("");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${activeGenre.color} transition-all duration-1000`}
        style={{ y }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              backgroundColor: activeGenre.accentColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="relative z-10 text-center">
        {/* Eyebrow text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground"
        >
          An Interactive Exploration
        </motion.p>

        {/* Main title with character animation */}
        <h1 className="mb-8 font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
          {titleChars.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8 + index * 0.04,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
              style={{ color: char === " " ? "transparent" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Journey through the visual language of cinema. Discover how different genres
          shape our emotions, fears, and dreams through the art of storytelling.
        </motion.p>

        {/* Genre carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {genres.map((genre, index) => (
            <motion.button
              key={genre.id}
              onClick={() => onGenreSelect(genre.id)}
              className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-500 ${
                activeGenre.id === genre.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
            >
              {/* Background for active/hover state */}
              <motion.div
                className="absolute inset-0 rounded-full border transition-all duration-500"
                style={{
                  borderColor:
                    activeGenre.id === genre.id
                      ? genre.accentColor
                      : "rgba(255,255,255,0.1)",
                  backgroundColor:
                    activeGenre.id === genre.id
                      ? `${genre.accentColor}15`
                      : "transparent",
                }}
              />
              
              {/* Glow effect */}
              {activeGenre.id === genre.id && (
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ backgroundColor: `${genre.accentColor}20` }}
                  layoutId="genreGlow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <span className="relative z-10">{genre.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll to Explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
