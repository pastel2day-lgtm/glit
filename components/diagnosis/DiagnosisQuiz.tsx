'use client'

import { useEffect, useState } from 'react'
import SiteFooter from '@/components/SiteFooter'
import { Cloud, FeltDiamond, FeltFilter, HillScene, Leaf } from '@/components/autumn/Felt'
import CurationApplyForm from '@/components/diagnosis/CurationApplyForm'
import GrainScoreChart from '@/components/diagnosis/GrainScoreChart'
import { sentences as archiveSentences } from '@/lib/sentences'

type GrainType = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'SIX' | 'SEVEN' | 'EIGHT' | 'NINE'
type Stage = 'intro' | 'quiz' | 'tiebreak' | 'loading' | 'result'

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
  // 결과지 펠트 배지의 바탕색(color)과 그 위 글자색(text)
  color: string
  text: string
  books: { title: string; author: string; reason: string }[]
  profile: {
    summary: string
    desire: string
    fear: string
    growth: string
    stress: string
  }
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
    title: '지금 붙잡고 싶은 감각은?',
    options: [
      { text: '아직 더 많은 세계가 남아 있다는 설렘', type: 'SEVEN' },
      { text: '나의 힘을 좋은 방향으로 쓰고 있다는 확신', type: 'EIGHT' },
      { text: '서두르지 않아도 괜찮다는 고요한 안정감', type: 'NINE' },
    ],
  },
  {
    title: '하루가 끝난 뒤,\n스스로에게 가장 먼저 하는 말은?',
    options: [
      { text: '오늘 더 잘할 수 있었던 부분을 조용히 돌아본다', type: 'ONE' },
      { text: '내가 누군가에게 도움이 되었는지 떠올린다', type: 'TWO' },
      { text: '내일은 무엇을 더 해낼 수 있을지 생각한다', type: 'THREE' },
    ],
  },
  {
    title: '마음이 오래 머무는 장면은?',
    options: [
      { text: '이름 붙이기 어려운 감정이 선명해지는 순간', type: 'FOUR' },
      { text: '혼자만의 조용한 방에서 생각이 정리되는 순간', type: 'FIVE' },
      { text: '불안하던 마음에 확실한 약속이 생기는 순간', type: 'SIX' },
    ],
  },
  {
    title: '낯선 곳에 도착했을 때,\n당신이 먼저 느끼는 것은?',
    options: [
      { text: '새로운 일이 시작될 것 같은 기대감', type: 'SEVEN' },
      { text: '이곳에서 내가 지켜야 할 선과 힘', type: 'EIGHT' },
      { text: '천천히 적응하며 분위기를 읽고 싶은 마음', type: 'NINE' },
    ],
  },
  {
    title: '칭찬을 들었을 때,\n더 오래 남는 말은?',
    options: [
      { text: '당신은 참 성실하고 믿을 만해요', type: 'ONE' },
      { text: '당신 덕분에 마음이 놓였어요', type: 'TWO' },
      { text: '당신은 결국 해내는 사람이에요', type: 'THREE' },
    ],
  },
  {
    title: '문장을 고를 때,\n무의식적으로 끌리는 결은?',
    options: [
      { text: '슬픔과 아름다움이 같은 자리에 있는 결', type: 'FOUR' },
      { text: '설명보다 질문을 오래 남기는 결', type: 'FIVE' },
      { text: '불안을 지나 안심으로 데려가는 결', type: 'SIX' },
    ],
  },
  {
    title: '누군가가 당신을 말한다면,\n가장 가까운 표현은?',
    options: [
      { text: '언제나 새로운 이야기를 꺼내는 사람', type: 'SEVEN' },
      { text: '필요한 순간 앞에 서는 사람', type: 'EIGHT' },
      { text: '곁에 있으면 마음이 조용해지는 사람', type: 'NINE' },
    ],
  },
  {
    title: '선택이 어려울 때,\n당신이 기대는 기준은?',
    options: [
      { text: '무엇이 더 올바르고 납득 가능한가', type: 'ONE' },
      { text: '누가 상처받지 않고 함께 갈 수 있는가', type: 'TWO' },
      { text: '어떤 선택이 나를 더 앞으로 데려가는가', type: 'THREE' },
    ],
  },
  {
    title: '좋아하는 책을 오래 기억하는 방식은?',
    options: [
      { text: '그때의 감정과 분위기까지 함께 기억한다', type: 'FOUR' },
      { text: '책이 남긴 질문과 생각의 구조를 기억한다', type: 'FIVE' },
      { text: '그 책이 내게 준 안정감과 확신을 기억한다', type: 'SIX' },
    ],
  },
  {
    title: '마음이 살아난다고 느끼는 순간은?',
    options: [
      { text: '새로운 가능성이 한꺼번에 열릴 때', type: 'SEVEN' },
      { text: '피하지 않고 정면으로 말했을 때', type: 'EIGHT' },
      { text: '갈등이 잦아들고 마음이 부드러워질 때', type: 'NINE' },
    ],
  },
  {
    title: '혼란스러운 상황에서,\n당신이 자연스럽게 하는 일은?',
    options: [
      { text: '흐트러진 것들을 기준에 맞게 정리한다', type: 'ONE' },
      { text: '사람들의 마음과 분위기를 먼저 살핀다', type: 'TWO' },
      { text: '가장 빠르게 해결할 수 있는 방법을 찾는다', type: 'THREE' },
    ],
  },
  {
    title: '당신이 혼자만 알고 있는 바람은?',
    options: [
      { text: '내 마음의 깊이를 누군가 알아봐주었으면 한다', type: 'FOUR' },
      { text: '아무 방해 없이 끝까지 생각해보고 싶다', type: 'FIVE' },
      { text: '믿어도 되는 사람이 곁에 있다는 확신을 원한다', type: 'SIX' },
    ],
  },
  {
    title: '휴식이 필요할 때,\n가장 가까운 장면은?',
    options: [
      { text: '낯선 도시를 걷거나 새로운 계획을 세우는 장면', type: 'SEVEN' },
      { text: '몸을 움직이며 다시 힘을 되찾는 장면', type: 'EIGHT' },
      { text: '조용한 공간에서 천천히 숨을 고르는 장면', type: 'NINE' },
    ],
  },
  {
    title: '당신이 지키고 싶은 삶의 태도는?',
    options: [
      { text: '대충 넘기지 않고 바르게 살아가려는 태도', type: 'ONE' },
      { text: '무심해지지 않고 다정하게 건네는 태도', type: 'TWO' },
      { text: '멈추지 않고 스스로를 성장시키려는 태도', type: 'THREE' },
    ],
  },
  {
    title: '밤에 더 잘 어울리는 문장은?',
    options: [
      { text: '내가 느낀 슬픔에도 이름이 있다는 문장', type: 'FOUR' },
      { text: '아무도 방해하지 않는 생각의 불빛 같은 문장', type: 'FIVE' },
      { text: '혼자가 아니라는 사실을 조용히 알려주는 문장', type: 'SIX' },
    ],
  },
  {
    title: '다음 페이지를 넘기게 하는 힘은?',
    options: [
      { text: '아직 끝나지 않은 모험이 남아 있다는 기대', type: 'SEVEN' },
      { text: '부딪혀도 물러서지 않겠다는 마음', type: 'EIGHT' },
      { text: '조금씩 괜찮아질 거라는 느린 믿음', type: 'NINE' },
    ],
  },
  {
    title: '실수했을 때,\n가장 먼저 드는 생각은?',
    options: [
      { text: '어디서 어긋났는지 정확히 고쳐야 한다', type: 'ONE' },
      { text: '혹시 누군가에게 불편을 준 건 아닌지 걱정된다', type: 'TWO' },
      { text: '빨리 회복해서 다시 결과를 만들어야 한다', type: 'THREE' },
    ],
  },
  {
    title: '누군가의 이야기를 들을 때,\n당신이 오래 붙잡는 것은?',
    options: [
      { text: '말 아래 숨어 있는 진짜 감정', type: 'FOUR' },
      { text: '그 이야기를 이루는 맥락과 이유', type: 'FIVE' },
      { text: '앞으로 괜찮아질 수 있는 근거', type: 'SIX' },
    ],
  },
  {
    title: '마음이 답답할 때,\n당신에게 필요한 문은?',
    options: [
      { text: '상상하지 못한 세계로 나가는 문', type: 'SEVEN' },
      { text: '두려움을 지나 힘을 확인하는 문', type: 'EIGHT' },
      { text: '조용히 마음을 쉬게 하는 문', type: 'NINE' },
    ],
  },
  {
    title: '당신의 문장 결에 가까운 속도는?',
    options: [
      { text: '흐트러진 곳을 차분히 바로잡는 속도', type: 'ONE' },
      { text: '상대의 마음에 맞춰 조금 늦추는 속도', type: 'TWO' },
      { text: '목표를 향해 빠르게 움직이는 속도', type: 'THREE' },
    ],
  },
  {
    title: '읽고 난 뒤 마음에 남았으면 하는 것은?',
    options: [
      { text: '내 감정이 틀리지 않았다는 작은 확인', type: 'FOUR' },
      { text: '오래 생각하고 싶은 조용한 질문', type: 'FIVE' },
      { text: '내가 기대어도 되는 안정된 문장', type: 'SIX' },
    ],
  },
  {
    title: '마지막으로,\n지금 당신이 더 원하는 것은?',
    options: [
      { text: '더 넓은 세계를 향한 설렘', type: 'SEVEN' },
      { text: '내 힘을 믿고 나아가는 용기', type: 'EIGHT' },
      { text: '서두르지 않아도 괜찮은 고요', type: 'NINE' },
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
    color: '#6F7D35',
    text: '#F7F0E2',
    books: [
      { title: '잠 못 이루는 밤을 위하여', author: '칼 힐티', reason: '흔들리는 밤에도 마음의 중심을 다시 세워주는 책' },
      { title: '월든', author: '헨리 데이비드 소로', reason: '단순한 삶이 가진 분명한 기준을 보여주는 고전' },
      { title: '나는 나로 살기로 했다', author: '김수현', reason: '스스로에게 너무 엄격했던 마음을 다정하게 풀어주는 책' },
    ],
    profile: {
      summary: '옳고 그름에 대한 감각이 뚜렷하고, 세상을 조금 더 낫게 만들고 싶어 하는 유형이에요. 스스로에게 높은 기준을 두는 만큼, 마음속 비판의 목소리도 큰 편이에요.',
      desire: '옳고 선한 사람이 되는 것',
      fear: '잘못되었거나 부족한 사람이 되는 것',
      growth: '완벽하지 않아도 지금을 즐기고, 새로운 가능성에 마음을 열어요.',
      stress: '감정에 깊이 가라앉아, 아무도 나를 이해하지 못한다고 느끼기 쉬워요.',
    },
  },
  TWO: {
    number: 2,
    name: '먼저 손 내미는 사람',
    oldName: '조력가',
    line: '타인의 온도를 먼저 알아차리는 다정한 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 돌봄 뒤에 남은 마음을 다시 당신에게 돌려주는 문장이 필요해요.',
    description: '관계의 미세한 온도를 잘 느끼고, 먼저 챙기는 데 익숙해요. 그래서 다정함을 소진이 아니라 힘으로 돌려주는 책이 잘 맞아요.',
    keywords: ['다정함', '돌봄', '연결', '온기'],
    color: '#C9663F',
    text: '#FFF6E8',
    books: [
      { title: '나는 나로 살기로 했다', author: '김수현', reason: '타인을 위해 살아온 시간 끝에 자신을 찾아가는 이야기' },
      { title: '아몬드', author: '손원평', reason: '감정을 배우는 과정을 통해 진짜 연결이 무엇인지 보여주는 소설' },
      { title: '82년생 김지영', author: '조남주', reason: '누군가를 돌보며 자신을 지워온 시간들에 대한 이야기' },
    ],
    profile: {
      summary: '다른 사람의 필요를 누구보다 먼저 알아차리고 기꺼이 돕는 유형이에요. 사랑받고 필요한 존재가 되고 싶은 마음이 큰 만큼, 정작 자신의 필요는 뒤로 미루기 쉬워요.',
      desire: '사랑받고, 필요한 존재가 되는 것',
      fear: '사랑받을 가치가 없는 사람이 되는 것',
      growth: '남의 필요만큼 나의 감정과 필요도 솔직하게 들여다봐요.',
      stress: '서운함이 쌓이면 상대를 몰아붙이거나 통제하려 들기도 해요.',
    },
  },
  THREE: {
    number: 3,
    name: '앞을 향해 달리는 사람',
    oldName: '성취자',
    line: '멈추지 않는 속도 안에서도 자기 빛을 증명해온 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 성취 바깥에서도 충분히 빛난다는 사실을 알려주는 문장이 잘 맞아요.',
    description: '해야 할 일을 빠르게 찾아내고, 가능성을 현실로 옮기는 힘이 있어요. 지금은 속도를 다정하게 조율해주는 책이 필요합니다.',
    keywords: ['성장', '속도', '가능성', '성취'],
    color: '#DDA03A',
    text: '#3A2E25',
    books: [
      { title: '모든 것은 기본에서 시작한다', author: '손웅정', reason: '앞으로 나아가는 힘의 바탕을 다시 정돈하게 하는 책' },
      { title: '일의 기쁨과 슬픔', author: '장류진', reason: '성과와 일상 사이에서 일하는 마음을 현실적으로 비추는 소설' },
      { title: '월든', author: '헨리 데이비드 소로', reason: '속도 바깥의 삶을 다시 바라보게 하는 고전' },
    ],
    profile: {
      summary: '목표를 세우고 이루는 데 탁월하고, 상황에 맞춰 자신을 빠르게 조율하는 유형이에요. 가치 있는 사람으로 인정받고 싶은 마음이 커서, 성과와 나 자신을 같은 것으로 여기기 쉬워요.',
      desire: '가치 있는 사람으로 인정받는 것',
      fear: '아무 가치도 없는 사람이 되는 것',
      growth: '혼자 빛나기보다 사람들과 함께 가는 일에서 의미를 찾아요.',
      stress: '갑자기 무기력해지고, 해야 할 일에서 멀어지기 쉬워요.',
    },
  },
  FOUR: {
    number: 4,
    name: '깊이 느끼는 사람',
    oldName: '개인주의자',
    line: '표면보다 바닥을 오래 들여다보는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 감정의 깊이를 설명하지 않아도 알아주는 문장이 오래 남아요.',
    description: '아름다움과 슬픔이 같은 자리에 있다는 걸 아는 사람입니다. 고유한 감정을 잃지 않게 해주는 문장에 오래 머물러요.',
    keywords: ['깊이', '감정', '고유함', '아름다움'],
    color: '#3B3557',
    text: '#F4E9D3',
    books: [
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '상실과 아름다움이 함께 남는 책' },
      { title: '참을 수 없는 존재의 가벼움', author: '밀란 쿤데라', reason: '사랑과 고유함의 무게를 오래 생각하게 하는 소설' },
      { title: '우리가 빛의 속도로 갈 수 없다면', author: '김초엽', reason: '외로움과 그리움을 섬세한 상상력으로 건드리는 책' },
    ],
    profile: {
      summary: '자신만의 고유한 정체성과 감정의 진실함을 소중히 여기는 유형이에요. 무언가 빠져 있다는 느낌 속에서, 아름다움과 의미를 찾아가요.',
      desire: '나만의 고유한 의미와 정체성을 찾는 것',
      fear: '정체성도, 의미도 없는 사람이 되는 것',
      growth: '감정에 머물기보다 원칙을 세우고 꾸준히 행동으로 옮겨요.',
      stress: '인정받고 싶은 마음에 상대에게 지나치게 매달리기 쉬워요.',
    },
  },
  FIVE: {
    number: 5,
    name: '혼자 생각하는 사람',
    oldName: '탐구자',
    line: '세상과 조금 떨어져야 비로소 선명하게 이해하는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 조용하지만 오래 남는 질문을 건네는 문장들이 잘 맞아요.',
    description: '쉽게 판단하지 않고 오래 관찰합니다. 혼자 있는 시간이 고립이 아니라 생각을 정리하는 방식에 가까워요.',
    keywords: ['사유', '관찰', '이해', '고독'],
    color: '#5F86A6',
    text: '#F7F0E2',
    books: [
      { title: '월든', author: '헨리 데이비드 소로', reason: '혼자의 시간을 가장 충만하게 바꾸는 책' },
      { title: '침묵의 봄', author: '레이첼 카슨', reason: '관찰과 사유가 세계를 바꾸는 방식을 보여주는 책' },
      { title: '코스모스', author: '칼 세이건', reason: '생각의 방을 우주만큼 넓혀주는 고전' },
    ],
    profile: {
      summary: '세상을 관찰하고 이해할 때 안전하다고 느끼는 유형이에요. 시간과 에너지를 아껴 쓰며, 한 분야를 깊이 파고들어 자기만의 지식과 통찰을 쌓아가요.',
      desire: '유능하고, 세상을 이해하는 사람이 되는 것',
      fear: '무능하고 쓸모없는 사람이 되는 것',
      growth: '생각에만 머물지 않고 자신 있게 행동으로 옮겨요.',
      stress: '생각이 흩어지고 산만해지며, 이것저것으로 마음을 돌리기 쉬워요.',
    },
  },
  SIX: {
    number: 6,
    name: '곁을 지키는 사람',
    oldName: '충성가',
    line: '불안 속에서도 끝내 믿을 수 있는 자리를 찾는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 걱정을 지우는 말보다 함께 견딜 수 있다는 확신의 문장이 필요해요.',
    description: '관계와 약속의 무게를 아는 사람입니다. 오래 지키고, 미리 살피고, 쉽게 놓지 않는 마음을 가졌어요.',
    keywords: ['믿음', '곁', '안정', '약속'],
    color: '#6B4A32',
    text: '#F4E9D3',
    books: [
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '믿음과 관계의 책임을 따뜻하게 보여주는 책' },
      { title: '불안', author: '알랭 드 보통', reason: '불안을 조금 더 선명하게 이해하게 해주는 책' },
      { title: '아몬드', author: '손원평', reason: '불완전한 마음들이 서로의 곁이 되어가는 소설' },
    ],
    profile: {
      summary: '신뢰와 안전을 중요하게 여기고, 믿을 수 있는 사람과 공동체에 깊이 헌신하는 유형이에요. 위험을 미리 내다보는 만큼, 걱정과 의심이 함께 따라오기도 해요.',
      desire: '안전하고, 믿을 수 있는 지지를 얻는 것',
      fear: '기댈 곳 없이 혼자 남겨지는 것',
      growth: '걱정을 내려놓고, 편안하게 믿고 기댈 수 있게 돼요.',
      stress: '불안을 감추려 일에 몰두하거나 지나치게 경쟁적으로 변하기 쉬워요.',
    },
  },
  SEVEN: {
    number: 7,
    name: '더 많은 세계를 원하는 사람',
    oldName: '열정가',
    line: '열린 문 앞에서 늘 다음 장면을 상상하는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 설렘을 가볍게 흘려보내지 않고 오래 확장해주는 문장이 어울려요.',
    description: '한 가지 색에만 머무르기보다 더 넓은 감각을 향해 움직입니다. 자유롭지만 깊이도 놓치고 싶지 않은 결이에요.',
    keywords: ['확장', '설렘', '자유', '가능성'],
    color: '#E9B52F',
    text: '#3A2E25',
    books: [
      { title: '여행의 이유', author: '김영하', reason: '낯선 세계를 향한 마음을 문장으로 확장해주는 책' },
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '낯선 별을 건너며 세계를 넓혀주는 이야기' },
      { title: '우리가 빛의 속도로 갈 수 없다면', author: '김초엽', reason: '상상력으로 더 먼 가능성을 열어주는 책' },
    ],
    profile: {
      summary: '새로운 경험과 가능성에서 에너지를 얻는 유형이에요. 고통과 지루함을 피하고 싶은 마음에, 다음 즐거움으로 빠르게 옮겨 가기도 해요.',
      desire: '만족스럽고 충만한 삶을 누리는 것',
      fear: '결핍과 고통 속에 갇히는 것',
      growth: '한 가지에 깊이 몰입하고, 차분하게 생각을 쌓아가요.',
      stress: '예민하고 비판적으로 변해 사소한 것까지 따지기 쉬워요.',
    },
  },
  EIGHT: {
    number: 8,
    name: '부딪혀 나아가는 사람',
    oldName: '도전자',
    line: '두려움을 피하기보다 정면으로 통과하려는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 힘을 더 세게 만드는 말보다, 그 힘의 방향을 밝혀주는 문장이 잘 맞아요.',
    description: '강하게 밀고 나가는 힘이 있고, 부당한 것 앞에서 쉽게 물러서지 않습니다. 지금은 힘의 온도를 정돈해주는 책이 좋습니다.',
    keywords: ['힘', '용기', '정면', '보호'],
    color: '#9E4430',
    text: '#F7F0E2',
    books: [
      { title: '월든', author: '헨리 데이비드 소로', reason: '강함을 자기만의 삶으로 정돈하게 하는 책' },
      { title: '채식주의자', author: '한강', reason: '부딪힘과 저항의 감각을 강렬하게 남기는 소설' },
      { title: '소년이 온다', author: '한강', reason: '지켜야 할 것 앞에서 물러서지 않는 마음을 생각하게 하는 책' },
    ],
    profile: {
      summary: '강한 의지와 추진력으로 상황을 이끌고, 약한 사람을 지키려는 유형이에요. 통제당하거나 상처받지 않으려 스스로를 단단하게 무장하기도 해요.',
      desire: '스스로를 지키고, 삶을 내 뜻대로 이끄는 것',
      fear: '다른 사람에게 통제당하거나 상처받는 것',
      growth: '마음을 열고, 그 힘을 다른 사람을 돌보는 데 써요.',
      stress: '마음을 닫고 물러나, 혼자 계산하며 고립되기 쉬워요.',
    },
  },
  NINE: {
    number: 9,
    name: '고요 속에 머무는 사람',
    oldName: '평화주의자',
    line: '서두르지 않는 마음으로 오래 곁에 머무는 사람.',
    editorNote: '글릿 에디터 코멘트: 당신에게는 고요를 무력함이 아니라 충만함으로 바꿔주는 문장이 필요해요.',
    description: '소란보다 평온을, 빠른 답보다 천천히 맞춰지는 리듬을 믿습니다. 당신의 결은 조용하지만 깊게 남아요.',
    keywords: ['고요', '평온', '수용', '리듬'],
    color: '#93A773',
    text: '#2F2A20',
    books: [
      { title: '월든', author: '헨리 데이비드 소로', reason: '고요한 삶이 가진 충만함을 보여주는 책' },
      { title: '모순', author: '양귀자', reason: '삶의 엇갈림을 조용히 품어보게 하는 소설' },
      { title: '어린 왕자', author: '앙투안 드 생텍쥐페리', reason: '작고 조용한 것의 소중함을 다시 알려주는 책' },
    ],
    profile: {
      summary: '갈등을 피하고 주변과 조화롭게 지내는 것을 가장 중요하게 여기는 유형이에요. 모두를 편안하게 해주는 대신, 자신의 의견과 바람을 쉽게 잊어버리기도 해요.',
      desire: '마음의 평화와 안정을 지키는 것',
      fear: '갈등으로 관계가 끊어지고 흩어지는 것',
      growth: '나만의 목표를 세우고 에너지 있게 움직여요.',
      stress: '걱정과 불안이 늘고, 사람과 상황을 쉽게 의심하게 돼요.',
    },
  },
}

const GRAIN_MAP_INTRO =
  '글릿의 문장 결 검사는 사람의 마음을 아홉 가지 결로 나눠, 겉으로 드러나는 행동보다 그 아래의 마음, 곧 무엇을 가장 원하고 무엇을 가장 두려워하는지를 살펴봐요. 아홉 가지 결은 서로 이어져 있어서, 마음에 여유가 있을 때와 지칠 때 가까워지는 결이 따로 있어요.'

// 아홉 결 도형의 안쪽 선이 곧 성장할 때·지칠 때 가까워지는 방향입니다.
const GROWTH: Record<number, number> = { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 }
const STRESS: Record<number, number> = { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 }

const CENTERS = [
  {
    types: [8, 9, 1],
    name: '장 중심 (본능)',
    text: '생각보다 몸의 감각과 직관으로 먼저 반응해요. 이 중심의 유형들에게는 분노를 다루는 방식이 중요한 과제예요.',
  },
  {
    types: [2, 3, 4],
    name: '가슴 중심 (감정)',
    text: '관계와 감정, 남에게 비치는 나의 모습으로 세상을 받아들여요. 이 중심의 유형들에게는 수치심을 다루는 방식이 중요한 과제예요.',
  },
  {
    types: [5, 6, 7],
    name: '머리 중심 (사고)',
    text: '생각하고 분석하고 대비하며 세상을 받아들여요. 이 중심의 유형들에게는 두려움을 다루는 방식이 중요한 과제예요.',
  },
]

const wingsOf = (n: number) => [n === 1 ? 9 : n - 1, n === 9 ? 1 : n + 1]
const typeLabel = (n: number) => {
  const r = Object.values(RESULTS).find((item) => item.number === n)
  return r ? `${n}번 ${r.oldName}` : `${n}번`
}

// 실물 표지 이미지. 표지가 있는 책이 목록 앞쪽에 오도록 정렬 기준으로도 쓴다.
const BOOK_COVERS: Record<string, string> = {
  '잠 못 이루는 밤을 위하여': '/images/books/sleepless-nights.jpg',
  '월든': '/images/books/walden.jpg',
  '나는 나로 살기로 했다': '/images/books/i-decided-to-live-as-me.jpg',
  '아몬드': '/images/books/almond.jpg',
  '82년생 김지영': '/images/books/kim-jiyoung-1982.jpg',
  '모든 것은 기본에서 시작한다': '/images/books/everything-starts-from-basics.jpg',
  '일의 기쁨과 슬픔': '/images/books/joy-and-sorrow-of-work.jpg',
  '어린 왕자': '/images/books/little-prince.jpg',
  '참을 수 없는 존재의 가벼움': '/images/books/unbearable-lightness.jpg',
  '우리가 빛의 속도로 갈 수 없다면': '/images/books/speed-of-light.jpg',
  '침묵의 봄': '/images/books/silent-spring.jpg',
  '코스모스': '/images/books/cosmos.jpg',
  '불안': '/images/books/status-anxiety.jpg',
  '여행의 이유': '/images/books/reason-for-travel.jpg',
  '채식주의자': '/images/books/vegetarian.jpg',
  '소년이 온다': '/images/books/human-acts.jpg',
  '모순': '/images/books/contradiction.jpg',
}

const INTRO_STEPS = ['36개 질문 선택', '결의 방향 분석', '책 3권 큐레이션']

const GRAIN_TYPES = Object.keys(RESULTS) as GrainType[]

// 유형마다 몇 문항에 보기로 나오는지 — 점수 그래프의 만점입니다.
const MAX_PER_TYPE = Object.fromEntries(
  GRAIN_TYPES.map((type) => [type, QUESTIONS.filter((q) => q.options.some((o) => o.type === type)).length])
) as Record<GrainType, number>
const COMMON_MAX = new Set(Object.values(MAX_PER_TYPE)).size === 1 ? MAX_PER_TYPE.ONE : null

// 그래프와 신청서에 쓰는 정수 점수(각 유형의 보기를 고른 횟수)
function countAnswers(answers: GrainType[]): Record<GrainType, number> {
  const count = Object.fromEntries(GRAIN_TYPES.map((type) => [type, 0])) as Record<GrainType, number>
  answers.forEach((answer) => {
    count[answer] += 1
  })
  return count
}

// 가장 많이 고른 결 (같은 점수면 여럿)
function topTypes(count: Record<GrainType, number>): GrainType[] {
  const max = Math.max(...GRAIN_TYPES.map((type) => count[type]))
  return GRAIN_TYPES.filter((type) => count[type] === max)
}

// 1등이 같은 점수로 여럿이면, 그 결들끼리만 고르는 추가 질문을 보여줍니다.
// 보기는 결마다 가장 깊은 바람을 한 문장으로 담았습니다.
const TIE_TITLE = '지금 당신에게\n더 가까운 마음은?'
const TIE_STATEMENTS: Record<GrainType, string> = {
  ONE: '흐트러진 것을 바르게 되돌려 놓고 싶은 마음',
  TWO: '누군가에게 꼭 필요한 사람이 되고 싶은 마음',
  THREE: '해낸 만큼 인정받고 싶은 마음',
  FOUR: '누구와도 다른 나만의 이야기를 찾고 싶은 마음',
  FIVE: '충분히 이해할 때까지 혼자 생각하고 싶은 마음',
  SIX: '믿고 기댈 수 있는 자리를 지키고 싶은 마음',
  SEVEN: '아직 가보지 않은 세계로 떠나고 싶은 마음',
  EIGHT: '누구에게도 휘둘리지 않고 내 힘으로 서고 싶은 마음',
  NINE: '소란 없이 고요하게 머물고 싶은 마음',
}

// 추가 질문 하나에 보기는 4개까지. 더 많으면 3개씩 나눠 고른 뒤, 고른 결들끼리 다시 고릅니다.
function splitTieRound(pool: GrainType[]): GrainType[][] {
  if (pool.length <= 4) return [pool]
  const groups: GrainType[][] = []
  for (let i = 0; i < pool.length; i += 3) groups.push(pool.slice(i, i + 3))
  // 마지막 묶음이 하나뿐이면 앞 묶음에 붙여서, 보기가 하나인 질문이 생기지 않게 합니다.
  if (groups[groups.length - 1].length === 1) {
    const last = groups.pop()!
    groups[groups.length - 1].push(...last)
  }
  return groups
}

export default function DiagnosisQuiz() {
  const [stage, setStage] = useState<Stage>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<GrainType[]>([])
  const [selected, setSelected] = useState<GrainType | null>(null)
  const [resultType, setResultType] = useState<GrainType>('FOUR')
  // 공유 링크(?type=)로 바로 들어온 결과에는 답변이 없어서 점수도 없습니다.
  const [counts, setCounts] = useState<Record<GrainType, number> | null>(null)
  // 동점 추가 질문: 같은 점수였던 결들, 이번 차례에 고를 묶음들, 지금까지 묶음마다 고른 결
  const [tiedTypes, setTiedTypes] = useState<GrainType[]>([])
  const [tieGroups, setTieGroups] = useState<GrainType[][]>([])
  const [tieWinners, setTieWinners] = useState<GrainType[]>([])

  const result = RESULTS[resultType]
  const total = QUESTIONS.length
  const progress = stage === 'quiz' ? ((step + 1) / total) * 100 : 100
  const grainSentences = archiveSentences.filter((s) => s.grain === resultType)

  useEffect(() => {
    if (stage !== 'loading') return

    const timer = window.setTimeout(() => {
      setStage('result')
    }, 1400)

    return () => window.clearTimeout(timer)
  }, [stage])

  // 공유된 결과 링크(/diagnosis/?type=four)로 들어오면 바로 결과 화면을 보여줘요.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('type')
    if (!param) return
    const type = param.toUpperCase()
    if (Object.prototype.hasOwnProperty.call(RESULTS, type)) {
      setResultType(type as GrainType)
      setStage('result')
    }
  }, [])

  const handleSelect = (type: GrainType) => {
    if (selected) return
    setSelected(type)

    window.setTimeout(() => {
      const newAnswers = [...answers, type]
      setAnswers(newAnswers)

      if (step < total - 1) {
        setStep((current) => current + 1)
        setSelected(null)
        return
      }

      const newCounts = countAnswers(newAnswers)
      const tops = topTypes(newCounts)
      setCounts(newCounts)
      setTiedTypes(tops)
      setSelected(null)
      if (tops.length === 1) {
        setResultType(tops[0])
        setStage('loading')
      } else {
        setTieGroups(splitTieRound(tops))
        setTieWinners([])
        setStage('tiebreak')
      }
    }, 260)
  }

  const handleTieSelect = (type: GrainType) => {
    if (selected) return
    setSelected(type)

    window.setTimeout(() => {
      const winners = [...tieWinners, type]
      setSelected(null)
      if (winners.length < tieGroups.length) {
        // 이번 차례에 남은 묶음으로
        setTieWinners(winners)
      } else if (winners.length === 1) {
        setResultType(type)
        setStage('loading')
      } else {
        // 묶음마다 고른 결들끼리 다시 고릅니다.
        setTieGroups(splitTieRound(winners))
        setTieWinners([])
      }
    }, 260)
  }

  const handleReset = () => {
    setStage('intro')
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResultType('FOUR')
    setCounts(null)
    setTiedTypes([])
    setTieGroups([])
    setTieWinners([])
  }

  const center = CENTERS.find((c) => c.types.includes(result.number))!
  const [wingA, wingB] = wingsOf(result.number)
  const scoreRows = counts
    ? GRAIN_TYPES.map((type) => ({
        number: RESULTS[type].number,
        name: RESULTS[type].oldName,
        count: counts[type],
        max: MAX_PER_TYPE[type],
      }))
    : null
  // 신청서에는 점수가 높은 순으로 적습니다. 동점이면 결과 유형을 먼저, 그다음은 번호 순입니다.
  const scoreSummary = scoreRows
    ? [...scoreRows]
        .sort(
          (a, b) =>
            b.count - a.count ||
            Number(b.number === result.number) - Number(a.number === result.number) ||
            a.number - b.number
        )
        .map((row) => `${row.number}번 ${row.count}점`)
        .join(' / ')
    : ''

  return (
    <div className="felt flex min-h-screen flex-col break-keep bg-au-sky text-au-ink">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-au-ink/10 bg-au-sky/85 px-5 backdrop-blur-md md:px-8">
        <a href="/" className="flex items-center gap-2" aria-label="글릿 홈">
          <FeltDiamond className="h-5 w-5" />
          <span className="font-jua text-xl">글릿</span>
        </a>
        {(stage === 'quiz' || stage === 'tiebreak' || stage === 'loading') && (
          <span className="font-mono text-xs text-au-ink/55">
            {stage === 'quiz' ? `${step + 1} / ${total}` : stage === 'tiebreak' ? '추가 질문' : 'reading your grain'}
          </span>
        )}
      </header>

      <main className="relative flex flex-1 items-center justify-center px-5 py-10 md:px-8 md:py-14">
        <Cloud className="pointer-events-none absolute left-[4%] top-8 hidden w-52 md:block" />
        <Cloud className="pointer-events-none absolute right-[3%] top-24 hidden w-60 md:block" />

        {stage === 'intro' && (
          <section className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-au-ink/70">
              <FeltDiamond className="h-3.5 w-3.5" />
              Glit Sentence Grain
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-au-ink/70">
              어떤 사람은 새벽 세 시의 문장에 위로받고, 어떤 사람은 낯선 도시의 첫 페이지에서 자신을 발견하죠.
            </p>
            <h1 className="puffy mt-5 font-jua text-[clamp(3.1rem,9vw,6rem)] leading-[1.1]">
              삶에는 저마다의
              <br />
              결이 있어요.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-au-ink/85">
              지금 당신에게 맞는 문장의 결을 찾아드릴게요. 서른여섯 개의 질문이 당신의 이야기를 듣고 싶어해요.
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-au-ink/65">
              지금 마음의 리듬과 문장 취향을 가볍게 살펴보는 검사예요. 정답을 고르기보다, 요즘 마음이 오래 머무는
              문장에 가까이 가보세요.
            </p>

            <button
              onClick={() => setStage('quiz')}
              className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-au-rust px-12 text-base font-bold text-white shadow-[0_6px_0_#7E3A1F] transition-transform hover:-translate-y-0.5"
            >
              나의 결 찾기
            </button>

            <ol className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
              {INTRO_STEPS.map((label, index) => (
                <li key={label} className="felt stitch stitch-dark rounded-[22px] bg-au-cream px-6 py-5 text-left">
                  <span className="font-jua text-2xl text-au-rust">0{index + 1}</span>
                  <p className="mt-1 text-sm font-semibold">{label}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {stage === 'quiz' && (
          <QuestionCard
            progressLabel={`질문 ${step + 1}`}
            progress={progress}
            label="문장 결 질문"
            title={QUESTIONS[step].title}
            options={QUESTIONS[step].options}
            selected={selected}
            onSelect={handleSelect}
          />
        )}

        {stage === 'tiebreak' && (
          <QuestionCard
            progressLabel="거의 다 왔어요"
            progress={100}
            label="추가 질문 · 같은 점수가 나온 결이 있어요"
            title={TIE_TITLE}
            options={tieGroups[tieWinners.length].map((type) => ({ text: TIE_STATEMENTS[type], type }))}
            selected={selected}
            onSelect={handleTieSelect}
          />
        )}

        {stage === 'loading' && (
          <section className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <div className="mb-8 flex items-end gap-5">
              {[
                { kind: 'ginkgo' as const, color: '#F2C649' },
                { kind: 'oval' as const, color: '#B5532E' },
                { kind: 'ginkgo' as const, color: '#E9B52F' },
              ].map((leaf, index) => (
                <Leaf
                  key={index}
                  kind={leaf.kind}
                  color={leaf.color}
                  className="leaf-sway h-14 w-14"
                  style={
                    { '--r': `${index * 20 - 20}deg`, animationDelay: `${index * 0.25}s`, animationDuration: '1.6s' } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-au-ink/60">Glit is reading</p>
            <h2 className="puffy mt-5 font-jua text-4xl leading-snug md:text-6xl">
              당신의 문장 결을
              <br />
              찾고 있어요
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-au-ink/70">
              선택한 문장들의 방향을 모아, 지금 가장 가까운 결과 어울리는 책을 고르고 있어요.
            </p>
          </section>
        )}

        {stage === 'result' && (
          <section className="relative z-10 mx-auto w-full max-w-4xl">
            <div className="felt stitch stitch-dark overflow-hidden rounded-[36px] bg-au-cream shadow-[0_14px_0_rgba(58,46,37,0.12)]">
              <div className="h-4" style={{ backgroundColor: result.color }} />
              <div className="px-6 py-8 md:px-12 md:py-12">
                <div className="flex items-center justify-between gap-4 border-b border-au-ink/10 pb-5 text-[0.65rem] uppercase tracking-[0.18em] text-au-ink/50">
                  <span>Glit Sentence Grain</span>
                  <span>Type {String(result.number).padStart(2, '0')} · {result.oldName}</span>
                </div>

                <div className="mt-9 grid gap-8 md:grid-cols-[14rem_1fr] md:items-center">
                  <GrainBadge result={result} />
                  <div className="text-center md:text-left">
                    <p className="text-sm font-semibold text-au-rust">
                      {result.number}번 결 · {result.oldName}
                    </p>
                    <h2 className="mt-3 font-jua text-4xl leading-[1.15] md:text-6xl">{result.name}</h2>
                    <p className="mt-4 text-base leading-8 text-au-ink/75">당신은 {result.name}의 결을 가졌어요.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                      {result.keywords.map((keyword) => (
                        <span key={keyword} className="rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold ring-1 ring-au-ink/10">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote
                  className="felt stitch mt-10 rounded-[28px] px-7 py-7 md:px-9"
                  style={{ backgroundColor: result.color, color: result.text }}
                >
                  <p className="text-lg font-semibold leading-9 md:text-xl">“{result.editorNote.replace('글릿 에디터 코멘트: ', '')}”</p>
                  <p className="mt-4 text-sm opacity-75">— glit 에디터</p>
                </blockquote>

                <p className="mt-8 text-base leading-8 text-au-ink/80">{result.description}</p>

                <SheetTitle eyebrow={`Nine Grains · Type ${result.number}`}>아홉 가지 결 속의 나</SheetTitle>
                <p className="mt-5 text-sm leading-7 text-au-ink/60">{GRAIN_MAP_INTRO}</p>
                <p className="mt-4 text-base leading-8">
                  <strong className="font-bold">{result.number}번 {result.oldName}</strong>는 {result.profile.summary}
                </p>

                {scoreRows && (
                  <div className="mt-8">
                    <p className="text-sm font-bold">아홉 유형 점수</p>
                    <p className="mt-1 text-xs leading-5 text-au-ink/60">
                      {QUESTIONS.length}문항에서 각 유형의 보기를 고른 횟수예요.
                      {COMMON_MAX && ` 유형마다 ${COMMON_MAX}문항씩 나와요.`} 가장 많이 고른 유형이 나의 결이 돼요.
                    </p>
                    {tiedTypes.length > 1 && (
                      <p className="mt-1 text-xs leading-5 text-au-ink/60">
                        {tiedTypes.length === GRAIN_TYPES.length
                          ? '아홉 결이 모두'
                          : `${tiedTypes.map((type) => `${RESULTS[type].number}번`).join('·')} 결이`}{' '}
                        같은 점수여서, 추가 질문에서 고른 결을 나의 결로 정했어요.
                      </p>
                    )}
                    <div className="mt-4">
                      <GrainScoreChart rows={scoreRows} highlight={result.number} />
                    </div>
                  </div>
                )}

                <div className="mt-8 grid gap-8 md:grid-cols-[15rem_1fr] md:items-start">
                  <figure className="felt mx-auto w-full max-w-[17rem] rounded-[28px] bg-white/60 p-4 ring-1 ring-au-ink/5">
                    <GrainFigure result={result} />
                    <figcaption className="mt-3 space-y-1.5 text-xs text-au-ink/65">
                      <p className="flex items-center gap-2">
                        <span className="inline-block h-0.5 w-6 rounded bg-[#6F7D35]" />
                        성장할 때 → {typeLabel(GROWTH[result.number])}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="inline-block w-6 border-t-2 border-dashed border-[#9E4430]" />
                        지칠 때 → {typeLabel(STRESS[result.number])}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="inline-block h-3 w-3 rounded-full border-2 border-dashed" style={{ borderColor: result.color }} />
                        날개 {wingA}번 · {wingB}번
                      </p>
                    </figcaption>
                  </figure>

                  <dl className="divide-y divide-au-ink/10 border-y border-au-ink/10">
                    <Fact label="핵심 욕구">{result.profile.desire}</Fact>
                    <Fact label="근원적 두려움">{result.profile.fear}</Fact>
                    <Fact label="힘의 중심">
                      <span className="font-semibold">{center.name}</span>
                      <span className="mt-1 block text-sm leading-6 text-au-ink/65">{center.text}</span>
                    </Fact>
                    <Fact label="날개">
                      <span className="font-semibold">
                        {typeLabel(wingA)} · {typeLabel(wingB)}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-au-ink/65">
                        양옆 두 유형 중 한쪽의 결이 함께 묻어나기 쉬워요.
                      </span>
                    </Fact>
                    <Fact label="성장할 때">
                      <span className="font-semibold">{typeLabel(GROWTH[result.number])} 쪽으로</span>
                      <span className="mt-1 block text-sm leading-6 text-au-ink/65">{result.profile.growth}</span>
                    </Fact>
                    <Fact label="지칠 때">
                      <span className="font-semibold">{typeLabel(STRESS[result.number])} 쪽으로</span>
                      <span className="mt-1 block text-sm leading-6 text-au-ink/65">{result.profile.stress}</span>
                    </Fact>
                  </dl>
                </div>

                <SheetTitle eyebrow="Books">글릿이 고른 책 3권</SheetTitle>
                <div className="mt-7 grid gap-7 sm:grid-cols-3">
                  {[...result.books]
                    .sort((a, b) => (BOOK_COVERS[b.title] ? 1 : 0) - (BOOK_COVERS[a.title] ? 1 : 0))
                    .map((book, index) => (
                      <article key={book.title} className="flex gap-5 sm:block">
                        <div className="w-24 shrink-0 sm:w-full sm:max-w-[9.5rem]">
                          {BOOK_COVERS[book.title] ? (
                            <img
                              src={BOOK_COVERS[book.title]}
                              alt={`「${book.title}」 표지`}
                              className="aspect-[2/3] w-full rounded-lg object-cover shadow-[0_8px_0_rgba(58,46,37,0.12)] ring-1 ring-au-ink/10"
                            />
                          ) : (
                            <div className="felt flex aspect-[2/3] w-full flex-col justify-between rounded-lg bg-au-olive p-3 text-au-cream">
                              <span className="font-mono text-[10px] tracking-widest opacity-70">glit</span>
                              <div>
                                <p className="text-sm font-bold leading-5">{book.title}</p>
                                <p className="mt-1.5 text-[10px] opacity-75">{book.author}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="sm:mt-4">
                          <p className="font-jua text-lg text-au-rust">0{index + 1}</p>
                          <h3 className="mt-1 text-lg font-black leading-7">「{book.title}」</h3>
                          <p className="mt-1 text-sm text-au-ink/55">{book.author}</p>
                          <p className="mt-3 text-sm leading-7 text-au-ink/80">{book.reason}</p>
                        </div>
                      </article>
                    ))}
                </div>

                {grainSentences.length > 0 && (
                  <>
                    <SheetTitle eyebrow="Sentences">이 결의 문장</SheetTitle>
                    <div className="mt-6 space-y-4">
                      {grainSentences.map((s) => (
                        <div key={s.id} className="felt rounded-[24px] bg-white/60 px-6 py-5 ring-1 ring-au-ink/5">
                          <p className="text-base leading-8 md:text-lg">“{s.text}”</p>
                          <p className="mt-3 text-xs text-au-ink/55">
                            {s.theme} · 「{s.book}」 {s.author}
                          </p>
                        </div>
                      ))}
                    </div>
                    <a href="/sentences" className="mt-5 inline-flex text-sm font-semibold text-au-rust underline underline-offset-4">
                      문장 아카이브에서 더 보기 →
                    </a>
                  </>
                )}

                <div className="felt stitch mt-14 rounded-[28px] bg-au-sky px-6 py-9 text-center md:px-12">
                  <h3 className="font-jua text-3xl leading-tight">
                    더 깊은 큐레이션을
                    <br />
                    받고 싶다면
                  </h3>
                  <p className="mt-5 text-sm leading-8 text-au-ink/80">
                    이름과 연락처를 남겨주시면,
                    <br />
                    당신의 결에 맞는 책 목록을 48시간 안에 보내드릴게요.
                  </p>
                  <CurationApplyForm key={resultType} scores={scoreSummary} />
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 w-full rounded-full border-2 border-au-ink/15 px-7 py-4 text-sm font-semibold transition-colors hover:border-au-rust hover:text-au-rust"
                >
                  처음부터 다시 하기
                </button>

                <p className="mt-10 text-center text-xs leading-6 text-au-ink/50">
                  이 검사는 의학적·심리학적 진단이 아니라, 글릿이 제안하는 문장 취향 큐레이션입니다.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <HillScene
        props={stage === 'intro'}
        className="pointer-events-none block h-[22vh] min-h-[140px] w-full md:h-[21vw] md:min-h-0"
      />
      <div className="felt bg-au-cream">
        <SiteFooter />
      </div>
    </div>
  )
}

function QuestionCard({
  progressLabel,
  progress,
  label,
  title,
  options,
  selected,
  onSelect,
}: {
  progressLabel: string
  progress: number
  label: string
  title: string
  options: { text: string; type: GrainType }[]
  selected: GrainType | null
  onSelect: (type: GrainType) => void
}) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-au-ink/60">
          <span>{progressLabel}</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-3.5 overflow-hidden rounded-full bg-au-cream/80 ring-1 ring-au-ink/10">
          <div className="h-full rounded-full bg-au-rust transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="felt stitch stitch-dark rounded-[32px] bg-au-cream p-6 shadow-[0_12px_0_rgba(58,46,37,0.12)] md:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-au-rust">{label}</p>
        <h2 className="mb-8 whitespace-pre-line font-jua text-3xl leading-snug md:text-[2.75rem]">{title}</h2>

        <div className="grid gap-3">
          {options.map((option, index) => {
            const isChosen = selected === option.type
            const isDimmed = !!selected && !isChosen

            return (
              <button
                key={option.text}
                onClick={() => onSelect(option.type)}
                disabled={!!selected}
                className={[
                  'grid min-h-[4.25rem] w-full grid-cols-[2rem_1fr] items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-[0.95rem] leading-relaxed transition-all duration-200',
                  isChosen
                    ? 'border-au-rust bg-au-ginkgo/35 text-au-ink'
                    : isDimmed
                      ? 'border-transparent bg-white/40 text-au-ink/30'
                      : 'cursor-pointer border-transparent bg-white/75 text-au-ink/85 [@media(hover:hover)]:hover:border-au-rust/40 [@media(hover:hover)]:hover:bg-white',
                ].join(' ')}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full font-jua text-sm ${
                    isChosen ? 'bg-au-rust text-white' : 'bg-au-cream text-au-rust'
                  }`}
                >
                  {index + 1}
                </span>
                <span>{option.text}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SheetTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mt-14">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-au-rust">{eyebrow}</p>
      <div className="mt-2 flex items-center gap-4">
        <h3 className="shrink-0 font-jua text-2xl md:text-3xl">{children}</h3>
        <div className="flex-1 border-t-2 border-dashed border-au-ink/15" />
      </div>
    </div>
  )
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <dt className="text-xs font-semibold text-au-rust sm:pt-1">{label}</dt>
      <dd className="text-[0.95rem] leading-7">{children}</dd>
    </div>
  )
}

function GrainBadge({ result }: { result: Result }) {
  const lightBadge = ['#DDA03A', '#E9B52F', '#93A773'].includes(result.color)
  return (
    <div className="relative mx-auto aspect-square w-48 md:w-full">
      <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
        <defs>
          <FeltFilter id="felt-grain-badge" />
        </defs>
        <circle filter="url(#felt-grain-badge)" cx="100" cy="100" r="88" fill={result.color} />
        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke={result.text}
          strokeOpacity="0.5"
          strokeWidth="2.4"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 grid place-items-center font-jua text-[6.5rem] leading-none"
        style={{ color: result.text, textShadow: '0 4px 0 rgba(58,46,37,0.18)' }}
        aria-hidden="true"
      >
        {result.number}
      </span>
      <Leaf
        kind="ginkgo"
        color={lightBadge ? '#9E4430' : '#F2C649'}
        className="absolute -right-1 top-1 h-14 w-14 rotate-12"
      />
      <Leaf
        kind="oval"
        color={result.color === '#6F7D35' || result.color === '#93A773' ? '#B5532E' : '#6F7D35'}
        className="absolute -left-1 bottom-3 h-12 w-12 -rotate-[30deg]"
      />
    </div>
  )
}

// 9개 점을 원 위에 두고(9번이 맨 위), 안쪽 선은 3-6-9 삼각형과 1-4-2-8-5-7 육각 별입니다.
const GRAIN_POINTS = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1
  const angle = ((-90 + n * 40) * Math.PI) / 180
  return { n, x: Math.round((100 + 74 * Math.cos(angle)) * 10) / 10, y: Math.round((100 + 74 * Math.sin(angle)) * 10) / 10 }
})
const pointOf = (n: number) => GRAIN_POINTS[n - 1]
const polygonOf = (ns: number[]) => ns.map((n) => `${pointOf(n).x},${pointOf(n).y}`).join(' ')

function GrainFigure({ result }: { result: Result }) {
  const me = result.number
  const wings = wingsOf(me)

  // 내 점에서 상대 점까지, 양 끝의 원과 겹치지 않도록 줄인 선분
  const segment = (to: number) => {
    const a = pointOf(me)
    const b = pointOf(to)
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    const start = 16 / len
    const end = (len - 13) / len
    const r = (v: number) => Math.round(v * 10) / 10
    return { x1: r(a.x + dx * start), y1: r(a.y + dy * start), x2: r(a.x + dx * end), y2: r(a.y + dy * end) }
  }

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`아홉 가지 결 도형에서 ${me}번 결의 위치`} className="h-auto w-full">
      <defs>
        <marker id="grain-growth" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#6F7D35" />
        </marker>
        <marker id="grain-stress" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#9E4430" />
        </marker>
      </defs>
      <circle cx="100" cy="100" r="74" fill="none" stroke="#3A2E25" strokeOpacity="0.15" strokeWidth="1.2" />
      <polygon points={polygonOf([3, 6, 9])} fill="none" stroke="#3A2E25" strokeOpacity="0.15" strokeWidth="1.2" />
      <polygon points={polygonOf([1, 4, 2, 8, 5, 7])} fill="none" stroke="#3A2E25" strokeOpacity="0.15" strokeWidth="1.2" />

      <line {...segment(GROWTH[me])} stroke="#6F7D35" strokeWidth="2.6" strokeLinecap="round" markerEnd="url(#grain-growth)" />
      <line
        {...segment(STRESS[me])}
        stroke="#9E4430"
        strokeWidth="2.4"
        strokeDasharray="5 4"
        strokeLinecap="round"
        markerEnd="url(#grain-stress)"
      />

      {GRAIN_POINTS.map((p) => {
        const isMe = p.n === me
        const isWing = wings.includes(p.n)
        return (
          <g key={p.n}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isMe ? 15 : 10}
              fill={isMe ? result.color : '#FBF3E4'}
              stroke={isMe || isWing ? result.color : '#3A2E25'}
              strokeOpacity={isMe || isWing ? 1 : 0.25}
              strokeWidth={isWing ? 2 : 1.2}
              strokeDasharray={isWing ? '3 2' : undefined}
            />
            <text
              x={p.x}
              y={p.y}
              dy="0.35em"
              textAnchor="middle"
              fontSize={isMe ? 15 : 10}
              fontWeight="700"
              fill={isMe ? result.text : '#3A2E25'}
            >
              {p.n}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
