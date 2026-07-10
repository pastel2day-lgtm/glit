export type Grain =
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR'
  | 'FIVE'
  | 'SIX'
  | 'SEVEN'
  | 'EIGHT'
  | 'NINE'

export interface Sentence {
  id: string
  text: string
  theme: string
  grain: Grain
  // '결이 닿는 책' — 직접 인용이 아니라, 이 문장의 결과 어울리는 함께 읽을 책입니다.
  book: string
  author: string
}

export const GRAIN_LABELS: Record<Grain, string> = {
  ONE: '기준이 있는 사람',
  TWO: '먼저 손 내미는 사람',
  THREE: '앞을 향해 달리는 사람',
  FOUR: '깊이 느끼는 사람',
  FIVE: '혼자 생각하는 사람',
  SIX: '곁을 지키는 사람',
  SEVEN: '더 많은 세계를 원하는 사람',
  EIGHT: '부딪혀 나아가는 사람',
  NINE: '고요 속에 머무는 사람',
}

export const GRAIN_ORDER: Grain[] = [
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
]

export const sentences: Sentence[] = [
  {
    id: 'one-1',
    text: '완벽하지 않아도 괜찮다는 말은 대충 살아도 된다는 뜻이 아니에요. 오늘의 최선을 이미 다했다는 뜻이죠.',
    theme: '기준',
    grain: 'ONE',
    book: '나는 나로 살기로 했다',
    author: '김수현',
  },
  {
    id: 'one-2',
    text: '흐트러진 마음에도 끝내 바른 문장을 찾는 사람이 있어요. 아마도 당신처럼.',
    theme: '정돈',
    grain: 'ONE',
    book: '월든',
    author: '헨리 데이비드 소로',
  },
  {
    id: 'two-1',
    text: '먼저 건넨 다정함은 사라지지 않아요. 다만 조금 돌아서, 결국 당신에게 옵니다.',
    theme: '다정함',
    grain: 'TWO',
    book: '아몬드',
    author: '손원평',
  },
  {
    id: 'two-2',
    text: '누군가를 챙기느라 자꾸 뒤로 밀어둔 마음이 있다면, 오늘은 그 마음의 이름을 먼저 불러주세요.',
    theme: '돌봄',
    grain: 'TWO',
    book: '82년생 김지영',
    author: '조남주',
  },
  {
    id: 'three-1',
    text: '성취 바깥에서도 당신은 이미 빛나요. 속도를 늦춰도 사라지지 않는 빛이에요.',
    theme: '성장',
    grain: 'THREE',
    book: '모든 것은 기본에서 시작한다',
    author: '손웅정',
  },
  {
    id: 'three-2',
    text: '빨리 가는 것보다 중요한 건, 지금 어디로 가고 있는지 아는 일이에요.',
    theme: '방향',
    grain: 'THREE',
    book: '월든',
    author: '헨리 데이비드 소로',
  },
  {
    id: 'four-1',
    text: '당신이 느낀 슬픔에도 이름이 있어요. 설명하지 않아도 알아봐주는 문장이 어딘가 있고요.',
    theme: '깊이',
    grain: 'FOUR',
    book: '어린 왕자',
    author: '앙투안 드 생텍쥐페리',
  },
  {
    id: 'four-2',
    text: '아름다움과 슬픔이 같은 자리에 있다는 걸 아는 사람은, 세상을 조금 더 오래 들여다봅니다.',
    theme: '감정',
    grain: 'FOUR',
    book: '우리가 빛의 속도로 갈 수 없다면',
    author: '김초엽',
  },
  {
    id: 'five-1',
    text: '혼자 있는 시간은 낭비가 아니라, 나를 다시 채우는 방식일지도 몰라요.',
    theme: '고독',
    grain: 'FIVE',
    book: '월든',
    author: '헨리 데이비드 소로',
  },
  {
    id: 'five-2',
    text: '쉽게 판단하지 않고 오래 바라보는 마음이, 결국 가장 멀리 봅니다.',
    theme: '사유',
    grain: 'FIVE',
    book: '코스모스',
    author: '칼 세이건',
  },
  {
    id: 'six-1',
    text: '불안을 지우는 말보다, 함께 견디자는 말이 더 오래 남아요.',
    theme: '믿음',
    grain: 'SIX',
    book: '아몬드',
    author: '손원평',
  },
  {
    id: 'six-2',
    text: '미리 걱정하는 마음은, 실은 지키고 싶은 것이 그만큼 많다는 증거예요.',
    theme: '안정',
    grain: 'SIX',
    book: '불안',
    author: '알랭 드 보통',
  },
  {
    id: 'seven-1',
    text: '아직 가보지 않은 문이 이렇게 많다는 건, 생각해보면 얼마나 다행인지요.',
    theme: '설렘',
    grain: 'SEVEN',
    book: '여행의 이유',
    author: '김영하',
  },
  {
    id: 'seven-2',
    text: '설렘을 가볍게 흘려보내지 마세요. 그 감각이 당신을 더 넓은 곳으로 데려가요.',
    theme: '확장',
    grain: 'SEVEN',
    book: '우리가 빛의 속도로 갈 수 없다면',
    author: '김초엽',
  },
  {
    id: 'eight-1',
    text: '두려움을 피하지 않고 통과하기로 한 순간, 이미 절반은 지나온 거예요.',
    theme: '용기',
    grain: 'EIGHT',
    book: '소년이 온다',
    author: '한강',
  },
  {
    id: 'eight-2',
    text: '강한 사람에게 필요한 건 더 센 힘이 아니라, 그 힘이 향할 방향이에요.',
    theme: '힘',
    grain: 'EIGHT',
    book: '월든',
    author: '헨리 데이비드 소로',
  },
  {
    id: 'nine-1',
    text: '서두르지 않아도 괜찮아요. 천천히 맞춰지는 리듬을 믿는 사람도 있으니까요.',
    theme: '고요',
    grain: 'NINE',
    book: '모순',
    author: '양귀자',
  },
  {
    id: 'nine-2',
    text: '고요는 무력함이 아니에요. 가장 깊은 곳에서 당신을 채우는 충만함이죠.',
    theme: '평온',
    grain: 'NINE',
    book: '어린 왕자',
    author: '앙투안 드 생텍쥐페리',
  },
]
