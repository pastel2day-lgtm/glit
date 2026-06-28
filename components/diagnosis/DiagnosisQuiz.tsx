'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import SiteFooter from '@/components/SiteFooter'

type GrainType = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'SIX' | 'SEVEN' | 'EIGHT' | 'NINE'
type Stage = 'intro' | 'quiz' | 'result'

const QUESTIONS = [
  {
    title: '일이 흐트러질 때,\n당신에게 가장 가까운 반응은?',
    options: [
      { text: '먼저 기준을 세우고, 무엇이 바른 방향인지 정리한다', type: 'ONE' as GrainType },
      { text: '주변 사람이 불편하지 않은지 먼저 살핀다', type: 'TWO' as GrainType },
      { text: '멈추기보다 할 수 있는 일을 빠르게 찾아 움직인다', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '혼자 있을 때,\n마음이 자주 향하는 곳은?',
    options: [
      { text: '말로 다 못 한 감정의 깊은 곳', type: 'FOUR' as GrainType },
      { text: '조용히 이해하고 싶은 생각의 방', type: 'FIVE' as GrainType },
      { text: '앞으로 괜찮을지 점검하는 안전한 자리', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '새로운 선택 앞에서,\n당신이 더 끌리는 쪽은?',
    options: [
      { text: '아직 가보지 않은 가능성의 문', type: 'SEVEN' as GrainType },
      { text: '피하지 않고 직접 부딪혀볼 수 있는 길', type: 'EIGHT' as GrainType },
      { text: '서두르지 않아도 마음이 편안한 흐름', type: 'NINE' as GrainType },
    ],
  },
  {
    title: '당신이 가장 자주 숨기는 마음은?',
    options: [
      { text: '더 잘하고 싶어서 스스로에게 엄격해지는 마음', type: 'ONE' as GrainType },
      { text: '필요한 사람이 되고 싶어서 먼저 챙기는 마음', type: 'TWO' as GrainType },
      { text: '뒤처질까 봐 계속 앞으로 나아가려는 마음', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '마음이 복잡할 때,\n당신에게 필요한 시간은?',
    options: [
      { text: '감정의 이름을 천천히 붙여보는 시간', type: 'FOUR' as GrainType },
      { text: '방해받지 않고 생각을 정리하는 시간', type: 'FIVE' as GrainType },
      { text: '믿을 수 있는 사람과 확인하고 안심하는 시간', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '삶이 답답해질 때,\n당신은 무엇을 찾나요?',
    options: [
      { text: '분위기를 바꿔줄 새로운 세계와 경험', type: 'SEVEN' as GrainType },
      { text: '내가 지켜야 할 것과 밀고 나갈 힘', type: 'EIGHT' as GrainType },
      { text: '소란이 가라앉고 다시 편안해지는 상태', type: 'NINE' as GrainType },
    ],
  },
  {
    title: '좋은 문장을 만났을 때,\n오래 남는 이유는?',
    options: [
      { text: '흐트러진 마음을 바르게 정돈해줘서', type: 'ONE' as GrainType },
      { text: '누군가의 마음을 더 다정하게 이해하게 해서', type: 'TWO' as GrainType },
      { text: '다시 해볼 수 있겠다는 힘을 줘서', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '당신이 책에서 자주 찾는 것은?',
    options: [
      { text: '아름다움과 슬픔을 동시에 알아봐주는 문장', type: 'FOUR' as GrainType },
      { text: '생각을 더 깊고 선명하게 만드는 질문', type: 'FIVE' as GrainType },
      { text: '불안한 마음이 기대어 쉴 수 있는 문장', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '당신에게 힘이 되는 문장은?',
    options: [
      { text: '닫힌 문 너머의 다음 장면을 보여주는 문장', type: 'SEVEN' as GrainType },
      { text: '두려움 앞에서도 한 걸음 내딛게 하는 문장', type: 'EIGHT' as GrainType },
      { text: '고요 속에서 마음을 천천히 풀어주는 문장', type: 'NINE' as GrainType },
    ],
  },
  {
    title: '관계 안에서,\n당신이 자주 맡는 역할은?',
    options: [
      { text: '흐려진 기준을 다시 세우는 사람', type: 'ONE' as GrainType },
      { text: '먼저 손 내밀고 분위기를 살피는 사람', type: 'TWO' as GrainType },
      { text: '목표를 향해 분위기를 움직이는 사람', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '타인이 보지 못하는 당신의 면은?',
    options: [
      { text: '생각보다 훨씬 깊고 오래 느낀다는 것', type: 'FOUR' as GrainType },
      { text: '혼자 있어야 비로소 마음이 정리된다는 것', type: 'FIVE' as GrainType },
      { text: '괜찮아 보여도 안쪽에서는 계속 확인하고 있다는 것', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '당신이 피곤해지는 순간은?',
    options: [
      { text: '재미와 가능성이 모두 닫힌 것처럼 느껴질 때', type: 'SEVEN' as GrainType },
      { text: '부당한 상황 앞에서 아무것도 할 수 없을 때', type: 'EIGHT' as GrainType },
      { text: '갈등이 커지고 마음의 평온이 깨질 때', type: 'NINE' as GrainType },
    ],
  },
  {
    title: '지금 당신에게 필요한 말은?',
    options: [
      { text: '완벽하지 않아도 이미 충분히 애쓰고 있어요', type: 'ONE' as GrainType },
      { text: '당신이 건넨 다정함도 다시 돌아와야 해요', type: 'TWO' as GrainType },
      { text: '성과 바깥에서도 당신은 충분히 빛나요', type: 'THREE' as GrainType },
    ],
  },
  {
    title: '요즘 마음에 더 가까운 문장은?',
    options: [
      { text: '내 깊이를 설명하지 않아도 알아주는 문장이 필요해요', type: 'FOUR' as GrainType },
      { text: '조용하지만 오래 남는 질문이 필요해요', type: 'FIVE' as GrainType },
      { text: '함께 견딜 수 있다는 확신이 필요해요', type: 'SIX' as GrainType },
    ],
  },
  {
    title: '마지막으로,\n당신이 지금 붙잡고 싶은 감각은?',
    options: [
      { text: '아직 더 많은 세계가 남아 있다는 설렘', type: 'SEVEN' as GrainType },
      { text: '나의 힘을 좋은 방향으로 쓰고 있다는 확신', type: 'EIGHT' as GrainType },
      { text: '서두르지 않아도 괜찮다는 고요한 안정감', type: 'NINE' as GrainType },
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
    image: string
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
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
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
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
  },
}

const resultTypes = Object.values(RESULTS)
const heroImages = [
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
]

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
    }, 280)
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
    <div className="flex min-h-screen flex-col bg-[#f5efe3] text-ink">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-ink/8 bg-[#f5efe3]/88 px-5 backdrop-blur-md md:px-8">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-sm font-bold">글릿</span>
        </a>
        {stage === 'quiz' && <span className="font-mono text-xs text-sub/45">{step + 1} / {total}</span>}
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-8 md:px-8 md:py-12">
        {stage === 'intro' && (
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid overflow-hidden border border-ink/10 bg-[#fffaf1]/90 shadow-[0_34px_90px_rgba(46,43,40,0.09)] md:grid-cols-[0.92fr_1.08fr]">
              <div className="flex flex-col justify-between p-6 md:p-10 lg:p-12">
                <div>
                  <div className="mb-8 flex items-center gap-3">
                    <span className="h-px w-10 bg-coral/55" />
                    <p className="text-xs font-semibold uppercase text-coral">Glit Sentence Grain</p>
                  </div>
                  <p className="mb-5 text-sm italic leading-7 text-sub/65">
                    어떤 사람은 새벽 세 시의 문장에 위로받고, 어떤 사람은 낯선 도시의 첫 페이지에서 자신을 발견하죠.
                  </p>
                  <h1 className="max-w-xl text-4xl font-black leading-[1.13] text-ink md:text-5xl">
                    삶에는 저마다의
                    <br />
                    결이 있어요.
                  </h1>
                  <p className="mt-7 max-w-xl text-base leading-8 text-sub">
                    지금 당신에게 맞는 문장의 결을 찾아드릴게요. 아홉 개의 질문이 당신의 이야기를 듣고 싶어해요.
                  </p>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-sub/60">
                    81문항의 핵심을 45개 진술로 압축해 접근성은 낮추고, 문장 취향의 결은 선명하게 남겼습니다.
                    정답을 고르기보다, 요즘 마음이 오래 머무는 문장에 가까이 가보세요.
                  </p>
                </div>

                <div className="mt-9">
                  <div className="mb-4 grid grid-cols-3 border-y border-ink/10 py-4 text-center">
                    <div>
                      <p className="font-mono text-sm text-coral">45</p>
                      <p className="mt-1 text-xs text-sub/55">핵심 진술</p>
                    </div>
                    <div className="border-x border-ink/10">
                      <p className="font-mono text-sm text-coral">15</p>
                      <p className="mt-1 text-xs text-sub/55">번 선택</p>
                    </div>
                    <div>
                      <p className="font-mono text-sm text-coral">5m</p>
                      <p className="mt-1 text-xs text-sub/55">소요 시간</p>
                    </div>
                  </div>

                  <div className="border-2 border-coral/30 bg-ivory/70 p-4 shadow-[0_22px_52px_rgba(217,119,78,0.16)]">
                    <button
                      onClick={() => setStage('quiz')}
                      className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-coral px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(217,119,78,0.28)] transition-colors hover:bg-ink"
                    >
                      나의 결 찾기
                    </button>
                    <p className="mt-3 text-center text-xs leading-5 text-sub/55">
                      결과 화면을 캡처해 DM으로 보내면 큐레이션을 받아볼 수 있어요.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f4ecdd] p-4 md:p-6">
                <div className="grid h-full min-h-[30rem] gap-4 md:grid-cols-[1fr_0.82fr]">
                  <div className="relative overflow-hidden">
                    <img
                      src={heroImages[1]}
                      alt="따뜻한 빛 아래 놓인 책"
                      className="h-full min-h-[22rem] w-full object-cover sepia-[0.12] saturate-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="font-mono text-xs text-white/70">preview result</p>
                      <p className="mt-3 text-3xl font-black leading-tight">
                        깊이 느끼는
                        <br />
                        사람
                      </p>
                      <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
                        표면보다 바닥을 오래 들여다보는 사람.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="border border-ink/10 bg-[#fffaf1] p-5">
                      <p className="text-xs font-semibold uppercase text-coral">What you get</p>
                      <div className="mt-5 space-y-4">
                        {['문장 결 타입', '읽는 방식 리포트', '큐레이션 방향'].map((item, index) => (
                          <div key={item} className="flex items-center gap-3 border-b border-ink/8 pb-3 last:border-b-0 last:pb-0">
                            <span className="font-mono text-xs text-coral">0{index + 1}</span>
                            <span className="text-sm font-semibold text-ink">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <img
                      src={heroImages[0]}
                      alt="별빛이 보이는 밤하늘"
                      className="h-36 w-full object-cover sepia-[0.08] saturate-[0.9]"
                    />
                    <div className="grid grid-cols-[1fr_0.72fr] gap-4">
                      <img src={heroImages[2]} alt="고요한 숲길" className="h-28 w-full object-cover sepia-[0.18] saturate-[0.78]" />
                      <div className="border border-coral/20 bg-[#fffaf1] p-3">
                        <p className="font-mono text-xs text-coral">15</p>
                        <p className="mt-2 text-xs font-semibold leading-5 text-ink">questions for a quiet reading map</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {stage === 'quiz' && (
          <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[16rem_1fr]">
            <aside className="md:sticky md:top-24 md:self-start">
              <p className="font-mono text-6xl text-coral">{String(step + 1).padStart(2, '0')}</p>
              <p className="mt-2 text-xs uppercase text-sub/45">of {String(total).padStart(2, '0')}</p>
              <div className="mt-8 h-px overflow-hidden bg-ink/10">
                <div className="h-px bg-coral transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-6 text-sm leading-7 text-sub/55">
                한 화면에 세 개의 문장이 놓입니다. 오래 계산하지 말고, 가장 먼저 마음이 기우는 쪽을 골라주세요.
              </p>
            </aside>

            <div className="bg-[#fffaf1]/80 p-5 shadow-[0_24px_70px_rgba(46,43,40,0.07)] md:p-8">
              <p className="mb-6 text-xs uppercase text-coral">Question</p>
              <h2 className="mb-8 text-2xl font-black leading-snug text-ink md:text-4xl" style={{ whiteSpace: 'pre-line' }}>
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
                        'grid w-full grid-cols-[2.5rem_1fr] items-start gap-3 py-5 text-left text-sm leading-relaxed transition-all duration-200',
                        isChosen
                          ? 'bg-coral/8 text-ink shadow-[inset_3px_0_0_#D9774E]'
                          : isDimmed
                            ? 'text-sub/25'
                            : 'cursor-pointer text-sub hover:bg-white/45 hover:text-ink',
                      ].join(' ')}
                    >
                      <span className="pl-2 font-mono text-xs text-coral/70">0{index + 1}</span>
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
            <div className="bg-[#fffaf1]/90 p-5 shadow-[0_32px_90px_rgba(46,43,40,0.13)] md:p-10">
              <div className="border border-coral/20 p-5 md:p-8">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4 text-[0.65rem] uppercase text-sub/45">
                  <span>Glit Sentence Grain</span>
                  <span>Type {String(result.number).padStart(2, '0')}</span>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-[0.68fr_1fr] md:items-center">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-[7rem] bg-ivory shadow-[0_18px_44px_rgba(46,43,40,0.10)]">
                    <img
                      src={result.image}
                      alt={`${result.name}을 상징하는 무드 이미지`}
                      className="h-full w-full object-cover sepia-[0.16] saturate-[0.76]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/42 via-transparent to-white/14" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-4">
                      <p className="font-mono text-xs text-white/75">TYPE {String(result.number).padStart(2, '0')}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{result.original}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -right-2 -top-8 hidden h-24 w-24 rounded-full border border-coral/20 md:block" />
                    <div className="absolute right-12 top-12 hidden h-3 w-20 rounded-full bg-coral/20 md:block" />
                    <p className="text-sm font-semibold italic text-coral">{result.original}</p>
                    <h2 className="mt-3 max-w-lg text-3xl font-black leading-[1.18] text-ink md:text-5xl">{result.name}</h2>
                    <p className="mt-5 text-base italic leading-relaxed text-sub">당신은 {result.name}의 결을 가졌어요.</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {result.keywords.slice(0, 3).map((keyword) => (
                        <span key={keyword} className="rounded-full border border-coral/20 bg-coral/7 px-3 py-1 text-xs text-coral">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="my-8 border-y border-coral/25 bg-white/30 px-1 py-6">
                  <p className="text-xl font-bold leading-snug text-ink md:text-2xl">{result.signature}</p>
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
