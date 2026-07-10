import type { Metadata } from 'next'
import SentenceArchive from '@/components/sentences/SentenceArchive'

export const metadata: Metadata = {
  title: '문장 아카이브',
  description: '글릿이 수집한 문장들. 마음의 결에 따라 오래 머무는 문장을 골라 읽어보세요.',
  openGraph: {
    title: '문장 아카이브 · 글릿',
    description: '글릿이 수집한 문장들. 마음의 결에 따라 오래 머무는 문장을 골라 읽어보세요.',
    type: 'website',
  },
}

export default function SentencesPage() {
  return <SentenceArchive />
}
