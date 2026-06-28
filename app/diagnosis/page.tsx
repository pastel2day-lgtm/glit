import type { Metadata } from 'next'
import DiagnosisQuiz from '@/components/diagnosis/DiagnosisQuiz'

export const metadata: Metadata = {
  title: '문장 결 검사',
  description:
    '아홉 개의 질문으로 지금 당신에게 맞는 문장의 결을 찾아보세요.',
}

export default function DiagnosisPage() {
  return <DiagnosisQuiz />
}
