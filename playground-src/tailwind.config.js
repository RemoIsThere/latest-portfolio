/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        primary: "#6366F1",
        accent: "#22c55e",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50%))" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "bg-pan": {
          "0%": { "background-position": "0% 0%" },
          "100%": { "background-position": "100% 100%" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "bg-pan": "bg-pan 3s linear infinite",
      },
    },
  },
  plugins: [],
};
