import type { Metadata } from 'next'
import DiagnosisQuiz from '@/components/diagnosis/DiagnosisQuiz'

export const metadata: Metadata = {
  title: '에센스 진단',
  description:
    '당신은 어떤 언어를 가진 사람인가요? 5가지 질문으로 나의 글쓰기 에센스 타입을 진단합니다.',
}

export default function DiagnosisPage() {
  return <DiagnosisQuiz />
}
