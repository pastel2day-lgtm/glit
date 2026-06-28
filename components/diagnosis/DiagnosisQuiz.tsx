'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import SiteFooter from '@/components/SiteFooter'

type GrainType = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'SIX' | 'SEVEN' | 'EIGHT' | 'NINE'
type Stage = 'intro' | 'quiz' | 'result'

const QUESTIONS = [
  {
    title: '마음이 흐트러진 날,\n당신을 가장 먼저 붙잡아주는 것은?',
    options: [
      { text: '스스로 납득할 수 있는 기준과 질서', type: 'ONE' as GrainType },
      { text: '누군가에게 건넨 다정한 말 한마디', type: 'TWO' as GrainType },
      { text: '다시 앞으로 나아가고 있다는 감각', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '한 문장이 오래 남는 이유는\n무엇에 가까운가요?',
    options: [
      { text: '말로 다 못 한 감정을 정확히 건드려서', type: 'FOUR' as GrainType },
      { text: '혼자 오래 생각해볼 질문을 남겨서', type: 'FIVE' as GrainType },
      { text: '불안한 마음에 기댈 자리를 만들어줘서', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '새로운 책을 고를 때,\n당신이 끌리는 쪽은?',
    options: [
      { text: '지금과 다른 세계로 데려가줄 것 같은 책', type: 'SEVEN' as GrainType },
      { text: '망설임 없이 정면으로 말하는 책', type: 'EIGHT' as GrainType },
      { text: '조용히 곁에 두고 천천히 읽고 싶은 책', type: 'NINE' as GrainType },
    ],
  },
  {
    title: '당신이 가장 자주 숨기는 마음은?',
    options: [
      { text: '더 잘하고 싶어서 스스로에게 엄격해지는 마음', type: 'ONE' as GrainType },
      { text: '필요한 사람이 되고 싶어서 먼저 챙기는 마음', type: 'TWO' as GrainType },
      { text: '멈추면 뒤처질 것 같아서 계속 달리는 마음', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '혼자 있는 시간에\n가장 자주 하는 일은?',
    options: [
      { text: '감정의 바닥까지 내려가 이름을 붙인다', type: 'FOUR' as GrainType },
      { text: '정보와 생각을 조용히 정리한다', type: 'FIVE' as GrainType },
      { text: '앞으로 괜찮을지 여러 가능성을 점검한다', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '지금 가장 듣고 싶은 말은?',
    options: [
      { text: '아직 가보지 않은 세계가 많이 남아 있어요', type: 'SEVEN' as GrainType },
      { text: '당신의 힘은 누군가를 지키는 데 쓰일 수 있어요', type: 'EIGHT' as GrainType },
      { text: '서두르지 않아도 이미 충분히 여기 있어요', type: 'NINE' as GrainType },
    ],
  },
  {
    title: '당신의 문장 결을\n하나의 태도로 고른다면?',
    options: [
      { text: '흐트러진 것을 바로잡으려는 태도', type: 'ONE' as GrainType },
      { text: '누군가의 마음을 먼저 살피는 태도', type: 'TWO' as GrainType },
      { text: '가능한 한 멀리 가보려는 태도', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '삶이 낯설어질 때,\n당신은 어디로 향하나요?',
    options: [
      { text: '아름다움과 슬픔이 겹치는 깊은 곳으로', type: 'FOUR' as GrainType },
      { text: '아무도 방해하지 않는 생각의 방으로', type: 'FIVE' as GrainType },
      { text: '믿을 수 있는 사람과 약속의 곁으로', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '지금 당신에게 필요한 문장은\n어떤 문장인가요?',
    options: [
      { text: '닫힌 문 너머의 가능성을 보여주는 문장', type: 'SEVEN' as GrainType },
      { text: '두려움 앞에서도 한 걸음 내딛게 하는 문장', type: 'EIGHT' as GrainType },
      { text: '고요 속에서 마음을 천천히 풀어주는 문장', type: 'NINE' as GrainType },
    ],
  },
]

const RESULTS: Record<
  GrainType,
  {
    number: number
    name: string
    original: string
    line: string
    description: string
    curationHint: string
    keywords: string[]
  }
> = {
  ONE: {
    number: 1,
    name: '기준이 있는 사람',
    original: '개혁가',
    line: '흐트러진 마음에도 끝내 바른 문장을 찾는 사람.',
    description:
      '당신은 쉽게 넘기지 않는 사람입니다. 더 나은 방향, 더 정직한 선택, 스스로 납득할 수 있는 삶의 모양을 오래 바라봐요.',
    curationHint: '마음을 다그치는 문장보다, 이미 충분히 애쓰고 있음을 알려주는 문장들이 잘 맞아요.',
    keywords: ['기준', '정직함', '정돈', '책임감'],
  },
  TWO: {
    number: 2,
    name: '먼저 손 내미는 사람',
    original: '조력가',
    line: '자기 마음보다 누군가의 온도를 먼저 알아차리는 사람.',
    description:
      '당신은 곁을 살피는 감각이 깊은 사람입니다. 아무렇지 않은 척하는 마음도 놓치지 않고, 필요한 순간 먼저 다가가요.',
    curationHint: '당신이 건넨 다정함이 다시 당신에게 돌아오는 문장들이 필요해요.',
    keywords: ['다정함', '돌봄', '연결', '온기'],
  },
  THREE: {
    number: 3,
    name: '앞을 향해 달리는 사람',
    original: '성취자',
    line: '멈추지 않는 속도 안에서도 자기 빛을 증명하고 싶은 사람.',
    description:
      '당신은 가능성을 현실로 옮기는 힘이 있습니다. 해야 할 일을 해내고, 기대보다 더 멀리 가려는 마음이 있어요.',
    curationHint: '성취 바깥에서도 당신이 충분히 빛난다는 걸 알려주는 문장들이 잘 어울려요.',
    keywords: ['성장', '속도', '가능성', '성취'],
  },
  FOUR: {
    number: 4,
    name: '깊이 느끼는 사람',
    original: '개인주의자',
    line: '표면보다 바닥을 오래 들여다보는 사람.',
    description:
      '당신은 아름다움과 슬픔이 같은 자리에 있다는 걸 아는 사람입니다. 남들이 지나친 감정의 미세한 결을 오래 붙잡고, 그것을 자기만의 언어로 바꾸려 해요.',
    curationHint: '깊이를 설명하지 않아도 알아주는 문장들이 당신에게 오래 남을 거예요.',
    keywords: ['깊이', '감정', '고유함', '아름다움'],
  },
  FIVE: {
    number: 5,
    name: '혼자 생각하는 사람',
    original: '탐구자',
    line: '세상과 조금 떨어져야 비로소 선명하게 이해하는 사람.',
    description:
      '당신은 쉽게 판단하지 않고 오래 관찰합니다. 혼자 있는 시간은 고립이 아니라 생각을 정리하는 방식에 가까워요.',
    curationHint: '조용하지만 오래 남는 질문을 건네는 문장들이 잘 맞아요.',
    keywords: ['사유', '관찰', '이해', '고독'],
  },
  SIX: {
    number: 6,
    name: '곁을 지키는 사람',
    original: '충성가',
    line: '불안 속에서도 끝내 믿을 수 있는 자리를 찾는 사람.',
    description:
      '당신은 관계와 약속의 무게를 잘 아는 사람입니다. 쉽게 놓지 않고, 오래 지키고, 혹시 모를 일을 미리 헤아려요.',
    curationHint: '걱정을 지우는 말보다, 함께 견딜 수 있다는 확신을 주는 문장들이 필요해요.',
    keywords: ['믿음', '곁', '안정', '약속'],
  },
  SEVEN: {
    number: 7,
    name: '더 많은 세계를 원하는 사람',
    original: '열정가',
    line: '닫힌 문 앞에서도 다음 장면을 상상하는 사람.',
    description:
      '당신은 삶이 한 가지 색으로만 머무는 것을 견디기 어려워합니다. 더 넓은 세계, 더 새로운 감각, 아직 도착하지 않은 가능성에 마음이 먼저 가요.',
    curationHint: '설렘을 가볍게 흘려보내지 않고 오래 확장해주는 문장들이 어울려요.',
    keywords: ['확장', '설렘', '자유', '가능성'],
  },
  EIGHT: {
    number: 8,
    name: '부딪혀 나아가는 사람',
    original: '도전자',
    line: '두려움을 피하기보다 정면으로 통과하려는 사람.',
    description:
      '당신은 강하게 밀고 나가는 힘이 있는 사람입니다. 부당한 것 앞에서 쉽게 물러서지 않고, 지켜야 할 것을 위해 목소리를 냅니다.',
    curationHint: '힘을 더 세게 만드는 말보다, 그 힘의 방향을 밝혀주는 문장들이 잘 맞아요.',
    keywords: ['힘', '용기', '정면', '보호'],
  },
  NINE: {
    number: 9,
    name: '고요 속에 머무는 사람',
    original: '평화주의자',
    line: '서두르지 않는 마음으로 오래 곁에 머무는 사람.',
    description:
      '당신은 소란을 키우기보다 마음을 가라앉히는 쪽을 압니다. 많은 말보다 조용한 분위기, 빠른 답보다 천천히 맞춰지는 리듬을 믿어요.',
    curationHint: '고요를 무력함이 아니라 충만함으로 바꿔주는 문장들이 필요해요.',
    keywords: ['고요', '평온', '수용', '리듬'],
  },
}

function calcScores(answers: GrainType[]): Record<GrainType, number> {
  const count: Record<GrainType, number> = {
    ONE: 0,
    TWO: 0,
    THREE: 0,
    FOUR: 0,
    FIVE: 0,
    SIX: 0,
    SEVEN: 0,
    EIGHT: 0,
    NINE: 0,
  }
  answers.forEach((answer, index) => {
    count[answer] += 1 + index * 0.01
  })
  return count
}

function calcResult(answers: GrainType[]): GrainType {
  const scores = calcScores(answers)
  return (Object.keys(scores) as GrainType[]).reduce((current, candidate) =>
    scores[current] >= scores[candidate] ? current : candidate
  )
}

export default function DiagnosisQuiz() {
  const [stage, setStage] = useState<Stage>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<GrainType[]>([])
  const [selected, setSelected] = useState<GrainType | null>(null)
  const [resultType, setResultType] = useState<GrainType>('FOUR')

  const handleSelect = (type: GrainType) => {
    if (selected) return
    setSelected(type)

    setTimeout(() => {
      const newAnswers = [...answers, type]
      setAnswers(newAnswers)

      if (step < QUESTIONS.length - 1) {
        setStep((current) => current + 1)
        setSelected(null)
      } else {
        setResultType(calcResult(newAnswers))
        setStage('result')
      }
    }, 320)
  }

  const handleReset = () => {
    setStage('intro')
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResultType('FOUR')
  }

  const result = RESULTS[resultType]
  const progress = ((step + 1) / QUESTIONS.length) * 100
  const total = QUESTIONS.length

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/8 bg-ivory/90 px-6 py-4 backdrop-blur-sm">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-sm font-bold tracking-tight">글릿</span>
        </a>
        {stage === 'quiz' && (
          <span className="text-xs uppercase tracking-widest text-sub/40">
            {step + 1} / {total}
          </span>
        )}
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        {stage === 'intro' && (
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-6 flex justify-center">
              <Diamond className="h-8 w-8 text-coral" />
            </div>
            <p className="mb-5 text-xs font-medium uppercase tracking-widest text-coral">
              나의 문장 결 찾기
            </p>
            <h1 className="mb-5 text-3xl font-bold leading-snug text-ink md:text-4xl">
              삶에는 저마다의
              <br />
              결이 있어요
            </h1>
            <p className="mb-4 text-base leading-8 text-sub">
              어떤 사람은 새벽 세 시의 문장에 위로받고, 어떤 사람은 낯선 도시의 첫 페이지에서 자신을 발견하죠.
            </p>
            <p className="mb-8 text-sm leading-7 text-sub/60">
              지금 당신에게 맞는 문장의 결을 찾아드릴게요. 아홉 개의 질문이 당신의 이야기를 듣고 싶어해요.
              <br />
              오래 걸리지 않아요, 5분이면 충분해요.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-2 text-left sm:grid-cols-3">
              {Object.values(RESULTS).map((type) => (
                <span key={type.number} className="rounded-full border border-ink/10 bg-white/45 px-3 py-2 text-center text-xs text-sub/60">
                  {type.number}. {type.name}
                </span>
              ))}
            </div>

            <button
              onClick={() => setStage('quiz')}
              className="rounded-full bg-coral px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-coral/90"
            >
              나의 결 찾기
            </button>

            <div className="mt-8">
              <a href="/" className="text-xs text-sub/40 transition-colors hover:text-coral">
                글릿으로 돌아가기
              </a>
            </div>
          </div>
        )}

        {stage === 'quiz' && (
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-ink/8">
                <div
                  className="h-full rounded-full bg-coral transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="shrink-0 font-mono text-xs text-sub/40">{step + 1}/{total}</span>
            </div>

            <p className="mb-8 text-xs uppercase tracking-widest text-sub/30">Sentence Grain Test</p>

            <h2
              className="mb-7 text-xl font-bold leading-snug text-ink md:text-2xl"
              style={{ whiteSpace: 'pre-line' }}
            >
              {QUESTIONS[step].title}
            </h2>

            <div className="flex flex-col gap-2.5">
              {QUESTIONS[step].options.map((option, index) => {
                const isChosen = selected === option.type
                const isDimmed = !!selected && !isChosen
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(option.type)}
                    disabled={!!selected}
                    className={[
                      'rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all duration-200',
                      isChosen
                        ? 'border-coral bg-coral/8 text-ink'
                        : isDimmed
                        ? 'border-ink/6 bg-white/30 text-sub/25'
                        : 'cursor-pointer border-ink/10 bg-white text-sub hover:border-coral/35 hover:bg-coral/3',
                    ].join(' ')}
                  >
                    {option.text}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {stage === 'result' && (
          <div className="mx-auto w-full max-w-2xl">
            <div className="mb-5 rounded-[1.5rem] border border-ink/8 bg-white/70 p-6 text-center shadow-[0_24px_70px_rgba(46,43,40,0.07)] md:p-8">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-coral">
                Glit Sentence Grain
              </p>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/5 px-5 py-2">
                <span className="font-mono text-sm text-coral">Type {result.number}</span>
                <span className="text-ink/20">·</span>
                <span className="text-sm text-sub">{result.original}</span>
              </div>
              <h2 className="mb-4 text-4xl font-black leading-tight tracking-[-0.035em] text-ink md:text-6xl">
                {result.name}
              </h2>
              <p className="mx-auto mb-7 max-w-md text-base italic leading-relaxed text-sub">
                당신은 {result.name}의 결을 가졌어요.
              </p>
              <blockquote className="mx-auto mb-7 max-w-xl border-y border-coral/20 py-6">
                <p className="text-2xl font-bold leading-snug text-ink md:text-3xl">{result.line}</p>
              </blockquote>
              <p className="mx-auto max-w-xl text-sm leading-8 text-sub md:text-base">{result.description}</p>
              <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-coral">{result.curationHint}</p>

              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {result.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-coral/25 px-2.5 py-1 text-xs text-coral">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-coral/20 bg-coral/7 p-6 text-center">
              <Diamond className="mx-auto mb-4 h-4 w-4 text-coral" />
              <p className="text-base font-bold leading-7 text-ink">
                글릿이 당신을 위해 고른 문장들을 곧 보내드릴게요.
              </p>
              <p className="mt-3 text-sm leading-7 text-sub">
                결과를 캡처해서 DM으로 보내주시면, 48시간 안에 큐레이션 목록을 전달드려요.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://instagram.com/gleamit_glit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-coral px-8 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-coral/90"
              >
                DM으로 결과 보내기
              </a>
              <button
                onClick={handleReset}
                className="flex-1 rounded-full border border-ink/12 px-8 py-4 text-sm font-medium text-sub transition-colors hover:border-coral hover:text-coral"
              >
                다시 찾기
              </button>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
