import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        glow: {
          orange: "#ff6b35",
          pink: "#f72585",
          violet: "#7209b7",
          teal: "#06d6a0",
          lime: "#b5e48c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-space-grotesk)", "sans-serif"],
        hero: ["var(--font-orbitron)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-mesh": "var(--gradient-mesh)",
        "gradient-hero": "linear-gradient(135deg, var(--glow-orange) 0%, var(--glow-pink) 50%, var(--glow-violet) 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px var(--glow-orange)" },
          "50%": { opacity: "0.9", boxShadow: "0 0 40px var(--glow-pink)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        glow: "0 0 20px rgba(255, 107, 53, 0.3)",
        "glow-pink": "0 0 30px rgba(247, 37, 133, 0.4)",
        "glow-green": "0 0 20px rgba(6, 214, 160, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
