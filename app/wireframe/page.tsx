import type { Metadata } from 'next'

// 가을 리뉴얼 1단계 — 흑백 와이어프레임. 흐름과 문장만 검토하는 용도이며 색·이미지·모션은 넣지 않습니다.
export const metadata: Metadata = {
  title: '가을 리뉴얼 와이어프레임',
  robots: { index: false, follow: false },
}

type Note = {
  purpose: string
  changes: string[]
  confirm?: string[]
}

function Section({
  num,
  name,
  note,
  isNew = false,
  children,
}: {
  num: string
  name: string
  note: Note
  isNew?: boolean
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-1 border-b border-neutral-300 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 px-5 py-14 md:px-10">
        <p className="mb-6 font-mono text-xs text-neutral-400">
          {num} · {name}
          {isNew && <span className="ml-2 border border-neutral-900 px-1.5 py-0.5 text-neutral-900">신규</span>}
        </p>
        {children}
      </div>
      <aside className="border-t border-neutral-300 bg-neutral-50 px-5 py-8 text-sm leading-6 text-neutral-700 lg:border-l lg:border-t-0">
        <p className="font-bold text-neutral-900">목적</p>
        <p className="mb-5">{note.purpose}</p>
        <p className="font-bold text-neutral-900">바뀌는 점</p>
        <ul className="mb-5 list-disc pl-4">
          {note.changes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        {note.confirm && (
          <>
            <p className="font-bold text-neutral-900">확인 필요</p>
            <ul className="list-disc pl-4">
              {note.confirm.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </section>
  )
}

function ImageBox({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center border border-dashed border-neutral-400 bg-neutral-100 text-xs text-neutral-500 ${className}`}
    >
      {label}
    </div>
  )
}

function Button({ children, ghost = false }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <span
      className={`inline-block border px-6 py-3 text-sm font-semibold ${
        ghost ? 'border-neutral-400 text-neutral-700' : 'border-neutral-900 bg-neutral-900 text-white'
      }`}
    >
      {children}
    </span>
  )
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</p>
      <h2 className="text-4xl font-black tracking-tight text-neutral-900 md:text-6xl">{title}</h2>
    </div>
  )
}

const seasonSentences = [
  { theme: '고독', text: '혼자 있는 시간은 낭비가 아니라, 나를 다시 채우는 방식일지도 몰라요.' },
  { theme: '깊이', text: '아름다움과 슬픔이 같은 자리에 있다는 걸 아는 사람은, 세상을 조금 더 오래 들여다봅니다.' },
  { theme: '고요', text: '서두르지 않아도 괜찮아요. 천천히 맞춰지는 리듬을 믿는 사람도 있으니까요.' },
]

const concepts = [
  { label: '쓰기', text: '하루의 결을 붙잡는 가장 조용한 방식.' },
  { label: '읽기', text: '타인의 문장 속에서 나의 마음을 발견하는 일.' },
  { label: '삶', text: '가장 보통의 시간이 가장 아름다운 소재가 된다.' },
]

export default function WireframePage() {
  return (
    <div className="min-h-screen bg-white font-pretendard text-neutral-900">
      <div className="border-b border-neutral-900 px-5 py-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Glit · 가을 리뉴얼 · 1단계 와이어프레임</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-700">
          흐름(섹션 순서)과 문장만 봐주세요. 색·이미지·모션은 이 단계에서 넣지 않았습니다. 오른쪽(모바일은 아래) 메모에
          섹션별 목적과 바뀌는 점, 결정이 필요한 부분을 적었습니다.
        </p>
      </div>

      {/* NAV */}
      <div className="flex items-center justify-between border-b border-neutral-300 px-5 py-4 text-sm md:px-10">
        <span className="font-bold">◆ 글릿</span>
        <span className="hidden gap-6 text-neutral-500 md:flex">
          <span>Concept</span>
          <span>Editorial</span>
          <span>Sentences</span>
          <span>Interview</span>
          <span>About</span>
        </span>
        <span className="border border-neutral-900 px-3 py-1.5 text-xs font-semibold">소식 받아보기</span>
      </div>

      <Section
        num="01"
        name="Hero"
        note={{
          purpose: '3초 안에 “글릿은 오래 남는 문장을 모으는 곳”이라는 걸 알게 한다.',
          changes: [
            '상단 메타 바(“Vol.01 · 2026 Spring”) 삭제 — 계절이 지난 정보',
            '4칸 채널 그리드 삭제 — 내비게이션과 중복',
            '“에디토리얼 매거진” 라벨, 배경 장식 삭제',
            '버튼 2개 → 주 행동 1개 + 텍스트 링크 1개',
            '메인 문장을 가을 톤으로 교체 (‘잎을 줍듯 문장을 줍는다’ — 기획서 About의 “천천히 줍는 일”에서 가져옴)',
          ],
          confirm: ['주 행동을 무엇으로 할지 (아래 질문 참고)'],
        }}
      >
        <div className="py-10">
          <h1 className="text-7xl font-black tracking-tight md:text-9xl">글릿</h1>
          <p className="mt-3 text-lg italic text-neutral-500">Gleam it, Glit!</p>
          <p className="mt-10 max-w-2xl text-2xl font-semibold leading-snug md:text-4xl">
            떨어진 잎을 줍듯,
            <br />
            오래 남는 문장을 줍습니다.
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
            스쳐 지나간 마음, 오래 남는 문장, 사람과 사람 사이를 잇는 글을 모읍니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button>가을의 문장 읽기</Button>
            <span className="text-sm text-neutral-600 underline underline-offset-4">나의 문장 결 알아보기 →</span>
          </div>
          <p className="mt-16 text-xs text-neutral-400">↓ scroll</p>
        </div>
      </Section>

      <Section
        num="02"
        name="가을의 문장"
        isNew
        note={{
          purpose: '설명보다 먼저, 글릿이 어떤 문장을 다루는지 직접 느끼게 한다. (기획서 4.3 “문장 카드”가 현재 홈에 빠져 있음)',
          changes: [
            '새 섹션. 문장은 기존 문장 아카이브(/sentences)에 있는 것 중 가을 결에 맞는 3개(고독·깊이·고요)를 그대로 사용 — 새로 지어낸 문장 없음',
            '카드 하단 링크로 /sentences 연결',
          ],
          confirm: ['이 3개 문장으로 괜찮은지, 또는 직접 고른 가을 문장으로 바꿀지'],
        }}
      >
        <Heading eyebrow="Sentences" title="가을의 문장" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {seasonSentences.map((s) => (
            <div key={s.theme} className="flex min-h-72 flex-col justify-between border border-neutral-900 p-6">
              <p className="text-xl font-semibold leading-relaxed">“{s.text}”</p>
              <p className="text-xs text-neutral-500">{s.theme}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-600 underline underline-offset-4">모든 문장 보기 →</p>
      </Section>

      <Section
        num="03"
        name="Concept"
        note={{
          purpose: '글릿이 믿는 세 가지를 한 문장씩으로 정리한다.',
          changes: ['문장·구조 변경 없음 (이미 괜찮은 부분)', '각 줄의 긴 보조 설명은 디자인 단계에서 크기만 줄일 예정'],
          confirm: [
            '기획서는 “사람·잇다·글”, 현재 사이트는 “쓰기·읽기·삶”. 현재 것을 유지하는 걸로 두었습니다.',
          ],
        }}
      >
        <Heading eyebrow="Concept" title="Why We Write" />
        <div className="divide-y divide-neutral-300 border-y border-neutral-300">
          {concepts.map((c, i) => (
            <div key={c.label} className="grid gap-2 py-6 md:grid-cols-[4rem_6rem_1fr] md:items-center">
              <span className="font-mono text-neutral-400">0{i + 1}</span>
              <span className="text-xl font-black">{c.label}</span>
              <span className="text-lg">{c.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        num="04"
        name="Editorial"
        note={{
          purpose: '지금 읽을 수 있는 글로 바로 데려간다.',
          changes: ['구조 유지 (대표 1편 + 2편)', '“모든 이야기 보기” 버튼을 카드 아래 끝으로 이동 — 지금은 대표 글과 카드 사이에 끼어 있음'],
          confirm: [
            '현재 최신 글은 7월 Vol.02(비 오는 날의 문장들 등, 여름 결). 가을호(Vol.03) 원고가 있으면 교체, 없으면 그대로 둡니다.',
          ],
        }}
      >
        <Heading eyebrow="Editorial" title="This Issue" />
        <div className="grid border border-neutral-900 md:grid-cols-2">
          <ImageBox label="대표 글 이미지" className="min-h-64 border-0 border-b md:border-b-0 md:border-r" />
          <div className="p-6">
            <p className="text-xs text-neutral-500">문장 수집 · Vol.02</p>
            <p className="mt-4 text-3xl font-black">비 오는 날의 문장들</p>
            <p className="mt-3 text-neutral-600">창밖의 소리가 문장이 되는 시간</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            ['쓰는 마음', '책상 앞에 앉는 일'],
            ['혼자 있는 시간', '작은 것들이 남는다'],
          ].map(([cat, title]) => (
            <div key={title} className="grid grid-cols-[7rem_1fr] border border-neutral-400">
              <ImageBox label="이미지" className="min-h-32 border-0 border-r" />
              <div className="p-4">
                <p className="text-xs text-neutral-500">{cat}</p>
                <p className="mt-2 text-lg font-black">{title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button ghost>모든 이야기 보기 →</Button>
        </div>
      </Section>

      <Section
        num="05"
        name="Interview"
        note={{
          purpose: '“글 쓰는 사람”의 목소리로 공감을 만든다.',
          changes: ['“전체 인터뷰 보기”가 위·아래 두 번 나옴 → 아래 하나만 남김', '문장·인물 정보는 그대로'],
        }}
      >
        <Heading eyebrow="Interview" title="Writers' Voice" />
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <ImageBox label="인터뷰이 사진 · “완성하지 않아도 괜찮아요.” 문지희 · 소설가" className="aspect-[4/3] px-6 text-center" />
          <div>
            <p className="text-2xl italic leading-relaxed">
              “문장은 늘 조금 늦게 오지만,
              <br />
              기다린 사람에게는 정확히 도착해요.”
            </p>
            <p className="mt-3 text-sm text-neutral-500">문지희, 소설가</p>
            <div className="mt-6 divide-y divide-neutral-300 border-y border-neutral-300 text-sm">
              <p className="py-3">권민혁 · 에세이스트 — 불완전한 문장이 더 솔직합니다</p>
              <p className="py-3">박수지 · 시인 — 시는 침묵으로 열립니다</p>
              <p className="py-3">김유인 · 독립출판 작가 — 작은 이름을 위한 글</p>
            </div>
            <div className="mt-6">
              <Button ghost>전체 인터뷰 보기</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        num="06"
        name="About"
        note={{
          purpose: '왜 이 프로젝트를 하는지, 에세이 한 단락으로 전한다.',
          changes: ['하단 태그 뱃지 4개(에디토리얼·인터뷰·뉴스레터·글쓰기 커뮤니티) 삭제 — 의미 없는 장식', '본문 문장은 그대로'],
          confirm: [
            '“발행: 매주 화요일”이 실제와 맞는지 — 기존 글 날짜(6/24, 7/8)는 2주 간격·수요일이라 확인이 필요합니다.',
          ],
        }}
      >
        <Heading eyebrow="About" title="About Glit" />
        <p className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
          가장 작은 문장에서,
          <br />
          가장 나다운 하루가 시작됩니다.
        </p>
        <div className="mt-10 grid gap-8 border-t border-neutral-300 pt-8 md:grid-cols-[1fr_14rem]">
          <div className="space-y-4 leading-8 text-neutral-700">
            <p>
              글릿은 빛나는 글을 수집하는 에디토리얼 공간입니다. 쓰고 읽고 살아가는 일의 태도를 함께 찾아가며, 작은 문장이
              하루를 바꾸는 순간을 기록합니다.
            </p>
            <p>
              매주 발행되는 에디토리얼에는 작가들의 인터뷰, 에세이, 감상이 담깁니다. 완결된 글 너머에서 오늘을 위한 한 줄이
              당신에게 닿기를 바랍니다.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <p>창간 — 2026년 봄</p>
            <p>발행 — 매주 화요일</p>
            <p>채널 — @gleamit_glit</p>
            <p>인터뷰 — Writers&apos; Voice</p>
          </div>
        </div>
      </Section>

      <Section
        num="07"
        name="Join"
        note={{
          purpose: '끝까지 읽은 사람이 뉴스레터를 구독하게 한 번 더 민다.',
          changes: [
            '제목을 계절에 맞춰 교체 (기존: “당신의 글을 기다리고 있어요”)',
            '큰 코럴 버튼 “에디토리얼 보내러 가기”와 “또는” 구분선 → 작은 텍스트 링크로 축소 (기획서: 행동은 하나로)',
          ],
          confirm: ['제목 문안 — 기존 제목 유지도 괜찮습니다'],
        }}
      >
        <div className="mx-auto max-w-2xl py-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-500">Join</p>
          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            이번 가을,
            <br />
            문장 하나를 함께 받아보세요
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-7 text-neutral-600">
            글릿은 쓰는 사람들의 공간입니다. 에디토리얼 소식을 받고, 직접 글을 보내 함께 만들어가요.
          </p>
          <div className="mt-10 flex flex-col gap-3 border border-neutral-900 p-3 sm:flex-row">
            <span className="flex-1 border border-neutral-300 px-4 py-3 text-left text-sm text-neutral-400">
              이메일 주소를 입력하세요
            </span>
            <Button>소식 받아보기</Button>
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            구독 신청 시 이메일 수신과 개인정보처리방침에 동의한 것으로 간주됩니다.
          </p>
          <p className="mt-8 text-sm text-neutral-600 underline underline-offset-4">
            쓴 글을 보내고 싶다면 → Instagram @gleamit_glit
          </p>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-neutral-300 pt-6 text-xs text-neutral-500 md:flex-row">
          <span>◆ 글릿 · Gleam it, Glit!</span>
          <span>Instagram · 개인정보처리방침 · © 2026 Glit Editorial</span>
        </div>
      </Section>
    </div>
  )
}
