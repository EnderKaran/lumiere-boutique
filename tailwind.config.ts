import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lumiere: {
          beige: "#F9F5F1", // Genel arka plan kremi
          dark: "#332621",  // Koyu kahve metinler ve butonlar
          accent: "#A67C52", // Altın/Toprak tonu vurgular
          gray: "#717171",  // Yardımcı metinler
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
} satisfies Config;