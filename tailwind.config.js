/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      grey: "#D3D3D3",
      "primary-purple": "#481453",
      "primary-yellow": "#FFC400",
      "primary-blue": "#0F8CFF",
      "secondary-green": "#00BA55",
      "secondary-orange": "#FF7D1F",
      "secondary-pink": "#FF92B9",
      "secondary-pose": "#E8B6F2",
      "secondary-ref": "#FF5A5F",
      "secondary-blue": "#00C2E9",
      "secondary-purple": "#80009C",
      "grey-900": "#2E1334",
      "grey-800": "#51425E",
      "grey-500": "#706B80",
      "grey-400": "#877997",
      "grey-300": "#C2B7D0",
      "grey-200": "#DDD7E5",
      "grey-100": "#F0EDF4",
      "tint-off-white": "#F9F8FA",
      "tint-purple": "#EDE7EE",
      "tint-blue": "#CCF3FB",
      "tint-orange": "#FFE5D2",
      "tint-green": "#CCF1DD",
      "tint-red": "#FFDEDF",
      "tint-yellow": "#FFF8E0",
      "tint-pink": "#FFE5EF",
      "tint-popup-bg": "#481453B2",
      "tint-white": "#FFFFFFA6",
      "tint-bg": "#F9F8FA",
    },
    extend: {
      backgroundImage: {
        "blue-green": "url(/assets/backgrounds/BLUE_GREEN.svg)",
        "pink-blue": "url(/assets/backgrounds/PINK_BLUE.svg)",
        "pink-green": "url(/assets/backgrounds/PINK_GREEN.svg)",
        "pink-green-mobile": "url(/assets/backgrounds/PINK_GREEN_MOBILE.svg)",
        "yellow-blue": "url(/assets/backgrounds/YELLOW_BLUE.svg)",
        "yellow-pink": "url(/assets/backgrounds/YELLOW_PINK.svg)",
        "yellow-red": "url(/assets/backgrounds/YELLOW_RED.svg)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
