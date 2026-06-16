'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'

type EssenceType = 'E' | 'T' | 'P' | 'I'
type Stage = 'intro' | 'quiz' | 'result'

const QUESTIONS = [
  {
    title: '오늘 하루, 당신이 마음의 머무름을 위해\n가장 필요한 온도는 무엇인가요?',
    options: [
      { text: '얼어붙은 생각들을 부드럽게 감싸는 아주 연한 미온의 온기', type: 'E' as EssenceType },
      { text: '격렬히 타오르던 번뇌를 즉시 가라앉히는 차고 명징한 냉정', type: 'T' as EssenceType },
      { text: '느릿하게 타들어가는 인센스 연기 같은 그윽한 상온의 고요', type: 'I' as EssenceType },
      { text: '달콤한 우유를 갓 끓여 올렸을 때 만나는 농밀하고 포근한 온기', type: 'P' as EssenceType },
    ],
  },
  {
    title: '가장 글을 쓰고 싶어지는 시간대는\n언제인가요?',
    options: [
      { text: '이른 새벽, 세상이 아직 잠들어 있는 고요한 빛 속에서', type: 'I' as EssenceType },
      { text: '한낮의 선명한 햇살 아래, 생각이 날카롭게 정리될 때', type: 'T' as EssenceType },
      { text: '저녁 노을이 지고, 하루의 감정들이 가라앉는 시간에', type: 'E' as EssenceType },
      { text: '늦은 밤, 세상과 나만 깨어 있는 듯한 깊은 호흡 속에서', type: 'P' as EssenceType },
    ],
  },
  {
    title: '당신이 글을 쓸 때 가장 담고 싶은\n이야기는 무엇인가요?',
    options: [
      { text: '나와 연결된 사람들, 일상에서 느낀 따뜻한 감정들', type: 'E' as EssenceType },
      { text: '세상을 바라보며 발견한 명확한 통찰과 예리한 관찰', type: 'T' as EssenceType },
      { text: '소리, 빛, 향기처럼 언어로 설명하기 어려운 감각의 기억', type: 'P' as EssenceType },
      { text: '혼자 오래 생각해온 것, 아직 아무에게도 말하지 않은 것', type: 'I' as EssenceType },
    ],
  },
  {
    title: '당신이 쓴 글을 읽은 독자가\n이런 말을 해줬으면 한다면?',
    options: [
      { text: '"이 글을 읽고 조금 위로가 됐어요"', type: 'E' as EssenceType },
      { text: '"이 글, 정말 정확하게 짚었네요"', type: 'T' as EssenceType },
      { text: '"이 글의 감성이 마음속 깊이 남아요"', type: 'P' as EssenceType },
      { text: '"이 글을 읽으며 한참 생각에 잠겼어요"', type: 'I' as EssenceType },
    ],
  },
  {
    title: '지금 이 순간, 당신의 내면을\n가장 잘 표현하는 문장은?',
    options: [
      { text: '나는 지금, 누군가와 따뜻하게 연결되고 싶다', type: 'E' as EssenceType },
      { text: '나는 지금, 모든 것을 명확하게 이해하고 싶다', type: 'T' as EssenceType },
      { text: '나는 지금, 내 감정의 끝까지 들어가 보고 싶다', type: 'P' as EssenceType },
      { text: '나는 지금, 그냥 조용히 나 자신과 함께 있고 싶다', type: 'I' as EssenceType },
    ],
  },
]

const RESULTS: Record<
  EssenceType,
  { code: string; name: string; eng: string; tagline: string; description: string; keywords: string[] }
> = {
  E: {
    code: 'E형',
    name: '온기의 언어',
    eng: 'The Warm Voice',
    tagline: '당신의 글은 사람과 사람 사이를 잇는 다리입니다.',
    description:
      '따뜻한 공감의 감각으로 독자의 마음을 부드럽게 감쌉니다. 일상 속 작은 연결을 포착하는 당신의 글은, 읽는 이로 하여금 "나만 이런 게 아니었구나"를 느끼게 합니다. 글릿이 가장 기다리고 있는 목소리입니다.',
    keywords: ['공감', '일상', '연결', '따뜻함'],
  },
  T: {
    code: 'T형',
    name: '명징의 언어',
    eng: 'The Clear Eye',
    tagline: '당신의 글은 흐릿한 것을 선명하게 만듭니다.',
    description:
      '날카로운 관찰력과 논리적인 언어로 세상을 새롭게 해석합니다. 독자는 당신의 글을 읽고 "그렇게 생각한 적이 없었는데"라며 무언가를 발견하게 됩니다. 세상을 꿰뚫어 보는 당신의 시선은 글릿의 에디토리얼에 꼭 필요합니다.',
    keywords: ['통찰', '관찰', '분석', '명확함'],
  },
  P: {
    code: 'P형',
    name: '깊이의 언어',
    eng: 'The Deep Current',
    tagline: '당신의 글은 감정의 깊은 곳에서 길어올린 것입니다.',
    description:
      '시와 산문의 경계에서 살아가는 당신은 언어를 감각으로 씁니다. 독자는 당신의 글에서 설명할 수 없는 무언가를, 오래도록 마음에 품게 됩니다. 농밀하고 시적인 당신의 언어로 글릿의 색깔을 채워주세요.',
    keywords: ['감성', '시적', '깊이', '농밀함'],
  },
  I: {
    code: 'I형',
    name: '고요의 언어',
    eng: 'The Still Water',
    tagline: '당신의 글은 독자를 잠시 멈추게 합니다.',
    description:
      '느린 호흡처럼, 읽고 난 뒤에도 오래도록 마음속에 머무는 글을 씁니다. 혼자만의 사색에서 시작된 당신의 언어는, 독자의 내면에 조용한 파문을 일으킵니다. 글릿의 가장 조용하고 깊은 목소리가 되어주세요.',
    keywords: ['사색', '고요', '여운', '내면'],
  },
}

function calcResult(answers: EssenceType[]): EssenceType {
  const count: Record<EssenceType, number> = { E: 0, T: 0, P: 0, I: 0 }
  answers.forEach((a) => count[a]++)
  return (Object.keys(count) as EssenceType[]).reduce((a, b) =>
    count[a] >= count[b] ? a : b
  )
}

export default function DiagnosisQuiz() {
  const [stage, setStage] = useState<Stage>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<EssenceType[]>([])
  const [selected, setSelected] = useState<EssenceType | null>(null)
  const [resultType, setResultType] = useState<EssenceType>('E')

  const handleSelect = (type: EssenceType) => {
    if (selected) return
    setSelected(type)

    setTimeout(() => {
      const newAnswers = [...answers, type]
      setAnswers(newAnswers)

      if (step < QUESTIONS.length - 1) {
        setStep((s) => s + 1)
        setSelected(null)
      } else {
        setResultType(calcResult(newAnswers))
        setStage('result')
      }
    }, 480)
  }

  const handleReset = () => {
    setStage('intro')
    setStep(0)
    setAnswers([])
    setSelected(null)
  }

  const result = RESULTS[resultType]
  const progress = ((step + 1) / QUESTIONS.length) * 100

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-ink/8 bg-ivory/80 backdrop-blur-sm sticky top-0 z-10">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="w-4 h-4 text-coral" />
          <span className="text-sm font-bold tracking-tight">글릿</span>
        </a>
        {stage === 'quiz' && (
          <span className="hidden sm:block text-xs tracking-widest uppercase text-sub/40">
            Digital Essence Diagnosis
          </span>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">

        {/* ── INTRO ── */}
        {stage === 'intro' && (
          <div className="text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-6">
              <Diamond className="w-8 h-8 text-coral" />
            </div>
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-5">
              Digital Essence Diagnosis
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-ink leading-snug mb-6">
              당신은 어떤 언어를<br />가진 사람인가요?
            </h1>
            <p className="text-sub text-base leading-relaxed mb-8">
              5가지 질문으로 나의 글쓰기 에센스 타입을 진단합니다.<br />
              솔직하게, 가장 먼저 떠오르는 답을 선택하세요.
            </p>

            <div className="flex justify-center gap-4 mb-10 flex-wrap">
              {['E형 · 온기', 'T형 · 명징', 'P형 · 깊이', 'I형 · 고요'].map((t) => (
                <span key={t} className="text-xs text-sub/50 border border-ink/10 px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setStage('quiz')}
              className="bg-coral text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors"
            >
              진단 시작하기
            </button>

            <div className="mt-8">
              <a href="/" className="text-xs text-sub/40 hover:text-coral transition-colors">
                ← 글릿으로 돌아가기
              </a>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {stage === 'quiz' && (
          <div className="w-full max-w-xl mx-auto">
            <p className="text-xs tracking-widest uppercase mb-3 text-sub/40">
              STEP {step + 1} / {QUESTIONS.length}
            </p>

            {/* Progress bar */}
            <div className="h-0.5 mb-10 rounded-full overflow-hidden bg-ink/8">
              <div
                className="h-full rounded-full bg-coral transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Question */}
            <h2
              className="text-xl md:text-2xl font-bold text-ink leading-snug mb-8"
              style={{ whiteSpace: 'pre-line' }}
            >
              {QUESTIONS[step].title}
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {QUESTIONS[step].options.map((option, i) => {
                const isChosen = selected === option.type
                const isDimmed = !!selected && !isChosen
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(option.type)}
                    disabled={!!selected}
                    className={[
                      'text-left px-5 py-4 rounded-xl text-sm leading-relaxed transition-all duration-200 border',
                      isChosen
                        ? 'border-coral bg-coral/8 text-ink'
                        : isDimmed
                        ? 'border-ink/8 bg-white/40 text-sub/30'
                        : 'border-ink/12 bg-white hover:border-coral/40 hover:bg-coral/4 text-sub cursor-pointer',
                    ].join(' ')}
                  >
                    {option.text}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {stage === 'result' && (
          <div className="text-center max-w-lg mx-auto">
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-5">
              Your Essence Type
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 border border-coral/25 bg-coral/5">
              <span className="font-mono text-sm text-coral">{result.code}</span>
              <span className="text-ink/20">·</span>
              <span className="text-sm text-sub">{result.eng}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3">{result.name}</h2>

            <p className="text-base italic text-sub leading-relaxed mb-7">
              {result.tagline}
            </p>

            <div className="flex justify-center gap-2 flex-wrap mb-8">
              {result.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs text-coral border border-coral/30 px-2.5 py-1 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Blurred preview */}
            <div className="relative mb-3 p-6 rounded-2xl text-left overflow-hidden border border-ink/8 bg-white/60">
              <p className="text-sub text-sm leading-relaxed">
                {result.description}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-16 rounded-b-2xl"
                style={{ background: 'linear-gradient(to top, #F4ECDD 20%, transparent)' }}
              />
            </div>

            <p className="text-xs text-sub/40 mb-7 mt-3">
              전체 분석 결과는 글릿 뉴스레터 구독 후 확인할 수 있어요.
            </p>

            <a
              href="/#join"
              className="inline-block bg-coral text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors mb-5"
            >
              전체 분석 결과 받아보기 →
            </a>

            <br />

            <button
              onClick={handleReset}
              className="text-xs mt-1 text-sub/40 hover:text-coral transition-colors"
            >
              다시 진단하기
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center border-t border-ink/8">
        <div className="flex items-center justify-center gap-2 text-sub/40 text-xs">
          <Diamond className="w-3 h-3 text-coral/50" />
          <span>글릿 · Gleam it, Glit!</span>
        </div>
      </footer>
    </div>
  )
}
