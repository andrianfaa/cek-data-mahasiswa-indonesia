import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        ...defaultTheme.fontFamily,
        sans: ["Archivo", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ...defaultTheme.colors,
        black: {
          DEFAULT: "#18181b",
          1: "#18181b",
          2: "#27272a"
        },
        gray: {
          DEFAULT: "#333333",
          1: "#4F4F4F",
          2: "#828282",
          3: "#BDBDBD",
          4: "#E0E0E0"
        },
        white: "#F8FAFC",
        state: {
          info: "#2F80ED",
          error: "#27AE60",
          warning: "#E2B93B",
          success: "#EB5757"
        }
      }
    }
  },
  plugins: []
};

export default config;
