/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        "cross": {
          "0%": { left: "-10%" },
          "100%": { left: '100%' }
        },
        "up": {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(100px)" }

        }
      },
      animation: {
        'cross-it': 'cross 1s linear infinite',
        "up": "up 1s ease-in-out infinite",
      }
    }
  },
  plugins: [],
}

