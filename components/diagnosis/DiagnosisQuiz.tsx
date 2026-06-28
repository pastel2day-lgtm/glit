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
    signature: string
    description: string
    strength: string
    tension: string
    prescription: string
    curation: string[]
    keywords: string[]
  }
> = {
  ONE: {
    number: 1,
    name: '기준이 있는 사람',
    original: '개혁가',
    signature: '흐트러진 마음에도 끝내 바른 문장을 찾는 사람.',
    description: '당신은 쉽게 넘기지 않는 사람입니다. 더 나은 방향, 더 정직한 선택, 스스로 납득할 수 있는 삶의 모양을 오래 바라봐요.',
    strength: '삶을 대충 통과하지 않는 정직함',
    tension: '완벽하지 않은 자신에게 너무 엄격해질 때',
    prescription: '지금은 마음을 다그치는 문장보다, 이미 충분히 애쓰고 있음을 알려주는 문장이 필요해요.',
    curation: ['스스로를 덜 몰아붙이는 문장', '정돈된 하루를 회복하는 에세이', '좋은 기준과 다정함이 함께 있는 책'],
    keywords: ['기준', '정직함', '정돈', '책임감'],
  },
  TWO: {
    number: 2,
    name: '먼저 손 내미는 사람',
    original: '조력가',
    signature: '자기 마음보다 누군가의 온도를 먼저 알아차리는 사람.',
    description: '당신은 곁을 살피는 감각이 깊은 사람입니다. 아무렇지 않은 척하는 마음도 놓치지 않고, 필요한 순간 먼저 다가가요.',
    strength: '사람의 빈칸을 알아보는 섬세한 다정함',
    tension: '내 마음은 뒤로 미뤄둔 채 계속 괜찮은 척할 때',
    prescription: '당신이 건넨 다정함이 다시 당신에게 돌아오는 문장이 필요해요.',
    curation: ['돌봄 뒤에 남은 마음을 안아주는 문장', '관계를 따뜻하게 회복하는 산문', '나를 먼저 챙기게 하는 작은 책'],
    keywords: ['다정함', '돌봄', '연결', '온기'],
  },
  THREE: {
    number: 3,
    name: '앞을 향해 달리는 사람',
    original: '성취자',
    signature: '멈추지 않는 속도 안에서도 자기 빛을 증명하고 싶은 사람.',
    description: '당신은 가능성을 현실로 옮기는 힘이 있습니다. 해야 할 일을 해내고, 기대보다 더 멀리 가려는 마음이 있어요.',
    strength: '상상을 결과로 옮기는 추진력',
    tension: '성과가 없으면 나의 가치도 흐려진다고 느낄 때',
    prescription: '성취 바깥에서도 당신이 충분히 빛난다는 걸 알려주는 문장이 잘 어울려요.',
    curation: ['속도를 잠시 늦춰주는 문장', '일과 마음의 균형을 잡는 에세이', '보여지는 나와 실제의 나를 잇는 책'],
    keywords: ['성장', '속도', '가능성', '성취'],
  },
  FOUR: {
    number: 4,
    name: '깊이 느끼는 사람',
    original: '개인주의자',
    signature: '표면보다 바닥을 오래 들여다보는 사람.',
    description: '당신은 아름다움과 슬픔이 같은 자리에 있다는 걸 아는 사람입니다. 남들이 지나친 감정의 미세한 결을 오래 붙잡고, 그것을 자기만의 언어로 바꾸려 해요.',
    strength: '감정의 미세한 층위를 언어로 감지하는 힘',
    tension: '나만 너무 깊게 느끼는 것 같아 외로워질 때',
    prescription: '깊이를 설명하지 않아도 알아주는 문장들이 당신에게 오래 남을 거예요.',
    curation: ['감정의 바닥을 함께 내려가는 문장', '아름다움과 슬픔이 공존하는 산문', '나의 고유함을 잃지 않게 하는 책'],
    keywords: ['깊이', '감정', '고유함', '아름다움'],
  },
  FIVE: {
    number: 5,
    name: '혼자 생각하는 사람',
    original: '탐구자',
    signature: '세상과 조금 떨어져야 비로소 선명하게 이해하는 사람.',
    description: '당신은 쉽게 판단하지 않고 오래 관찰합니다. 혼자 있는 시간은 고립이 아니라 생각을 정리하는 방식에 가까워요.',
    strength: '거리를 두고 본질을 읽어내는 관찰력',
    tension: '느끼기보다 이해하려고만 하다 마음과 멀어질 때',
    prescription: '조용하지만 오래 남는 질문을 건네는 문장들이 잘 맞아요.',
    curation: ['생각의 방에 불을 켜는 문장', '혼자의 시간을 충만하게 만드는 책', '관찰과 사유가 깊은 에세이'],
    keywords: ['사유', '관찰', '이해', '고독'],
  },
  SIX: {
    number: 6,
    name: '곁을 지키는 사람',
    original: '충성가',
    signature: '불안 속에서도 끝내 믿을 수 있는 자리를 찾는 사람.',
    description: '당신은 관계와 약속의 무게를 잘 아는 사람입니다. 쉽게 놓지 않고, 오래 지키고, 혹시 모를 일을 미리 헤아려요.',
    strength: '오래 곁을 지키는 신뢰의 감각',
    tension: '아직 오지 않은 일까지 먼저 걱정하게 될 때',
    prescription: '걱정을 지우는 말보다, 함께 견딜 수 있다는 확신을 주는 문장들이 필요해요.',
    curation: ['불안을 지나 안정으로 가는 문장', '믿음과 관계를 다룬 산문', '곁을 지키는 마음을 알아주는 책'],
    keywords: ['믿음', '곁', '안정', '약속'],
  },
  SEVEN: {
    number: 7,
    name: '더 많은 세계를 원하는 사람',
    original: '열정가',
    signature: '닫힌 문 앞에서도 다음 장면을 상상하는 사람.',
    description: '당신은 삶이 한 가지 색으로만 머무는 것을 견디기 어려워합니다. 더 넓은 세계, 더 새로운 감각, 아직 도착하지 않은 가능성에 마음이 먼저 가요.',
    strength: '닫힌 상황에서도 가능성을 발견하는 상상력',
    tension: '멈춰야 하는 순간에도 마음이 다음 세계로 달아날 때',
    prescription: '설렘을 가볍게 흘려보내지 않고 오래 확장해주는 문장들이 어울려요.',
    curation: ['새로운 감각을 깨우는 문장', '세계가 넓어지는 여행과 산문', '자유와 책임을 함께 말하는 책'],
    keywords: ['확장', '설렘', '자유', '가능성'],
  },
  EIGHT: {
    number: 8,
    name: '부딪혀 나아가는 사람',
    original: '도전자',
    signature: '두려움을 피하기보다 정면으로 통과하려는 사람.',
    description: '당신은 강하게 밀고 나가는 힘이 있는 사람입니다. 부당한 것 앞에서 쉽게 물러서지 않고, 지켜야 할 것을 위해 목소리를 냅니다.',
    strength: '필요한 순간 물러서지 않는 보호의 힘',
    tension: '강해야 한다는 마음 때문에 약한 마음을 숨길 때',
    prescription: '힘을 더 세게 만드는 말보다, 그 힘의 방향을 밝혀주는 문장들이 잘 맞아요.',
    curation: ['강함과 취약함을 함께 다루는 문장', '용기의 방향을 묻는 책', '나를 지키는 힘을 정돈하는 산문'],
    keywords: ['힘', '용기', '정면', '보호'],
  },
  NINE: {
    number: 9,
    name: '고요 속에 머무는 사람',
    original: '평화주의자',
    signature: '서두르지 않는 마음으로 오래 곁에 머무는 사람.',
    description: '당신은 소란을 키우기보다 마음을 가라앉히는 쪽을 압니다. 많은 말보다 조용한 분위기, 빠른 답보다 천천히 맞춰지는 리듬을 믿어요.',
    strength: '서로 다른 마음을 부드럽게 품는 수용력',
    tension: '갈등을 피하다가 나의 목소리까지 작아질 때',
    prescription: '고요를 무력함이 아니라 충만함으로 바꿔주는 문장들이 필요해요.',
    curation: ['느린 마음을 긍정하는 문장', '혼자 있는 시간을 충만하게 만드는 책', '평온 속에서 나를 잃지 않는 산문'],
    keywords: ['고요', '평온', '수용', '리듬'],
  },
}

const resultTypes = Object.values(RESULTS)

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
    <div className="flex min-h-screen flex-col bg-ivory bg-[linear-gradient(rgba(46,43,40,0.035)_1px,transparent_1px)] bg-[size:100%_72px] text-ink">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-ink/8 bg-ivory/85 px-6 backdrop-blur-md">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-sm font-bold">글릿</span>
        </a>
        {stage === 'quiz' && (
          <span className="text-xs uppercase tracking-widest text-sub/40">
            {step + 1} / {total}
          </span>
        )}
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10 md:px-10 md:py-14">
        {stage === 'intro' && (
          <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <Diamond className="h-4 w-4 text-coral" />
                <p className="text-xs font-semibold uppercase text-coral">Glit Sentence Grain</p>
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-none text-ink md:text-7xl lg:text-8xl">
                당신에게 오래 남는 문장은
                <br />
                어떤 결을 가졌을까요?
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-sub md:text-lg">
                9개의 짧은 질문으로 지금의 감정 리듬과 문장 취향을 살펴보고,
                당신에게 어울리는 읽을거리와 문장 큐레이션 방향을 제안합니다.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-sub/60">
                성격을 맞히는 검사가 아니라, 당신에게 오래 남을 문장을 고르는 방식입니다.
                정답은 없어요. 요즘의 마음에 가장 가까운 쪽을 골라주세요.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-sub/55">
                <span className="border border-ink/10 bg-white/45 px-3 py-2">9문항</span>
                <span className="border border-ink/10 bg-white/45 px-3 py-2">약 3분</span>
                <span className="border border-ink/10 bg-white/45 px-3 py-2">에디터 큐레이션 제공</span>
              </div>

              <button
                onClick={() => setStage('quiz')}
                className="mt-9 inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-semibold text-ivory shadow-[0_18px_40px_rgba(46,43,40,0.16)] transition-colors hover:bg-coral"
              >
                나의 문장 결 알아보기
              </button>
            </div>

            <div className="border-y border-ink/10 bg-white/45 px-2 py-6 md:px-6">
              <p className="mb-5 text-xs font-semibold uppercase text-coral">9 Glit Types</p>
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3">
                {resultTypes.map((type) => (
                  <div key={type.number} className="border-b border-ink/8 pb-3 last:border-b sm:last:border-b">
                    <p className="font-mono text-xs text-coral">0{type.number}</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-ink">{type.name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-6 text-sub/55">
                결과는 고정된 성격이 아니라, 지금 당신이 끌리는 문장과 감정의 방향을 바탕으로 제안됩니다.
              </p>
            </div>
          </div>
        )}

        {stage === 'quiz' && (
          <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[220px_1fr]">
            <aside className="md:sticky md:top-24 md:self-start">
              <p className="font-mono text-6xl text-coral">{String(step + 1).padStart(2, '0')}</p>
              <p className="mt-2 text-xs uppercase text-sub/45">of {String(total).padStart(2, '0')}</p>
              <div className="mt-8 h-px overflow-hidden bg-ink/10">
                <div className="h-px bg-coral transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-6 text-sm leading-7 text-sub/55">
                가장 먼저 마음이 기우는 답을 골라주세요. 오래 고민할수록 결과는 흐려져요.
              </p>
            </aside>

            <div className="border-y border-ink/10 bg-white/45 px-1 py-8 md:px-8 md:py-10">
              <p className="mb-6 text-xs uppercase text-sub/35">Question</p>
              <h2
                className="mb-8 text-2xl font-black leading-snug text-ink md:text-4xl"
                style={{ whiteSpace: 'pre-line' }}
              >
                {QUESTIONS[step].title}
              </h2>

              <div className="divide-y divide-ink/10 border-y border-ink/10">
                {QUESTIONS[step].options.map((option, index) => {
                  const isChosen = selected === option.type
                  const isDimmed = !!selected && !isChosen
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(option.type)}
                      disabled={!!selected}
                      className={[
                        'grid w-full grid-cols-[2.5rem_1fr] items-start gap-3 px-1 py-5 text-left text-sm leading-relaxed transition-all duration-200',
                        isChosen
                          ? 'bg-coral/8 text-ink shadow-[inset_3px_0_0_#D9774E]'
                        : isDimmed
                          ? 'text-sub/25'
                        : 'cursor-pointer text-sub hover:bg-white/35 hover:text-ink',
                      ].join(' ')}
                    >
                      <span className="font-mono text-xs text-coral/70">0{index + 1}</span>
                      <span>{option.text}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {stage === 'result' && (
          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[minmax(0,680px)_280px]">
            <div className="border border-ink/10 bg-[#fffaf1]/85 p-5 shadow-[0_32px_90px_rgba(46,43,40,0.13)] md:p-10">
              <div className="border border-coral/20 p-5 md:p-8">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4 text-[0.65rem] uppercase text-sub/45">
                  <span>Glit Sentence Grain</span>
                  <span>Type {String(result.number).padStart(2, '0')}</span>
                </div>

                <p className="mt-7 text-sm font-semibold italic text-coral">{result.original}</p>
                <h2 className="mt-3 text-5xl font-black leading-none text-ink md:text-7xl">
                  {result.name}
                </h2>
                <p className="mt-5 text-base italic leading-relaxed text-sub">
                  당신은 {result.name}의 결을 가졌어요.
                </p>

                <blockquote className="my-8 border-y border-coral/25 py-6">
                  <p className="text-2xl font-bold leading-snug text-ink md:text-3xl">{result.signature}</p>
                </blockquote>

                <div className="grid gap-6 md:grid-cols-[1fr_0.85fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase text-coral">당신의 읽는 방식</p>
                    <p className="mt-3 text-sm leading-8 text-sub md:text-base">{result.description}</p>
                  </div>
                  <div className="border-l border-ink/10 pl-5">
                    <p className="text-xs font-semibold uppercase text-coral">오래 남는 문장</p>
                    <p className="mt-3 text-sm font-bold leading-7 text-ink">{result.prescription}</p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 border-y border-ink/10 py-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-sub/45">강점</p>
                    <p className="mt-2 text-sm font-bold leading-7 text-ink">{result.strength}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-sub/45">주의할 결</p>
                    <p className="mt-2 text-sm font-bold leading-7 text-ink">{result.tension}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-b border-ink/10 pb-5">
                  {result.keywords.map((keyword) => (
                    <span key={keyword} className="text-xs uppercase text-sub/55">
                      #{keyword}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between text-[0.65rem] uppercase text-sub/40">
                  <span>gleamit glit</span>
                  <Diamond className="h-3 w-3 text-coral/45" />
                  <span>/diagnosis</span>
                </div>
              </div>
            </div>

            <aside className="md:sticky md:top-24 md:self-start">
              <div className="border border-coral/20 bg-coral/7 p-5">
                <p className="text-sm font-bold leading-7 text-ink">내 결에 맞는 문장 큐레이션 받기</p>
                <p className="mt-3 text-xs leading-6 text-sub">
                  결과 화면을 DM으로 보내주시면, 글릿이 직접 고른 문장과 읽을거리 목록을 48시간 안에 보내드려요.
                </p>
              </div>

              <div className="mt-4 border border-ink/10 bg-white/50 p-5">
                <p className="text-xs font-semibold uppercase text-coral">Curation Preview</p>
                <div className="mt-4 space-y-3">
                {result.curation.map((item) => (
                  <div key={item} className="border-b border-ink/8 pb-3 text-sm leading-6 text-sub last:border-b-0 last:pb-0">
                    {item}
                  </div>
                ))}
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-sub/45">
                이 검사는 의학적·심리학적 진단이 아니라, 글릿이 제안하는 문장 취향 큐레이션입니다.
              </p>

              <a
                href="https://instagram.com/gleamit_glit"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-full bg-coral px-7 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-ink"
              >
                큐레이션 받기
              </a>
              <button
                onClick={handleReset}
                className="mt-3 w-full rounded-full border border-ink/12 px-7 py-4 text-sm font-medium text-sub transition-colors hover:border-coral hover:text-coral"
              >
                다시 찾기
              </button>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
