/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#FFFFFF",
          foreground: "#000000",
          primary: "#2962FF",
          secondary: "#E3F2FD",
          muted: "#B0BEC5",
          border: "#E0E0E0"
        },
        dark: {
          background: "#131722",
          foreground: "#E0E0E0",
          primary: "#2962FF",
          secondary: "#1E2A38",
          muted: "#78909C",
          border: "#37474F"
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
