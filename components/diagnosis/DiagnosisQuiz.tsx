'use client'

import { useEffect, useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import SiteFooter from '@/components/SiteFooter'

type GrainType = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'SIX' | 'SEVEN' | 'EIGHT' | 'NINE'
type Stage = 'intro' | 'quiz' | 'loading' | 'result'

type Question = {
  title: string
  options: { text: string; type: GrainType }[]
}

type Result = {
  number: number
  name: string
  oldName: string
  line: string
  editorNote: string
  description: string
  keywords: string[]
  image: string
  books: { title: string; author: string; reason: string }[]
}

const QUESTIONS: Question[] = [
  {
    title: '일이 흐트러질 때,\n당신에게 가장 가까운 반응은?',
    options: [
      { text: '먼저 기준을 세우고, 무엇이 바른 방향인지 정리한다', type: 'ONE' },
      { text: '주변 사람이 불편하지 않은지 먼저 살핀다', type: 'TWO' },
      { text: '멈추기보다 할 수 있는 일을 빠르게 찾아 움직인다', type: 'THREE' },
    ],
  },
  {
    title: '혼자 있을 때,\n마음이 자주 향하는 곳은?',
    options: [
      { text: '말로 다 못 한 감정의 깊은 곳', type: 'FOUR' },
      { text: '조용히 이해하고 싶은 생각의 방', type: 'FIVE' },
      { text: '앞으로 괜찮을지 점검하는 안전한 자리', type: 'SIX' },
    ],
  },
  {
    title: '새로운 선택 앞에서,\n당신이 더 끌리는 쪽은?',
    options: [
      { text: '아직 가보지 않은 가능성의 문', type: 'SEVEN' },
      { text: '피하지 않고 직접 부딪혀볼 수 있는 길', type: 'EIGHT' },
      { text: '서두르지 않아도 마음이 편안한 흐름', type: 'NINE' },
    ],
  },
  {
    title: '당신이 가장 자주 숨기는 마음은?',
    options: [
      { text: '더 잘하고 싶어서 스스로에게 엄격해지는 마음', type: 'ONE' },
      { text: '필요한 사람이 되고 싶어서 먼저 챙기는 마음', type: 'TWO' },
      { text: '뒤처질까 봐 계속 앞으로 나아가려는 마음', type: 'THREE' },
    ],
  },
  {
    title: '마음이 복잡할 때,\n당신에게 필요한 시간은?',
    options: [
      { text: '감정의 이름을 천천히 붙여보는 시간', type: 'FOUR' },
      { text: '방해받지 않고 생각을 정리하는 시간', type: 'FIVE' },
      { text: '믿을 수 있는 사람과 확인하고 안심하는 시간', type: 'SIX' },
    ],
  },
  {
    title: '삶이 답답해질 때,\n당신은 무엇을 찾나요?',
    options: [
      { text: '분위기를 바꿔줄 새로운 세계와 경험', type: 'SEVEN' },
      { text: '내가 지켜야 할 것과 밀고 나갈 힘', type: 'EIGHT' },
      { text: '소란이 가라앉고 다시 편안해지는 상태', type: 'NINE' },
    ],
  },
  {
    title: '좋은 문장을 만났을 때,\n오래 남는 이유는?',
    options: [
      { text: '흐트러진 마음을 바르게 정돈해줘서', type: 'ONE' },
      { text: '누군가의 마음을 더 다정하게 이해하게 해서', type: 'TWO' },
      { text: '다시 해볼 수 있겠다는 힘을 줘서', type: 'THREE' },
    ],
  },
  {
    title: '당신이 책에서 자주 찾는 것은?',
    options: [
      { text: '아름다움과 슬픔을 동시에 알아봐주는 문장', type: 'FOUR' },
      { text: '생각을 더 깊고 선명하게 만드는 질문', type: 'FIVE' },
      { text: '불안한 마음이 기대어 쉴 수 있는 문장', type: 'SIX' },
    ],
  },
  {
    title: '당신에게 힘이 되는 문장은?',
    options: [
      { text: '닫힌 문 너머의 다음 장면을 보여주는 문장', type: 'SEVEN' },
      { text: '두려움 앞에서도 한 걸음 내딛게 하는 문장', type: 'EIGHT' },
      { text: '고요 속에서 마음을 천천히 풀어주는 문장', type: 'NINE' },
    ],
  },
  {
    title: '관계 안에서,\n당신이 자주 맡는 역할은?',
    options: [
      { text: '흐려진 기준을 다시 세우는 사람', type: 'ONE' },
      { text: '먼저 손 내밀고 분위기를 살피는 사람', type: 'TWO' },
      { text: '목표를 향해 분위기를 움직이는 사람', type: 'THREE' },
    ],
  },
  {
    title: '타인이 보지 못하는 당신의 면은?',
    options: [
      { text: '생각보다 훨씬 깊고 오래 느낀다는 것', type: 'FOUR' },
      { text: '혼자 있어야 비로소 마음이 정리된다는 것', type: 'FIVE' },
      { text: '괜찮아 보여도 안쪽에서는 계속 확인하고 있다는 것', type: 'SIX' },
    ],
  },
  {
    title: '당신이 피곤해지는 순간은?',
    options: [
      { text: '재미와 가능성이 모두 닫힌 것처럼 느껴질 때', type: 'SEVEN' },
      { text: '부당한 상황 앞에서 아무것도 할 수 없을 때', type: 'EIGHT' },
      { text: '갈등이 커지고 마음의 평온이 깨질 때', type: 'NINE' },
    ],
  },
  {
    title: '지금 당신에게 필요한 말은?',
    options: [
      { text: '완벽하지 않아도 이미 충분히 애쓰고 있어요', type: 'ONE' },
      { text: '당신이 건넨 다정함도 다시 돌아와야 해요', type: 'TWO' },
      { text: '성과 바깥에서도 당신은 충분히 빛나요', type: 'THREE' },
    ],
  },
  {
    title: '요즘 마음에 더 가까운 문장은?',
    options: [
      { text: '내 깊이를 설명하지 않아도 알아주는 문장이 필요해요', type: 'FOUR' },
      { text: '조용하지만 오래 남는 질문이 필요해요', type: 'FIVE' },
      { text: '함께 견딜 수 있다는 확신이 필요해요', type: 'SIX' },
    ],
  },
  {
    title: '마지막으로,\n당신이 지금 붙잡고 싶은 감각은?',
    options: [
      { text: '아직 더 많은 세계가 남아 있다는 설렘', type: 'SEVEN' },
      { text: '나의 힘을 좋은 방향으로 쓰고 있다는 확신', type: 'EIGHT' },
      { text: '서두르지 않아도 괜찮다는 고요한 안정감', type: 'NINE' },
    ],
  },
]

const RESULTS: Record<GrainType, Result> = {
  ONE: {
    number: 1,
    name: '기준이 있는 사람',
    oldName: '개혁가',
    line: '흐트러진 마음에도 끝내 바른 문장을 찾는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 마음을 다그치기보다, 좋은 기준과 다정함을 함께 세워주는 문장이 어울려요.',
    description: '정돈된 세계를 좋아하고, 스스로에게 조금 엄격한 편이에요. 그래서 당신의 문장 결은 단정하지만 차갑지 않은 문장에 오래 머뭅니다.',
    keywords: ['기준', '정돈', '성실', '회복'],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '잠 못 이루는 밤을 위하여', author: '칼 힐티', reason: '흔들리는 밤에도 마음의 중심을 다시 세워주는 책' },
      { title: '월든', author: '헨리 데이비드 소로', reason: '단순한 삶이 가진 분명한 기준을 보여주는 고전' },
      { title: '나는 나로 살기로 했다', author: '김수현', reason: '스스로에게 너무 엄격했던 마음을 다정하게 풀어주는 책' },
    ],
  },
  TWO: {
    number: 2,
    name: '먼저 손 내미는 사람',
    oldName: '조력가',
    line: '타인의 온도를 먼저 알아차리는 다정한 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 돌봄 뒤에 남은 마음을 다시 당신에게 돌려주는 문장이 필요해요.',
    description: '관계의 미세한 온도를 잘 느끼고, 먼저 챙기는 데 익숙해요. 그래서 다정함을 소진이 아니라 힘으로 돌려주는 책이 잘 맞아요.',
    keywords: ['다정함', '돌봄', '연결', '온기'],
    image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '나는 나로 살기로 했다', author: '김수현', reason: '타인을 위해 살아온 시간 끝에 자신을 찾아가는 이야기' },
      { title: '아몬드', author: '손원평', reason: '감정을 배우는 과정을 통해 진짜 연결이 무엇인지 보여주는 소설' },
      { title: '82년생 김지영', author: '조남주', reason: '누군가를 돌보며 자신을 지워온 시간들에 대한 이야기' },
    ],
  },
  THREE: {
    number: 3,
    name: '앞을 향해 달리는 사람',
    oldName: '성취자',
    line: '멈추지 않는 속도 안에서도 자기 빛을 증명해온 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 성취 바깥에서도 충분히 빛난다는 사실을 알려주는 문장이 잘 맞아요.',
    description: '해야 할 일을 빠르게 찾아내고, 가능성을 현실로 옮기는 힘이 있어요. 지금은 속도를 다정하게 조율해주는 책이 필요합니다.',
    keywords: ['성장', '속도', '가능성', '성취'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '모든 것은 기본에서 시작한다', author: '손웅정', reason: '앞으로 나아가는 힘의 바탕을 다시 정돈하게 하는 책' },
      { title: '일의 기쁨과 슬픔', author: '장류진', reason: '성과와 일상 사이에서 일하는 마음을 현실적으로 비추는 소설' },
      { title: '월든', author: '헨리 데이비드 소로', reason: '속도 바깥의 삶을 다시 바라보게 하는 고전' },
    ],
  },
  FOUR: {
    number: 4,
    name: '깊이 느끼는 사람',
    oldName: '개인주의자',
    line: '표면보다 바닥을 오래 들여다보는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 감정의 깊이를 설명하지 않아도 알아주는 문장이 오래 남아요.',
    description: '아름다움과 슬픔이 같은 자리에 있다는 걸 아는 사람입니다. 고유한 감정을 잃지 않게 해주는 문장에 오래 머물러요.',
    keywords: ['깊이', '감정', '고유함', '아름다움'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '상실과 아름다움이 함께 남는 책' },
      { title: '참을 수 없는 존재의 가벼움', author: '밀란 쿤데라', reason: '사랑과 고유함의 무게를 오래 생각하게 하는 소설' },
      { title: '우리가 빛의 속도로 갈 수 없다면', author: '김초엽', reason: '외로움과 그리움을 섬세한 상상력으로 건드리는 책' },
    ],
  },
  FIVE: {
    number: 5,
    name: '혼자 생각하는 사람',
    oldName: '탐구자',
    line: '세상과 조금 떨어져야 비로소 선명하게 이해하는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 조용하지만 오래 남는 질문을 건네는 문장들이 잘 맞아요.',
    description: '쉽게 판단하지 않고 오래 관찰합니다. 혼자 있는 시간이 고립이 아니라 생각을 정리하는 방식에 가까워요.',
    keywords: ['사유', '관찰', '이해', '고독'],
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '월든', author: '헨리 데이비드 소로', reason: '혼자의 시간을 가장 충만하게 바꾸는 책' },
      { title: '침묵의 봄', author: '레이첼 카슨', reason: '관찰과 사유가 세계를 바꾸는 방식을 보여주는 책' },
      { title: '코스모스', author: '칼 세이건', reason: '생각의 방을 우주만큼 넓혀주는 고전' },
    ],
  },
  SIX: {
    number: 6,
    name: '곁을 지키는 사람',
    oldName: '충성가',
    line: '불안 속에서도 끝내 믿을 수 있는 자리를 찾는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 걱정을 지우는 말보다 함께 견딜 수 있다는 확신의 문장이 필요해요.',
    description: '관계와 약속의 무게를 아는 사람입니다. 오래 지키고, 미리 살피고, 쉽게 놓지 않는 마음을 가졌어요.',
    keywords: ['믿음', '곁', '안정', '약속'],
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '믿음과 관계의 책임을 따뜻하게 보여주는 책' },
      { title: '불안', author: '알랭 드 보통', reason: '불안을 조금 더 선명하게 이해하게 해주는 책' },
      { title: '아몬드', author: '손원평', reason: '불완전한 마음들이 서로의 곁이 되어가는 소설' },
    ],
  },
  SEVEN: {
    number: 7,
    name: '더 많은 세계를 원하는 사람',
    oldName: '열정가',
    line: '열린 문 앞에서 늘 다음 장면을 상상하는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 설렘을 가볍게 흘려보내지 않고 오래 확장해주는 문장이 어울려요.',
    description: '한 가지 색에만 머무르기보다 더 넓은 감각을 향해 움직입니다. 자유롭지만 깊이도 놓치고 싶지 않은 결이에요.',
    keywords: ['확장', '설렘', '자유', '가능성'],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '여행의 이유', author: '김영하', reason: '낯선 세계를 향한 마음을 문장으로 확장해주는 책' },
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '낯선 별을 건너며 세계를 넓혀주는 이야기' },
      { title: '우리가 빛의 속도로 갈 수 없다면', author: '김초엽', reason: '상상력으로 더 먼 가능성을 열어주는 책' },
    ],
  },
  EIGHT: {
    number: 8,
    name: '부딪혀 나아가는 사람',
    oldName: '도전자',
    line: '두려움을 피하기보다 정면으로 통과하려는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 힘을 더 세게 만드는 말보다, 그 힘의 방향을 밝혀주는 문장이 잘 맞아요.',
    description: '강하게 밀고 나가는 힘이 있고, 부당한 것 앞에서 쉽게 물러서지 않습니다. 지금은 힘의 온도를 정돈해주는 책이 좋습니다.',
    keywords: ['힘', '용기', '정면', '보호'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '월든', author: '헨리 데이비드 소로', reason: '강함을 자기만의 삶으로 정돈하게 하는 책' },
      { title: '채식주의자', author: '한강', reason: '부딪힘과 저항의 감각을 강렬하게 남기는 소설' },
      { title: '소년이 온다', author: '한강', reason: '지켜야 할 것 앞에서 물러서지 않는 마음을 생각하게 하는 책' },
    ],
  },
  NINE: {
    number: 9,
    name: '고요 속에 머무는 사람',
    oldName: '평화주의자',
    line: '서두르지 않는 마음으로 오래 곁에 머무는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 고요를 무력함이 아니라 충만함으로 바꿔주는 문장이 필요해요.',
    description: '소란보다 평온을, 빠른 답보다 천천히 맞춰지는 리듬을 믿습니다. 당신의 결은 조용하지만 깊게 남아요.',
    keywords: ['고요', '평온', '수용', '리듬'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
    books: [
      { title: '월든', author: '헨리 데이비드 소로', reason: '고요한 삶이 가진 충만함을 보여주는 책' },
      { title: '모순', author: '양귀자', reason: '삶의 엇갈림을 조용히 품어보게 하는 소설' },
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '작고 조용한 것의 소중함을 다시 알려주는 책' },
    ],
  },
}

const introImages = [
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

  const result = RESULTS[resultType]
  const total = QUESTIONS.length
  const progress = stage === 'quiz' ? ((step + 1) / total) * 100 : 100

  useEffect(() => {
    if (stage !== 'loading') return

    const timer = window.setTimeout(() => {
      setStage('result')
    }, 1400)

    return () => window.clearTimeout(timer)
  }, [stage])

  const handleSelect = (type: GrainType) => {
    if (selected) return
    setSelected(type)

    window.setTimeout(() => {
      const newAnswers = [...answers, type]
      setAnswers(newAnswers)

      if (step < total - 1) {
        setStep((current) => current + 1)
        setSelected(null)
      } else {
        setResultType(calcResult(newAnswers))
        setStage('loading')
        setSelected(null)
      }
    }, 260)
  }

  const handleReset = () => {
    setStage('intro')
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResultType('FOUR')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5efe3] text-ink">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-ink/8 bg-[#f5efe3]/88 px-5 backdrop-blur-md md:px-8">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-sm font-bold">글릿</span>
        </a>
        {(stage === 'quiz' || stage === 'loading') && (
          <span className="font-mono text-xs text-sub/45">{stage === 'quiz' ? `${step + 1} / ${total}` : 'reading your grain'}</span>
        )}
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-8 md:px-8 md:py-12">
        {stage === 'intro' && (
          <section className="mx-auto grid w-full max-w-6xl overflow-hidden border border-ink/10 bg-[#fffaf1]/92 shadow-[0_34px_90px_rgba(46,43,40,0.09)] md:grid-cols-[0.9fr_1.1fr]">
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
                  지금 당신에게 맞는 문장의 결을 찾아드릴게요. 열다섯 개의 질문이 당신의 이야기를 듣고 싶어해요.
                </p>
                <p className="mt-4 max-w-lg text-sm leading-7 text-sub/60">
                  81문항의 핵심을 45개 진술로 압축해 지금 마음의 리듬과 문장 취향을 살펴봅니다. 정답을 고르기보다,
                  요즘 마음이 오래 머무는 문장에 가까이 가보세요.
                </p>
              </div>

              <div className="mt-9 border-2 border-coral/30 bg-ivory/70 p-4 shadow-[0_22px_52px_rgba(217,119,78,0.16)] sm:inline-flex sm:items-center sm:gap-4">
                <button
                  onClick={() => setStage('quiz')}
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-coral px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(217,119,78,0.28)] transition-colors hover:bg-ink sm:w-auto"
                >
                  나의 결 찾기
                </button>
                <p className="mt-3 text-xs leading-5 text-sub/55 sm:mt-0">
                  결과 화면을 캡처해 DM으로 보내면 책 큐레이션을 받아볼 수 있어요.
                </p>
              </div>
            </div>

            <div className="grid gap-4 bg-[#f4ecdd] p-4 md:grid-cols-[1fr_0.78fr] md:p-6">
              <div className="relative min-h-[28rem] overflow-hidden rounded-t-[9rem]">
                <img src={introImages[1]} alt="따뜻한 빛 아래 놓인 책" className="h-full w-full object-cover sepia-[0.12] saturate-[0.86]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/68 via-transparent to-white/10" />
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="font-mono text-xs text-white/70">9 glit types</p>
                  <p className="mt-3 text-3xl font-black leading-tight">문장 속으로<br />천천히 들어가기</p>
                </div>
              </div>
              <div className="grid gap-4">
                <img src={introImages[0]} alt="별이 보이는 밤하늘" className="h-40 w-full object-cover sepia-[0.08] saturate-[0.9]" />
                <div className="border border-ink/10 bg-[#fffaf1] p-5">
                  <p className="text-xs font-semibold uppercase text-coral">How it works</p>
                  <div className="mt-5 space-y-4 text-sm font-semibold text-ink">
                    <p>01. 15개 질문 선택</p>
                    <p>02. 결의 방향 분석</p>
                    <p>03. 책 3권 큐레이션</p>
                  </div>
                </div>
                <img src={introImages[2]} alt="고요한 숲길" className="h-32 w-full object-cover sepia-[0.18] saturate-[0.78]" />
              </div>
            </div>
          </section>
        )}

        {stage === 'quiz' && (
          <section className="mx-auto w-full max-w-4xl">
            <div className="mb-7">
              <div className="mb-3 flex items-center justify-between text-xs text-sub/45">
                <span className="font-mono">QUESTION {String(step + 1).padStart(2, '0')}</span>
                <span className="font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-coral transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="border border-ink/10 bg-[#fffaf1]/88 p-5 shadow-[0_24px_70px_rgba(46,43,40,0.07)] md:p-9">
              <p className="mb-5 text-xs font-semibold uppercase text-coral">문장 결 질문</p>
              <h2 className="mb-8 text-2xl font-black leading-snug text-ink md:text-4xl">{QUESTIONS[step].title}</h2>

              <div className="grid gap-3">
                {QUESTIONS[step].options.map((option, index) => {
                  const isChosen = selected === option.type
                  const isDimmed = !!selected && !isChosen

                  return (
                    <button
                      key={option.text}
                      onClick={() => handleSelect(option.type)}
                      disabled={!!selected}
                      className={[
                        'grid min-h-[4.25rem] w-full grid-cols-[2.5rem_1fr] items-center gap-3 border border-ink/10 bg-white/35 px-4 py-4 text-left text-sm leading-relaxed transition-all duration-200',
                        isChosen
                          ? 'border-coral/45 bg-coral/10 text-ink shadow-[inset_4px_0_0_#D9774E]'
                          : isDimmed
                            ? 'text-sub/25'
                            : 'cursor-pointer text-sub hover:border-coral/30 hover:bg-white/70 hover:text-ink',
                      ].join(' ')}
                    >
                      <span className="font-mono text-xs text-coral/75">0{index + 1}</span>
                      <span>{option.text}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {stage === 'loading' && (
          <section className="mx-auto flex min-h-[28rem] w-full max-w-3xl flex-col items-center justify-center border border-coral/20 bg-[#fffaf1]/90 px-6 text-center shadow-[0_34px_90px_rgba(46,43,40,0.10)]">
            <div className="mb-8 flex items-center gap-4 text-coral">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className="block h-3 w-3 rotate-45 bg-coral animate-pulse"
                  style={{ animationDelay: `${item * 180}ms` }}
                />
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-coral">Glit is reading</p>
            <h2 className="mt-5 text-3xl font-black leading-snug text-ink md:text-5xl">당신의 문장 결을 찾고 있어요</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-sub/60">
              선택한 문장들의 방향을 모아, 지금 가장 가까운 결과 어울리는 책을 고르고 있어요.
            </p>
          </section>
        )}

        {stage === 'result' && (
          <section className="mx-auto w-full max-w-4xl overflow-hidden bg-[#292925] text-[#f7f0df] shadow-[0_34px_90px_rgba(30,28,24,0.24)]">
            <div className="h-3 bg-[#dfa080]" />
            <div className="px-6 py-8 md:px-12 md:py-12">
              <div className="flex items-center justify-between border-b border-white/10 pb-5 text-[0.65rem] uppercase tracking-[0.18em] text-[#b7b0a2]">
                <span>Glit Sentence Grain</span>
                <span>Type {String(result.number).padStart(2, '0')} · {result.oldName}</span>
              </div>

              <div className="mt-9 grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-end">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[7rem]">
                  <img src={result.image} alt={`${result.name}을 상징하는 무드 이미지`} className="h-full w-full object-cover sepia-[0.2] saturate-[0.72]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292925]/72 via-transparent to-transparent" />
                </div>
                <div>
                  <p className="text-sm font-semibold italic text-[#dfa080]">{result.oldName}</p>
                  <h2 className="mt-3 text-3xl font-black leading-[1.18] md:text-5xl">{result.name}</h2>
                  <p className="mt-5 text-base italic leading-8 text-[#d8d0bf]">당신은 {result.name}의 결을 가졌어요.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {result.keywords.map((keyword) => (
                      <span key={keyword} className="rounded-full border border-[#dfa080]/35 px-3 py-1 text-xs text-[#dfa080]">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 border-l-2 border-[#ffd67d] bg-white/[0.04] px-6 py-6 md:px-8">
                <p className="text-xl font-medium italic leading-10 md:text-2xl">"{result.editorNote.replace('글릿 에디터 코멘트: ', '')}"</p>
                <p className="mt-5 text-sm text-[#9f988c]">— glit 에디터</p>
              </div>

              <p className="mt-8 text-sm leading-8 text-[#d8d0bf]">{result.description}</p>

              <div className="mt-12 flex items-center gap-4">
                <p className="shrink-0 text-xs font-semibold tracking-[0.22em] text-[#ffd67d]">글릿이 고른 책</p>
                <div className="h-px flex-1 bg-white/14" />
              </div>

              <div className="mt-8 divide-y divide-white/10">
                {result.books.map((book, index) => (
                  <article key={book.title} className="grid gap-4 py-7 md:grid-cols-[3rem_1fr]">
                    <p className="font-mono text-sm text-[#9f988c]">0{index + 1}</p>
                    <div>
                      <h3 className="text-xl font-black leading-8">「{book.title}」</h3>
                      <p className="mt-2 text-sm text-[#a9a293]">{book.author}</p>
                      <p className="mt-4 text-base leading-8 text-[#d8d0bf]">{book.reason}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-12 border border-white/14 px-6 py-9 text-center md:px-12">
                <h3 className="text-2xl font-black leading-9">더 깊은 큐레이션을<br />받고 싶다면</h3>
                <p className="mt-5 text-sm leading-8 text-[#d8d0bf]">
                  이 결과를 캡처해서 글릿 인스타그램으로 DM을 보내주세요.
                  <br />
                  당신의 결에 맞는 책 목록을 48시간 안에 전달드릴게요.
                </p>
                <a
                  href="https://instagram.com/gleamit_glit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto mt-8 inline-flex min-h-14 items-center justify-center bg-[#dfa080] px-12 text-sm font-bold text-[#292925] transition-colors hover:bg-[#f0c09f]"
                >
                  @glit 으로 DM 보내기
                </a>
              </div>

              <button
                onClick={handleReset}
                className="mt-8 w-full border border-white/14 px-7 py-4 text-sm font-medium text-[#f7f0df] transition-colors hover:border-[#dfa080] hover:text-[#dfa080]"
              >
                처음부터 다시 하기
              </button>

              <p className="mt-10 text-center text-xs leading-6 text-[#8f887b]">
                이 검사는 의학적·심리학적 진단이 아니라, 글릿이 제안하는 문장 취향 큐레이션입니다.
              </p>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
