import type { Metadata } from 'next'
import AutumnHome from '@/components/autumn/AutumnHome'

export const metadata: Metadata = {
  title: '가을 시안 felt',
  robots: { index: false, follow: false },
}

export default function Preview() {
  return <AutumnHome variant="felt" />
}
