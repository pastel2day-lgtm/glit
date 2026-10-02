import type { Metadata } from 'next'
import EditorialIndex from '@/components/editorial/EditorialIndex'

export const metadata: Metadata = {
  title: '에디토리얼',
  description: '매월 발행되는 글릿 에디토리얼. 작은 문장이 하루를 바꾸는 순간을 기록합니다.',
  openGraph: {
    title: '에디토리얼 · 글릿',
    description: '매월 발행되는 글릿 에디토리얼. 작은 문장이 하루를 바꾸는 순간을 기록합니다.',
    type: 'website',
  },
}

export default function EditorialPage() {
  return <EditorialIndex />
}
