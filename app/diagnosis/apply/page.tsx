import type { Metadata } from 'next'
import DiagnosisApplyForm from '@/components/diagnosis/DiagnosisApplyForm'

export const metadata: Metadata = {
  title: '에센스 진단 신청',
  description: '에센스 진단 신청서를 작성하고 일정 확인을 요청하세요.',
}

export default function DiagnosisApplyPage() {
  return <DiagnosisApplyForm />
}
