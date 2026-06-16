'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'

type EssenceType = 'E' | 'T' | 'P' | 'I'
type Stage = 'intro' | 'quiz' | 'result'

const QUESTIONS = [
  {
    title: '오늘 하루, 당신이 마음의 머무름을 위해\n가장 필요한 온도는?',
    options: [
      { text: '얼어붙은 생각들을 부드럽게 감싸는 아주 연한 미온의 온기', type: 'E' as EssenceType },
      { text: '격렬히 타오르던 번뇌를 즉시 가라앉히는 차고 명징한 냉정', type: 'T' as EssenceType },
      { text: '달콤한 우유를 갓 끓여 올렸을 때 만나는 농밀하고 포근한 온기', type: 'P' as EssenceType },
      { text: '느릿하게 타들어가는 인센스 연기 같은 그윽한 상온의 고요', type: 'I' as EssenceType },
    ],
  },
  {
    title: '가장 글을 쓰고 싶어지는 시간대는\n언제인가요?',
    options: [
      { text: '저녁 노을이 지고, 하루의 감정들이 가라앉는 시간에', type: 'E' as EssenceType },
      { text: '한낮의 선명한 햇살 아래, 생각이 날카롭게 정리될 때', type: 'T' as EssenceType },
      { text: '늦은 밤, 세상과 나만 깨어 있는 듯한 깊은 호흡 속에서', type: 'P' as EssenceType },
      { text: '이른 새벽, 세상이 아직 잠들어 있는 고요한 빛 속에서', type: 'I' as EssenceType },
    ],
  },
  {
    title: '당신에게 가장 편안한 글쓰기 장소는\n어디인가요?',
    options: [
      { text: '사람들 소리가 은은히 들리는 카페나 공원 벤치', type: 'E' as EssenceType },
      { text: '정돈된 책상, 필요한 것만 놓인 깔끔한 방', type: 'T' as EssenceType },
      { text: '창가 자리, 빛이 잘 드는 조용한 구석', type: 'P' as EssenceType },
      { text: '아무도 모르는 나만의 장소, 완전한 고요 속', type: 'I' as EssenceType },
    ],
  },
  {
    title: '글을 쓰기 전, 당신이 가장 먼저\n하는 것은 무엇인가요?',
    options: [
      { text: '최근에 나눈 대화나 만남을 마음속으로 떠올린다', type: 'E' as EssenceType },
      { text: '쓰고 싶은 것을 간단히 메모하거나 목차를 잡아본다', type: 'T' as EssenceType },
      { text: '음악을 틀거나, 향을 피우거나, 분위기를 먼저 만든다', type: 'P' as EssenceType },
      { text: '그냥 오래 앉아서 아무것도 하지 않는다', type: 'I' as EssenceType },
    ],
  },
  {
    title: '당신이 가장 좋아하는\n문장의 스타일은?',
    options: [
      { text: '따뜻하고 친근하게 말을 거는 문장', type: 'E' as EssenceType },
      { text: '간결하고 명확하게 핵심을 짚는 문장', type: 'T' as EssenceType },
      { text: '이미지나 감각이 살아 숨쉬는 문장', type: 'P' as EssenceType },
      { text: '천천히 읽어야만 하는, 여운이 긴 문장', type: 'I' as EssenceType },
    ],
  },
  {
    title: '글이 막힐 때, 당신은 어떻게\n하나요?',
    options: [
      { text: '친구에게 연락하거나 누군가와 이야기를 나눈다', type: 'E' as EssenceType },
      { text: '관련 자료를 더 찾아보거나 논리를 다시 정리한다', type: 'T' as EssenceType },
      { text: '산책을 나가거나 다른 예술 작품을 감상한다', type: 'P' as EssenceType },
      { text: '그냥 기다린다. 때가 오면 쓰인다고 믿는다', type: 'I' as EssenceType },
    ],
  },
  {
    title: '다른 사람의 글을 읽을 때\n가장 먼저 눈에 들어오는 것은?',
    options: [
      { text: '이 글에서 느껴지는 사람의 온기와 진심', type: 'E' as EssenceType },
      { text: '이 글이 하고 싶은 말의 핵심', type: 'T' as EssenceType },
      { text: '이 글에서 사용된 표현과 이미지', type: 'P' as EssenceType },
      { text: '이 글 사이사이에 숨어있는 침묵과 여백', type: 'I' as EssenceType },
    ],
  },
  {
    title: '당신이 글쓰기를 통해\n얻고 싶은 것은?',
    options: [
      { text: '나의 이야기로 누군가와 깊이 연결되는 것', type: 'E' as EssenceType },
      { text: '흩어진 생각을 명확하게 정리하는 것', type: 'T' as EssenceType },
      { text: '내 안의 감정을 아름다운 언어로 표현하는 것', type: 'P' as EssenceType },
      { text: '나 자신을 더 깊이 이해하는 것', type: 'I' as EssenceType },
    ],
  },
  {
    title: '당신의 이상적인 글쓰기 루틴은\n어떤 모습인가요?',
    options: [
      { text: '일상의 작은 순간들을 꾸준히 기록하는 것', type: 'E' as EssenceType },
      { text: '특정 주제를 깊이 연구하고 분석적으로 쓰는 것', type: 'T' as EssenceType },
      { text: '감흥이 올 때 집중적으로 쏟아내는 것', type: 'P' as EssenceType },
      { text: '오랫동안 생각을 숙성시킨 후 천천히 쓰는 것', type: 'I' as EssenceType },
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
    title: '글을 완성하고 나서\n드는 감정은?',
    options: [
      { text: '이 글이 누군가에게 닿을까 하는 설렘과 기대', type: 'E' as EssenceType },
      { text: '하고 싶었던 말이 정확히 담겼는지 확인하고 싶음', type: 'T' as EssenceType },
      { text: '이 글이 충분히 아름다운지 다시 읽어보고 싶음', type: 'P' as EssenceType },
      { text: '이 글을 세상에 내보내도 될지 오래 망설임', type: 'I' as EssenceType },
    ],
  },
  {
    title: '지금 이 순간 당신의 감정을\n색으로 표현한다면?',
    options: [
      { text: '따뜻한 황토빛 — 누군가의 손처럼', type: 'E' as EssenceType },
      { text: '차가운 회청색 — 새벽 하늘처럼', type: 'T' as EssenceType },
      { text: '짙은 마젠타 — 해 질 녘처럼', type: 'P' as EssenceType },
      { text: '연한 회색 — 안개처럼', type: 'I' as EssenceType },
    ],
  },
  {
    title: '당신이 만약 책을 쓴다면\n어떤 책인가요?',
    options: [
      { text: '일상 에세이 — 나와 주변 사람들의 따뜻한 이야기', type: 'E' as EssenceType },
      { text: '논픽션 — 세상을 꿰뚫어 보는 날카로운 분석', type: 'T' as EssenceType },
      { text: '감성 소설 — 언어로 빚어낸 아름다운 세계', type: 'P' as EssenceType },
      { text: '사색집 — 오랫동안 혼자 익힌 내면의 기록', type: 'I' as EssenceType },
    ],
  },
  {
    title: '당신이 글을 쓸 때\n가장 담고 싶은 이야기는?',
    options: [
      { text: '나와 연결된 사람들, 일상에서 느낀 따뜻한 감정들', type: 'E' as EssenceType },
      { text: '세상을 바라보며 발견한 명확한 통찰과 예리한 관찰', type: 'T' as EssenceType },
      { text: '소리, 빛, 향기처럼 언어로 설명하기 어려운 감각의 기억', type: 'P' as EssenceType },
      { text: '혼자 오래 생각해온 것, 아직 아무에게도 말하지 않은 것', type: 'I' as EssenceType },
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
  {
    code: string
    name: string
    eng: string
    tagline: string
    description: string
    traits: string[]
    keywords: string[]
    writingStyle: string
    recommendedContent: string[]
  }
> = {
  E: {
    code: 'E형',
    name: '온기의 언어',
    eng: 'The Warm Voice',
    tagline: '당신의 글은 사람과 사람 사이를 잇는 다리입니다.',
    description:
      '따뜻한 공감의 감각으로 독자의 마음을 부드럽게 감쌉니다. 일상 속 작은 연결을 포착하는 당신의 글은, 읽는 이로 하여금 "나만 이런 게 아니었구나"를 느끼게 합니다.',
    traits: ['공감 능력이 뛰어남', '일상의 온도를 포착함', '독자와 함께 숨 쉬는 글'],
    keywords: ['공감', '일상', '연결', '따뜻함'],
    writingStyle: '당신의 글은 독자를 처음 만나는 순간부터 포근하게 감쌉니다. 특별한 사건보다 평범한 하루의 감촉을 담아내는 데 탁월하며, 읽는 이가 자신의 이야기처럼 느끼게 만드는 힘이 있습니다.',
    recommendedContent: ['일상 에세이 쓰기 가이드', '공감 글쓰기 워크숍', '나의 첫 뉴스레터 만들기'],
  },
  T: {
    code: 'T형',
    name: '명징의 언어',
    eng: 'The Clear Eye',
    tagline: '당신의 글은 흐릿한 것을 선명하게 만듭니다.',
    description:
      '날카로운 관찰력과 논리적인 언어로 세상을 새롭게 해석합니다. 독자는 당신의 글을 읽고 "그렇게 생각한 적이 없었는데"라며 무언가를 발견하게 됩니다.',
    traits: ['본질을 꿰뚫어 보는 시선', '논리와 감성의 균형', '생각을 구조화하는 능력'],
    keywords: ['통찰', '관찰', '분석', '명확함'],
    writingStyle: '당신의 글은 독자에게 새로운 시각을 선사합니다. 감정에 치우치지 않으면서도 차갑지 않은, 명징하되 따뜻한 언어를 씁니다. 복잡한 것을 단순하게, 단순해 보이는 것에서 깊이를 발견합니다.',
    recommendedContent: ['비평적 글쓰기 입문', '나만의 관점 발견하기', '에세이 구조 설계법'],
  },
  P: {
    code: 'P형',
    name: '깊이의 언어',
    eng: 'The Deep Current',
    tagline: '당신의 글은 감정의 깊은 곳에서 길어올린 것입니다.',
    description:
      '시와 산문의 경계에서 살아가는 당신은 언어를 감각으로 씁니다. 독자는 당신의 글에서 설명할 수 없는 무언가를, 오래도록 마음에 품게 됩니다.',
    traits: ['감각적이고 시적인 표현', '깊고 농밀한 감정의 층위', '언어의 질감을 다루는 능력'],
    keywords: ['감성', '시적', '깊이', '농밀함'],
    writingStyle: '당신의 글은 읽히기보다 느껴집니다. 한 문장 한 문장에 소리와 빛과 냄새가 배어 있고, 독자는 그 감각의 세계 속으로 자연스럽게 걸어 들어갑니다. 언어로 그림을 그리는 사람입니다.',
    recommendedContent: ['감각 글쓰기 훈련법', '산문시 입문', '이미지로 쓰는 글쓰기'],
  },
  I: {
    code: 'I형',
    name: '고요의 언어',
    eng: 'The Still Water',
    tagline: '당신의 글은 독자를 잠시 멈추게 합니다.',
    description:
      '느린 호흡처럼, 읽고 난 뒤에도 오래도록 마음속에 머무는 글을 씁니다. 혼자만의 사색에서 시작된 당신의 언어는, 독자의 내면에 조용한 파문을 일으킵니다.',
    traits: ['깊은 사색과 내면 탐구', '언어의 여백을 다루는 능력', '독자에게 긴 여운을 남김'],
    keywords: ['사색', '고요', '여운', '내면'],
    writingStyle: '당신의 글은 쓰인 것보다 쓰이지 않은 것이 더 많습니다. 행간에 담긴 침묵이 독자의 마음을 흔들고, 다 읽은 후에야 글의 진짜 무게가 느껴집니다. 서두르지 않는 글쓰기의 미덕을 아는 사람입니다.',
    recommendedContent: ['사색 일기 쓰기', '느리게 읽고 천천히 쓰기', '내면 글쓰기 명상'],
  },
}

function calcScores(answers: EssenceType[]): Record<EssenceType, number> {
  const count: Record<EssenceType, number> = { E: 0, T: 0, P: 0, I: 0 }
  answers.forEach((a) => count[a]++)
  return count
}

function calcResult(answers: EssenceType[]): EssenceType {
  const count = calcScores(answers)
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
  const [scores, setScores] = useState<Record<EssenceType, number>>({ E: 0, T: 0, P: 0, I: 0 })

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
        const finalScores = calcScores(newAnswers)
        setScores(finalScores)
        setResultType(calcResult(newAnswers))
        setStage('result')
      }
    }, 400)
  }

  const handleReset = () => {
    setStage('intro')
    setStep(0)
    setAnswers([])
    setSelected(null)
    setScores({ E: 0, T: 0, P: 0, I: 0 })
  }

  const result = RESULTS[resultType]
  const progress = ((step + 1) / QUESTIONS.length) * 100
  const total = QUESTIONS.length

  const typeLabels: Record<EssenceType, string> = { E: '온기', T: '명징', P: '깊이', I: '고요' }

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-ink/8 bg-ivory/90 backdrop-blur-sm sticky top-0 z-10">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="w-4 h-4 text-coral" />
          <span className="text-sm font-bold tracking-tight">글잇</span>
        </a>
        {stage === 'quiz' && (
          <span className="text-xs tracking-widest uppercase text-sub/40">
            {step + 1} / {total}
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
            <h1 className="text-3xl md:text-4xl font-bold text-ink leading-snug mb-4">
              당신은 어떤 언어를<br />가진 사람인가요?
            </h1>
            <p className="text-sub text-base leading-relaxed mb-3">
              15가지 질문으로 나의 글쓰기 에센스 타입을 진단합니다.
            </p>
            <p className="text-sub/60 text-sm leading-relaxed mb-8">
              솔직하게, 가장 먼저 떠오르는 답을 선택하세요.<br />
              결과는 글잇 뉴스레터에서 전체 분석으로 받아볼 수 있어요.
            </p>

            <div className="flex justify-center gap-3 mb-10 flex-wrap">
              {(['E형 · 온기', 'T형 · 명징', 'P형 · 깊이', 'I형 · 고요'] as const).map((t) => (
                <span key={t} className="text-xs text-sub/50 border border-ink/10 px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setStage('quiz')}
              className="bg-coral text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors"
            >
              진단 시작하기 →
            </button>

            <div className="mt-8">
              <a href="/" className="text-xs text-sub/40 hover:text-coral transition-colors">
                ← 글잇으로 돌아가기
              </a>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {stage === 'quiz' && (
          <div className="w-full max-w-xl mx-auto">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-0.5 bg-ink/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-coral rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-sub/40 font-mono shrink-0">{step + 1}/{total}</span>
            </div>

            <p className="text-xs tracking-widest uppercase mb-8 text-sub/30">
              Digital Essence Diagnosis
            </p>

            {/* Question */}
            <h2
              className="text-xl md:text-2xl font-bold text-ink leading-snug mb-7"
              style={{ whiteSpace: 'pre-line' }}
            >
              {QUESTIONS[step].title}
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-2.5">
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
                        ? 'border-ink/6 bg-white/30 text-sub/25'
                        : 'border-ink/10 bg-white hover:border-coral/35 hover:bg-coral/3 text-sub cursor-pointer',
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
          <div className="w-full max-w-2xl mx-auto">
            {/* Type badge */}
            <div className="text-center mb-8">
              <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">
                Your Essence Type
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5 border border-coral/25 bg-coral/5">
                <span className="font-mono text-sm text-coral">{result.code}</span>
                <span className="text-ink/20">·</span>
                <span className="text-sm text-sub">{result.eng}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3">{result.name}</h2>
              <p className="text-base italic text-sub leading-relaxed max-w-sm mx-auto">
                {result.tagline}
              </p>
            </div>

            {/* Score bars */}
            <div className="bg-white/60 border border-ink/8 rounded-2xl p-6 mb-5">
              <p className="text-xs text-sub/50 tracking-widest uppercase mb-4">에센스 구성 비율</p>
              <div className="space-y-3">
                {(Object.keys(scores) as EssenceType[]).map((t) => {
                  const pct = Math.round((scores[t] / total) * 100)
                  const isMain = t === resultType
                  return (
                    <div key={t} className="flex items-center gap-3">
                      <span className={`text-xs font-mono w-8 shrink-0 ${isMain ? 'text-coral font-bold' : 'text-sub/50'}`}>
                        {t}형
                      </span>
                      <div className="flex-1 h-1.5 bg-ink/6 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isMain ? 'bg-coral' : 'bg-ink/20'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-mono w-8 text-right shrink-0 ${isMain ? 'text-coral font-bold' : 'text-sub/40'}`}>
                        {pct}%
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-sub/35 mt-4 leading-relaxed">
                {typeLabels[resultType]}의 에센스가 가장 강하게 나타났어요. 두 번째 타입도 당신의 글쓰기에 영향을 줍니다.
              </p>
            </div>

            {/* Keywords */}
            <div className="flex justify-center gap-2 flex-wrap mb-5">
              {result.keywords.map((kw) => (
                <span key={kw} className="text-xs text-coral border border-coral/25 px-2.5 py-1 rounded-full">
                  {kw}
                </span>
              ))}
            </div>

            {/* Traits */}
            <div className="bg-white/60 border border-ink/8 rounded-2xl p-6 mb-5">
              <p className="text-xs text-sub/50 tracking-widest uppercase mb-4">{result.code} 특징</p>
              <ul className="space-y-2">
                {result.traits.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-sub">
                    <Diamond className="w-2 h-2 text-coral/60 mt-1 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Blurred full analysis */}
            <div className="relative border border-ink/8 rounded-2xl overflow-hidden mb-3">
              <div className="p-6">
                <p className="text-xs text-sub/50 tracking-widest uppercase mb-3">글쓰기 스타일 분석</p>
                <p className="text-sub text-sm leading-relaxed mb-6">{result.writingStyle}</p>

                <p className="text-xs text-sub/50 tracking-widest uppercase mb-3">추천 글잇 콘텐츠</p>
                <ul className="space-y-2">
                  {result.recommendedContent.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-sub">
                      <span className="text-coral">◆</span> {c}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-sub/50 tracking-widest uppercase mt-6 mb-3">나와 잘 맞는 글잇 작가 유형</p>
                <p className="text-sub text-sm leading-relaxed blur-[6px] select-none">
                  글잇 인터뷰에서 만난 {result.code} 작가들과 당신의 글쓰기 습관을 비교해보세요. 당신만의 언어가 어디서 빛나는지 발견할 수 있을 거예요.
                </p>
              </div>

              {/* Gradient overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-28 flex flex-col items-center justify-end pb-5"
                style={{ background: 'linear-gradient(to top, #F4ECDD 50%, transparent)' }}
              >
                <p className="text-xs text-sub/50 mb-2">뉴스레터 구독 후 전체 분석을 받아보세요</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="/#join"
              className="block w-full bg-coral text-white text-center px-8 py-4 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors mb-3"
            >
              전체 분석 결과 받아보기 →
            </a>
            <p className="text-center text-xs text-sub/35 mb-6">
              스팸 없이, 글과 소식만 보내드립니다.
            </p>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-xs text-sub/35 hover:text-coral transition-colors"
              >
                다시 진단하기
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="px-6 py-5 text-center border-t border-ink/8">
        <div className="flex items-center justify-center gap-2 text-sub/35 text-xs">
          <Diamond className="w-3 h-3 text-coral/50" />
          <span>글잇 · Gleam it, Glit!</span>
        </div>
      </footer>
    </div>
  )
}
