import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        yellow: 'var(--yellow)',
        'light-yellow': 'var(--light-yellow)',
        pink: 'var(--pink)',
        'light-pink': 'var(--light-pink)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      height: {
        'main-content': 'calc(100dvh - 120px)'
      }
    }
  },
  plugins: []
}
export default config
