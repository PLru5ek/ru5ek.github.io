export interface Genre {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  accentColor: string;
  tropes: {
    icon: string;
    label: string;
  }[];
  masterpieces: {
    title: string;
    year: number;
    image: string;
    director: string;
  }[];
  arrival: {
    description: string;
    elements: string[];
  };
}

export const genres: Genre[] = [
  {
    id: "scifi",
    name: "Science Fiction",
    tagline: "Beyond the stars, beyond imagination",
    description: "Where technology meets philosophy, and the impossible becomes inevitable. Science fiction explores humanity's greatest fears and dreams through the lens of speculative futures.",
    color: "from-violet-900/40 via-purple-800/30 to-indigo-900/40",
    accentColor: "#a855f7",
    tropes: [
      { icon: "🚀", label: "Space Travel" },
      { icon: "🤖", label: "AI & Robots" },
      { icon: "⏰", label: "Time Travel" },
      { icon: "🧬", label: "Genetic Engineering" },
      { icon: "🌍", label: "Dystopian Worlds" },
      { icon: "👽", label: "Alien Life" }
    ],
    masterpieces: [
      { title: "Blade Runner 2049", year: 2017, image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&q=80", director: "Denis Villeneuve" },
      { title: "2001: A Space Odyssey", year: 1968, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80", director: "Stanley Kubrick" },
      { title: "Arrival", year: 2016, image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80", director: "Denis Villeneuve" }
    ],
    arrival: {
      description: "In science fiction, arrivals are cosmic events—massive ships descending through clouds, first contact protocols, the weight of interstellar communication.",
      elements: ["Alien spacecraft", "Landing sequences", "First contact", "Unknown technology"]
    }
  },
  {
    id: "noir",
    name: "Film Noir",
    tagline: "In shadows, truth finds its shape",
    description: "A world painted in shades of moral ambiguity, where rain-slicked streets reflect neon signs and every shadow hides a secret. Noir is cinema at its most existential.",
    color: "from-zinc-900/60 via-neutral-800/50 to-slate-900/60",
    accentColor: "#71717a",
    tropes: [
      { icon: "🔍", label: "Private Eyes" },
      { icon: "💋", label: "Femme Fatales" },
      { icon: "🌧️", label: "Rain & Shadows" },
      { icon: "🚬", label: "Cigarette Smoke" },
      { icon: "🎺", label: "Jazz Scores" },
      { icon: "🔫", label: "Crime & Betrayal" }
    ],
    masterpieces: [
      { title: "Chinatown", year: 1974, image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&q=80", director: "Roman Polanski" },
      { title: "Double Indemnity", year: 1944, image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&q=80", director: "Billy Wilder" },
      { title: "LA Confidential", year: 1997, image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=600&q=80", director: "Curtis Hanson" }
    ],
    arrival: {
      description: "Noir arrivals are intimate yet foreboding—a silhouette in a doorway, a stranger stepping off a train, the click of heels on wet pavement.",
      elements: ["Rain-soaked streets", "Trench coats", "Silhouettes", "Mysterious strangers"]
    }
  },
  {
    id: "horror",
    name: "Horror",
    tagline: "Fear is the oldest emotion",
    description: "The cinema of the visceral, where our deepest anxieties take physical form. Horror holds up a dark mirror to society, forcing us to confront what we dare not name.",
    color: "from-red-950/50 via-rose-900/40 to-red-900/50",
    accentColor: "#dc2626",
    tropes: [
      { icon: "👻", label: "Supernatural" },
      { icon: "🩸", label: "Body Horror" },
      { icon: "🏚️", label: "Haunted Spaces" },
      { icon: "🌙", label: "Night Settings" },
      { icon: "😱", label: "Jump Scares" },
      { icon: "🔪", label: "Final Girls" }
    ],
    masterpieces: [
      { title: "The Shining", year: 1980, image: "https://images.unsplash.com/photo-1509248961725-aec71f4e848e?w=600&q=80", director: "Stanley Kubrick" },
      { title: "Hereditary", year: 2018, image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80", director: "Ari Aster" },
      { title: "The Exorcist", year: 1973, image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&q=80", director: "William Friedkin" }
    ],
    arrival: {
      description: "Horror arrivals are dread incarnate—a car pulling up to an isolated location, a family inheriting a cursed property, something waking in the darkness.",
      elements: ["Isolated locations", "Ominous atmosphere", "Unsettling calm", "Hidden threats"]
    }
  },
  {
    id: "fantasy",
    name: "Fantasy",
    tagline: "Where magic breathes and legends live",
    description: "Realms of wonder where the impossible is everyday. Fantasy transports us to worlds where heroes rise, magic flows, and ancient prophecies shape destiny.",
    color: "from-cyan-900/40 via-teal-800/30 to-emerald-900/40",
    accentColor: "#14b8a6",
    tropes: [
      { icon: "🗡️", label: "Epic Quests" },
      { icon: "✨", label: "Magic Systems" },
      { icon: "🐉", label: "Mythical Creatures" },
      { icon: "👑", label: "Royalty & Courts" },
      { icon: "🏰", label: "Ancient Kingdoms" },
      { icon: "📜", label: "Prophecies" }
    ],
    masterpieces: [
      { title: "Pan's Labyrinth", year: 2006, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80", director: "Guillermo del Toro" },
      { title: "The Lord of the Rings", year: 2001, image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80", director: "Peter Jackson" },
      { title: "Princess Mononoke", year: 1997, image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&q=80", director: "Hayao Miyazaki" }
    ],
    arrival: {
      description: "Fantasy arrivals are mythic crossings—stepping through portals, discovering hidden worlds, the moment ordinary life gives way to the extraordinary.",
      elements: ["Portal crossings", "Mystical lands", "Prophetic signs", "Enchanted objects"]
    }
  },
  {
    id: "western",
    name: "Western",
    tagline: "Where the sun sets on civilization",
    description: "The American mythos rendered in dust and gunsmoke. Westerns explore the thin line between law and chaos, civilization and wilderness, honor and survival.",
    color: "from-amber-900/40 via-orange-800/30 to-yellow-900/40",
    accentColor: "#f59e0b",
    tropes: [
      { icon: "🤠", label: "Lone Heroes" },
      { icon: "🏜️", label: "Desert Landscapes" },
      { icon: "🐎", label: "Horseback Chases" },
      { icon: "🌅", label: "Sunset Duels" },
      { icon: "🏛️", label: "Frontier Towns" },
      { icon: "⚖️", label: "Frontier Justice" }
    ],
    masterpieces: [
      { title: "The Good, The Bad and The Ugly", year: 1966, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80", director: "Sergio Leone" },
      { title: "Unforgiven", year: 1992, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80", director: "Clint Eastwood" },
      { title: "No Country for Old Men", year: 2007, image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", director: "Coen Brothers" }
    ],
    arrival: {
      description: "Western arrivals are elemental—a rider emerging from heat shimmer, dusty boots on wooden planks, a stranger pushing through saloon doors.",
      elements: ["Dusty horizons", "Stranger in town", "Desert heat", "Weathered faces"]
    }
  },
  {
    id: "romance",
    name: "Romance",
    tagline: "Hearts collide, worlds transform",
    description: "The cinema of connection, where two souls navigate the beautiful chaos of love. Romance captures the electric tension of attraction and the profound vulnerability of opening one's heart.",
    color: "from-pink-900/40 via-rose-800/30 to-fuchsia-900/40",
    accentColor: "#ec4899",
    tropes: [
      { icon: "💕", label: "Meet Cutes" },
      { icon: "💔", label: "Star-Crossed Lovers" },
      { icon: "🌹", label: "Grand Gestures" },
      { icon: "🎭", label: "Mistaken Identity" },
      { icon: "✈️", label: "Airport Chases" },
      { icon: "💌", label: "Love Letters" }
    ],
    masterpieces: [
      { title: "In The Mood For Love", year: 2000, image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80", director: "Wong Kar-wai" },
      { title: "Before Sunrise", year: 1995, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", director: "Richard Linklater" },
      { title: "Casablanca", year: 1942, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", director: "Michael Curtiz" }
    ],
    arrival: {
      description: "Romance arrivals are charged with possibility—eyes meeting across a room, a chance encounter on a train, destiny disguised as coincidence.",
      elements: ["Fateful meetings", "Lingering glances", "Charged silence", "Beautiful settings"]
    }
  }
];

export const moodProfiles = [
  { genres: ["scifi", "noir"], pace: 0.3, atmosphere: 0.7 },
  { genres: ["horror"], pace: 0.4, atmosphere: 0.2 },
  { genres: ["fantasy", "romance"], pace: 0.5, atmosphere: 0.8 },
  { genres: ["western"], pace: 0.6, atmosphere: 0.4 },
];
