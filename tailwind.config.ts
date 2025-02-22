import type { Config } from "tailwindcss";
import TailwindcssAnimate from "tailwindcss-animate";
import svgToDataUri from "mini-svg-data-uri";
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / 0.15)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        third: {
          DEFAULT: "hsl(var(--third))",
          foreground: "hsl(var(--third-foreground))",
        },
        boosted: {
          DEFAULT: "var(--boosted)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        embossed: {
          DEFAULT: "hsl(var(--embossed))",
        },
        submerged: {
          DEFAULT: "hsl(var(--submerged))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        // Mobile first approach
        xs: ["px", { lineHeight: "12px" }],
        sm: ["10px", { lineHeight: "14px" }],
        base: ["12px", { lineHeight: "16px" }],
        lg: ["14px", { lineHeight: "20px" }],
        xl: ["16px", { lineHeight: "24px" }],
        "2xl": ["18px", { lineHeight: "28px" }],
        "3xl": ["20px", { lineHeight: "30px" }],
        "4xl": ["24px", { lineHeight: "38px" }],
        "5xl": ["28px", { lineHeight: "42px" }],

        // Desktop & Tablet (md)
        "md:sm": ["12px", { lineHeight: "16px" }],
        "md:base": ["14px", { lineHeight: "20px" }],
        "md:lg": ["16px", { lineHeight: "24px" }],
        "md:xl": ["18px", { lineHeight: "28px" }],
        "md:2xl": ["20px", { lineHeight: "30px" }],
        "md:3xl": ["24px", { lineHeight: "38px" }],
        "md:4xl": ["28px", { lineHeight: "42px" }],
        "md:5xl": ["32px", { lineHeight: "48px" }],
      },
      fontFamily: {
        mono: ["var(--font-dm-mono)"],
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out",
      },
    },
  },
  plugins: [
    TailwindcssAnimate,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="13" height="13" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;
