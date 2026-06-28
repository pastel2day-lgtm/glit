import type { Metadata } from 'next'
import DiagnosisQuiz from '@/components/diagnosis/DiagnosisQuiz'

export const metadata: Metadata = {
  title: '문장 결 검사',
  description:
    '짧은 검사로 당신의 문장 결에 맞는 책과 문장을 추천받아보세요.',
}

export default function DiagnosisPage() {
  return <DiagnosisQuiz />
}
