"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { GenreExplorer } from "@/components/genre-explorer";
import { AnatomyTimeline } from "@/components/anatomy-timeline";
import { MoodMixer } from "@/components/mood-mixer";
import { genres } from "@/lib/genre-data";

export default function CinemaCanvas() {
  const [activeGenreId, setActiveGenreId] = useState("scifi");

  const activeGenre = genres.find((g) => g.id === activeGenreId) || genres[0];

  const handleGenreSelect = useCallback((id: string) => {
    setActiveGenreId(id);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setActiveGenreId(id);
    const element = document.getElementById("genre-explorer");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      {/* Fixed ambient background that changes with genre */}
      <div
        className="fixed inset-0 transition-all duration-1000 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${activeGenre.accentColor}08, transparent 40%),
            radial-gradient(circle at 80% 80%, ${activeGenre.accentColor}05, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.5), transparent 100%)
          `,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Header
        activeGenre={activeGenreId}
        genres={genres.map((g) => ({ id: g.id, name: g.name }))}
        onGenreClick={scrollToSection}
      />

      <HeroSection
        genres={genres}
        activeGenre={activeGenre}
        onGenreSelect={handleGenreSelect}
      />

      <GenreExplorer
        genres={genres}
        activeGenre={activeGenre}
        onGenreSelect={handleGenreSelect}
      />

      <AnatomyTimeline genres={genres} />

      <MoodMixer genres={genres} />

      {/* Closing section */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
            The End
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-8">
            Every Frame Tells a Story
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Cinema is the art of turning light into emotion. Each genre is a lens 
            through which we explore different facets of the human experience. 
            Keep exploring, keep watching, keep feeling.
          </p>
          
          {/* Decorative element */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>
      </section>
    </motion.main>
  );
}
