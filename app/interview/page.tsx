import type { Metadata } from 'next'
import InterviewPage from '@/components/interview/InterviewPage'

export const metadata: Metadata = {
  title: '인터뷰 · 글잇',
  description: '글을 쓰는 사람들의 이야기. 글잇이 직접 만나 나눈 대화를 전합니다.',
}

export default function Interview() {
  return <InterviewPage />
}
