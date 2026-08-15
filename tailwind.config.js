/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#F3F4F7',
        ink: '#12151C',
        graphite: {
          DEFAULT: '#5B6270',
          dark: '#9AA1AF',
        },
        hairline: {
          DEFAULT: '#D9DCE2',
          dark: '#262A33',
        },
        grounded: {
          DEFAULT: '#0B6C6B',
          dark: '#4FC3C0',
          subtle: '#E6F3F2',
          'subtle-dark': '#15302F',
        },
        gated: {
          DEFAULT: '#9B3A44',
          dark: '#E0808A',
          subtle: '#F6E9EA',
          'subtle-dark': '#301A1D',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        eyebrow: ['13px', { lineHeight: '16px', letterSpacing: '0.04em' }],
        body: ['17px', { lineHeight: '28px' }],
        'body-lg': ['19px', { lineHeight: '32px' }],
        h4: ['22px', { lineHeight: '28px' }],
        h3: ['28px', { lineHeight: '34px' }],
        h2: ['38px', { lineHeight: '44px' }],
        h1: ['56px', { lineHeight: '60px', letterSpacing: '-0.01em' }],
        display: ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.95' }],
      },
      maxWidth: {
        measure: '65ch',
      },
    },
  },
  plugins: [],
}
