/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    colors: {
      'dark': '#070707',
      'dark-grey': '#212121',
      'dark-purple': '#440986',
      'white': '#fff',
      'light': '#fefefe',
      'light-grey': '#f2f2f7',
      'light-purple': '#9a0ff1',
      'grey': '#d1d1d6',
      'red': '#ff3b30',
    }
  },
  plugins: [],
};
