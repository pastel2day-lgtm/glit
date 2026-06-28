'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import SiteFooter from '@/components/SiteFooter'

type GrainType = 'NIGHT' | 'STAR' | 'FOREST'
type Stage = 'intro' | 'quiz' | 'result'

const QUESTIONS = [
  {
    title: '요즘 마음이 가장 자주\n머무는 곳은 어디인가요?',
    options: [
      { text: '잠들기 전, 자꾸만 선명해지는 생각들 사이', type: 'NIGHT' as GrainType },
      { text: '내가 정말 원하는 게 뭔지 묻게 되는 순간들 사이', type: 'STAR' as GrainType },
      { text: '혼자 있어야 겨우 숨이 돌아오는 시간들 사이', type: 'FOREST' as GrainType },
    ],
  },
  {
    title: '괜찮지 않은 날,\n당신에게 먼저 필요한 것은?',
    options: [
      { text: '불 꺼진 방에서도 붙잡을 수 있는 조용한 문장', type: 'NIGHT' as GrainType },
      { text: '잊고 있던 방향을 다시 떠올리게 하는 질문', type: 'STAR' as GrainType },
      { text: '아무에게도 설명하지 않아도 되는 넓은 침묵', type: 'FOREST' as GrainType },
    ],
  },
  {
    title: '책을 펼칠 때,\n가장 먼저 찾게 되는 감각은?',
    options: [
      { text: '뒤척이는 마음이 조금씩 가라앉는 안도감', type: 'NIGHT' as GrainType },
      { text: '나만의 빛을 다시 확인하는 작은 설렘', type: 'STAR' as GrainType },
      { text: '혼자 있는 시간이 충분해지는 단단함', type: 'FOREST' as GrainType },
    ],
  },
  {
    title: '지금 가장 듣고 싶은 말은?',
    options: [
      { text: '오늘 밤을 꼭 잘 해내지 않아도 괜찮아요', type: 'NIGHT' as GrainType },
      { text: '당신의 별은 사라진 게 아니라 잠시 흐려진 거예요', type: 'STAR' as GrainType },
      { text: '혼자 있는 시간도 충분히 사랑의 방식이에요', type: 'FOREST' as GrainType },
    ],
  },
  {
    title: '당신의 문장 결을\n하나의 풍경으로 고른다면?',
    options: [
      { text: '밝은 책등 하나가 놓인 깊은 밤의 침대맡', type: 'NIGHT' as GrainType },
      { text: '작지만 분명하게 빛나는 한 사람의 별', type: 'STAR' as GrainType },
      { text: '말을 아껴도 마음이 넓어지는 숲길', type: 'FOREST' as GrainType },
    ],
  },
  {
    title: '좋은 책을 만났을 때\n가장 오래 남는 것은?',
    options: [
      { text: '나와 같은 밤을 지나온 사람이 있다는 느낌', type: 'NIGHT' as GrainType },
      { text: '내 안에 아직 꺼지지 않은 가능성을 보는 느낌', type: 'STAR' as GrainType },
      { text: '혼자여도 비어 있지 않다는 확신', type: 'FOREST' as GrainType },
    ],
  },
  {
    title: '지금 당신에게 필요한\n책의 역할은 무엇인가요?',
    options: [
      { text: '잠 못 드는 밤 옆에 조용히 놓이는 것', type: 'NIGHT' as GrainType },
      { text: '고개를 들게 하고, 다시 별을 보게 하는 것', type: 'STAR' as GrainType },
      { text: '혼자의 시간을 낭비가 아니라 충만함으로 바꾸는 것', type: 'FOREST' as GrainType },
    ],
  },
]

const RESULTS: Record<
  GrainType,
  {
    code: string
    name: string
    label: string
    comment: string
    description: string
    bookTitle: string
    bookSlug: string
    bookImage: string
    bookLine: string
    feelingQuestion: string
    keywords: string[]
  }
> = {
  NIGHT: {
    code: '1',
    name: '잠 못 드는 결',
    label: '불안 속에서도 문장을 붙잡는 결',
    comment: '깊이 느끼는 사람이에요. 표면보다 바닥을 오래 보는 분이시더라고요.',
    description:
      '마음이 소란할수록 오히려 더 조용한 문장을 찾는 편이에요. 잠이 오지 않는 밤에도 감정을 밀어내기보다 천천히 들여다보려는 힘이 있습니다.',
    bookTitle: '잠 못 드는 밤을 위한 책',
    bookSlug: '/editorial/sleepless-night',
    bookImage: '/images/glit_mag_bright_night.png',
    bookLine: '어둠이 깊을수록 별은 더 선명해진다는 걸.',
    feelingQuestion: '혹시 요즘, 잠들기 직전에 마음이 가장 솔직해지는 날이 많으신가요?',
    keywords: ['사색', '불면', '안도', '깊은 밤'],
  },
  STAR: {
    code: '2',
    name: '별을 찾는 결',
    label: '잊고 있던 방향을 다시 찾는 결',
    comment: '계속 찾는 사람이에요. 지친 와중에도 나만의 빛을 포기하지 않는 분이시더라고요.',
    description:
      '바쁘게 지내다가도 문득 “나는 어디로 가고 있지?”를 묻는 타입이에요. 당신에게 필요한 문장은 답보다 방향을 다시 켜주는 작은 신호에 가깝습니다.',
    bookTitle: '당신만의 별은 어디 있나요',
    bookSlug: '/editorial/your-own-star',
    bookImage: '/images/glit_mag_bright_star.png',
    bookLine: '별은 사라지지 않으니까요.',
    feelingQuestion: '혹시 요즘, 내 별이 어디 있는지 자꾸 잊어버리는 기분이 드시나요?',
    keywords: ['방향', '이상', '가능성', '나의 별'],
  },
  FOREST: {
    code: '3',
    name: '혼자 충만한 결',
    label: '혼자 있을 때 가장 충만해지는 결',
    comment: '혼자서 깊어지는 사람이에요. 거리를 두는 게 아니라 자신을 회복하는 분이시더라고요.',
    description:
      '사람들 사이에서 소진된 마음을 혼자만의 시간으로 다시 채우는 타입이에요. 고요를 회피가 아니라 생활의 중심을 되찾는 방식으로 사용할 줄 압니다.',
    bookTitle: '혼자 있는 시간이 가장 충만했다',
    bookSlug: '/editorial/fullest-alone',
    bookImage: '/images/glit_mag_week3_forest.png',
    bookLine: '혼자 있는 시간은 낭비가 아니라, 나를 다시 채우는 방식일지도 몰라요.',
    feelingQuestion: '혹시 요즘, 혼자 있는 시간이 있어야 겨우 나로 돌아오는 느낌이 드시나요?',
    keywords: ['혼자', '회복', '고요', '루틴'],
  },
}

function calcScores(answers: GrainType[]): Record<GrainType, number> {
  const count: Record<GrainType, number> = { NIGHT: 0, STAR: 0, FOREST: 0 }
  answers.forEach((answer) => count[answer]++)
  return count
}

function calcResult(answers: GrainType[]): GrainType {
  const count = calcScores(answers)
  return (Object.keys(count) as GrainType[]).reduce((current, candidate) =>
    count[current] >= count[candidate] ? current : candidate
  )
}

export default function DiagnosisQuiz() {
  const [stage, setStage] = useState<Stage>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<GrainType[]>([])
  const [selected, setSelected] = useState<GrainType | null>(null)
  const [resultType, setResultType] = useState<GrainType>('NIGHT')

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
    setResultType('NIGHT')
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
              Sentence Grain Test
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-snug text-ink md:text-4xl">
              당신의 문장 결에 맞는
              <br />
              책을 골라드릴게요
            </h1>
            <p className="mb-4 text-base leading-relaxed text-sub">
              말씀해주신 거 들으면서, 딱 어울리는 문장이 떠올랐어요.
              <br />
              조금 더 정확하게 맞춰드리고 싶어서요.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-sub/60">
              아래 짧은 검사만 해주시면, 당신의 문장 결에 맞는 책과 문장을 바로 보여드릴게요.
            </p>

            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {(['잠 못 드는 결', '별을 찾는 결', '혼자 충만한 결'] as const).map((type) => (
                <span key={type} className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-sub/50">
                  {type}
                </span>
              ))}
            </div>

            <button
              onClick={() => setStage('quiz')}
              className="rounded-full bg-coral px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-coral/90"
            >
              문장 결 검사하기
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
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-8 text-center">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-coral">
                Your Sentence Grain
              </p>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral/5 px-5 py-2">
                <span className="font-mono text-sm text-coral">Type {result.code}</span>
                <span className="text-ink/20">·</span>
                <span className="text-sm text-sub">{result.label}</span>
              </div>
              <h2 className="mb-3 text-3xl font-bold text-ink md:text-4xl">
                결과 보니까 {result.name}이시네요.
              </h2>
              <p className="mx-auto max-w-md text-base italic leading-relaxed text-sub">
                {result.comment}
              </p>
            </div>

            <div className="mb-5 grid overflow-hidden rounded-2xl border border-ink/8 bg-white/65 shadow-[0_24px_70px_rgba(46,43,40,0.07)] md:grid-cols-[0.85fr_1.15fr]">
              <a href={result.bookSlug} className="relative min-h-64 overflow-hidden">
                <img
                  src={result.bookImage}
                  alt={result.bookTitle}
                  className="h-full w-full object-cover sepia-[0.1] saturate-[0.88] transition-transform duration-700 hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-ink/10" />
              </a>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-widest text-sub/45">Recommended Book</p>
                  <p className="mb-4 text-sm leading-7 text-sub">{result.description}</p>
                  <h3 className="mb-4 text-2xl font-black leading-snug text-ink">{result.bookTitle}</h3>
                  <p className="text-sm leading-7 text-sub">
                    이런 분들한테 제일 잘 맞는 책이 저는 <span className="font-bold text-ink">{result.bookTitle}</span>인 것 같아요.
                    이 문장 때문인데요 —
                  </p>
                  <blockquote className="my-5 border-l-2 border-coral pl-4 text-xl font-medium italic leading-relaxed text-ink/82">
                    "{result.bookLine}"
                  </blockquote>
                  <p className="text-sm font-semibold leading-7 text-coral">{result.feelingQuestion}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {result.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-coral/25 px-2.5 py-1 text-xs text-coral">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={result.bookSlug}
                className="flex-1 rounded-full bg-coral px-8 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-coral/90"
              >
                추천 책 자세히 보기
              </a>
              <button
                onClick={handleReset}
                className="flex-1 rounded-full border border-ink/12 px-8 py-4 text-sm font-medium text-sub transition-colors hover:border-coral hover:text-coral"
              >
                다시 검사하기
              </button>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
