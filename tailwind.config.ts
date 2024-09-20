import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
        "helvetica-neue": ["var(--font-helvetica)"],
      },
      backgroundImage: {
        "gradient-custom": "radial-gradient(circle, #000000, #09245B)",
      },
      colors: {
        "mobile-header": "#2A2753",
        "footer-bg": "#11182D",
        "custom-text-white": "#FFFFFF",
        "header-purple": "#131842",
        "custom-grey": "#6d6d6d",
        "custom-light-grey": "#DFDFDF",
        "custom-activity-award": "#0095EF",
        "read-bg": "#EFEFEF",
      },
    },
  },
  plugins: [],
};
export default config;
