import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '글릿 · Gleam it, Glit!',
  description:
    '글을 쓰고픈 사람, 글을 읽고 싶은 사람, 글쓰기가 일상이 되길 바라는 모든 이를 위한 에디토리얼 공간.',
  openGraph: {
    title: '글릿 · Gleam it, Glit!',
    description: '빛나는 글을 수집하는 에디토리얼 공간',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
