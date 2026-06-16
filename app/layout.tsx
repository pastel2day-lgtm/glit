import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? 'https://gleamit-glit.com'),
  title: {
    default: '글잇 · Gleam it, Glit!',
    template: '%s · 글잇',
  },
  description: '글을 쓰고, 읽고, 살아가는 모든 이를 위한 에디토리얼 공간.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: '글잇 · Gleam it, Glit!',
    description: '빛나는 글을 수집하는 에디토리얼 공간',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '글잇 · Gleam it, Glit!',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '글잇 · Gleam it, Glit!',
    description: '글을 쓰고, 읽고, 살아가는 모든 이를 위한 에디토리얼 공간.',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
