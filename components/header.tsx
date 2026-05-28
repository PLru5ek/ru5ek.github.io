"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";

interface HeaderProps {
  activeGenre: string;
  genres: { id: string; name: string }[];
  onGenreClick: (id: string) => void;
}

export function Header({ activeGenre, genres, onGenreClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Film className="h-5 w-5 text-primary" />
          </div>
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-semibold tracking-wide text-foreground">
            Cinema Canvas
          </span>
        </motion.div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {genres.map((genre, index) => (
              <motion.li
                key={genre.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <button
                  onClick={() => onGenreClick(genre.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeGenre === genre.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeGenre === genre.id && (
                    <motion.div
                      layoutId="activeGenre"
                      className="absolute inset-0 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{genre.name}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="font-mono text-xs tracking-wider uppercase">Explore</span>
          <span className="h-px w-8 bg-border" />
          <span className="font-mono text-xs">{genres.length} Genres</span>
        </motion.div>
      </div>
    </motion.header>
  );
}
