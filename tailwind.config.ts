module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070B14",
        panel: "#101827",
        accent: "#7C3AED",
        accent2: "#22D3EE",
        text: "#E5EEF9"
      },
      boxShadow: {
        glow: "0 0 30px rgba(124,58,237,0.35)"
      }
    }
  },
  plugins: []
};
