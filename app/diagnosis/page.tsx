import type { Metadata } from 'next'
import DiagnosisQuiz from '@/components/diagnosis/DiagnosisQuiz'

export const metadata: Metadata = {
  title: '문장 결 검사',
  description:
    '81문항의 핵심을 45개 진술로 압축한 글릿 문장 결 검사입니다.',
}

export default function DiagnosisPage() {
  return <DiagnosisQuiz />
}
