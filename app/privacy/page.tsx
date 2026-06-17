import type { Metadata } from 'next'
import Diamond from '@/components/ui/Diamond'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '글릿의 구독, 인터뷰 신청, 에센스 진단 신청 정보 처리 기준을 안내합니다.',
}

const sections = [
  {
    title: '수집하는 정보',
    body: '글릿은 뉴스레터 구독 시 이메일 주소를, 인터뷰 및 에센스 진단 신청 시 이름, 연락처, 이메일 등 신청 안내에 필요한 최소 정보를 수집합니다.',
  },
  {
    title: '이용 목적',
    body: '수집한 정보는 뉴스레터 발송, 인터뷰 신청 확인, 에센스 진단 일정 안내, 문의 응대 목적으로만 사용합니다.',
  },
  {
    title: '보관 기간',
    body: '구독 해지 또는 신청 처리 완료 후 보관 필요성이 사라진 정보는 지체 없이 삭제합니다. 단, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.',
  },
  {
    title: '제3자 제공',
    body: '글릿은 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 서비스 운영에 필요한 도구를 사용하는 경우에도 목적 범위 내에서만 처리합니다.',
  },
  {
    title: '문의',
    body: '개인정보 관련 문의와 정정, 삭제 요청은 아래 신청 폼을 통해 연락주세요.',
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink/10 px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-ink">
            <Diamond className="h-4 w-4 text-coral" />
            글릿
          </a>
          <a href="/" className="text-xs font-medium text-sub/55 transition-colors hover:text-coral">
            홈으로
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-coral">Privacy Policy</p>
        <h1 className="text-4xl font-black tracking-[-0.035em] md:text-6xl">개인정보처리방침</h1>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-sub md:text-base">
          글릿은 필요한 정보만 수집하고, 신청과 구독 안내 목적 안에서 조심스럽게 다룹니다.
          본 방침은 2026년 6월 17일부터 적용됩니다.
        </p>

        <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {sections.map((section) => (
            <section key={section.title} className="grid gap-4 py-8 md:grid-cols-[14rem_1fr]">
              <h2 className="text-lg font-bold text-ink">{section.title}</h2>
              <p className="text-sm leading-7 text-sub">{section.body}</p>
            </section>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
