"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import type { Genre } from "@/lib/genre-data";

interface MoodMixerProps {
  genres: Genre[];
}

export function MoodMixer({ genres }: MoodMixerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  
  const [pace, setPace] = useState(50);
  const [atmosphere, setAtmosphere] = useState(50);
  const [intensity, setIntensity] = useState(50);

  // Calculate which genres match the current mood profile
  const matchedGenres = useMemo(() => {
    const profiles: Record<string, { pace: [number, number]; atmosphere: [number, number]; intensity: [number, number] }> = {
      scifi: { pace: [20, 60], atmosphere: [50, 100], intensity: [40, 80] },
      noir: { pace: [10, 50], atmosphere: [20, 60], intensity: [30, 70] },
      horror: { pace: [30, 80], atmosphere: [0, 40], intensity: [60, 100] },
      fantasy: { pace: [30, 70], atmosphere: [60, 100], intensity: [40, 90] },
      western: { pace: [20, 70], atmosphere: [30, 70], intensity: [40, 80] },
      romance: { pace: [10, 50], atmosphere: [60, 100], intensity: [20, 60] },
    };

    return genres.map((genre) => {
      const profile = profiles[genre.id];
      if (!profile) return { genre, score: 0 };

      const paceMatch = pace >= profile.pace[0] && pace <= profile.pace[1];
      const atmosphereMatch = atmosphere >= profile.atmosphere[0] && atmosphere <= profile.atmosphere[1];
      const intensityMatch = intensity >= profile.intensity[0] && intensity <= profile.intensity[1];

      let score = 0;
      if (paceMatch) score += 33;
      if (atmosphereMatch) score += 33;
      if (intensityMatch) score += 34;

      return { genre, score };
    }).sort((a, b) => b.score - a.score);
  }, [genres, pace, atmosphere, intensity]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-6xl relative">
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
            Interactive Experience
          </motion.span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-balance">
            Cinematic <span className="text-primary">Mood Mixer</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Adjust the sliders to discover which genres match your current mood. 
            Find the perfect cinematic experience for your emotional state.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-12"
          >
            {/* Pace slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  Pace
                </label>
                <span className="text-sm text-primary font-mono">{pace}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-24">Slow Burn</span>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={pace}
                    onChange={(e) => setPace(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pace}%, var(--secondary) ${pace}%, var(--secondary) 100%)`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-24 text-right">High Octane</span>
              </div>
            </div>

            {/* Atmosphere slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  Atmosphere
                </label>
                <span className="text-sm text-primary font-mono">{atmosphere}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-24">Gritty</span>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={atmosphere}
                    onChange={(e) => setAtmosphere(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${atmosphere}%, var(--secondary) ${atmosphere}%, var(--secondary) 100%)`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-24 text-right">Ethereal</span>
              </div>
            </div>

            {/* Intensity slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  Intensity
                </label>
                <span className="text-sm text-primary font-mono">{intensity}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-24">Contemplative</span>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, var(--chart-2) 0%, var(--chart-2) ${intensity}%, var(--secondary) ${intensity}%, var(--secondary) 100%)`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-24 text-right">Visceral</span>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
              Your Genre Match
            </h3>
            <div className="space-y-4">
              {matchedGenres.map(({ genre, score }, index) => (
                <motion.div
                  key={genre.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="relative p-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
                >
                  {/* Score bar background */}
                  <motion.div
                    className="absolute inset-0 origin-left"
                    style={{
                      backgroundColor: `${genre.accentColor}15`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: score / 100 }}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: genre.accentColor }}
                      />
                      <span className="font-medium">{genre.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-mono"
                        style={{ color: genre.accentColor }}
                      >
                        {score}%
                      </span>
                      {index === 0 && score > 60 && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-2 py-1 rounded-full text-xs font-mono uppercase"
                          style={{
                            backgroundColor: `${genre.accentColor}20`,
                            color: genre.accentColor,
                          }}
                        >
                          Best Match
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--foreground);
          cursor: pointer;
          border: 3px solid var(--background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--foreground);
          cursor: pointer;
          border: 3px solid var(--background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s;
        }
      `}</style>
    </section>
  );
}
