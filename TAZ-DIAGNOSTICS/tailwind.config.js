/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        medical: {
          red: '#dc2626',
          crimson: '#b91c1c',
          navy: '#0f172a',
          slate: '#1e293b',
          teal: '#0d9488',
          emerald: '#059669',
          amber: '#d97706',
        }
      },
      boxShadow: {
        'clean': '0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'clean-hover': '0 12px 30px -4px rgba(2, 132, 199, 0.15), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
        'badge-red': '0 4px 12px rgba(220, 38, 38, 0.25)',
      },
    },
  },
  plugins: [],
}
