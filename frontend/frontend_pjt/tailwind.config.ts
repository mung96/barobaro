import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'blue-100' : '#3897F0',
        'blue-200' : '#95CCFF',
        'gray-100' : '#F4F6F8',
        'gray-200' : '#B6BDC8',
        'gray-300' : '#747483',
        'gray-400' : '#F3F3F3',
        'gray-500' : '#D9D9D9',
        'gray-600' : '#919191',
        'black-100' : '#33373F',
      }
    },
  },
  plugins: [],
};
export default config;
