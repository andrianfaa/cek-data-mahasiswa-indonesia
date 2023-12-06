import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
          1: "#4F4F52",
          2: "#828285",
          3: "#BDBDC0",
          4: "#E0E0E4"
        },
        white: "#F8FAFC",
        state: {
          info: "#2F80ED",
          success: "#27AE60",
          warning: "#E2B93B",
          error: "#EB5757"
        }
      }
    }
  },
  plugins: []
};

export default config;
