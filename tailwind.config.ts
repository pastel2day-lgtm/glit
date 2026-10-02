import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: '#D9774E',
        salmon: '#E89B7D',
        ivory: '#F4ECDD',
        ink: '#2E2B28',
        sub: '#6E655C',
        au: {
          sky: '#9CCBEA',
          cream: '#F4E9D3',
          linen: '#F7F0E2',
          mustard: '#DDA03A',
          ginkgo: '#F2C649',
          rust: '#B5532E',
          brick: '#9E4430',
          olive: '#8E9A48',
          moss: '#6F7D35',
          bark: '#6B4A32',
          ink: '#3A2E25',
        },
      },
      fontFamily: {
        jua: ['Jua', 'Pretendard Variable', 'Pretendard', 'sans-serif'],
        pretendard: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config
