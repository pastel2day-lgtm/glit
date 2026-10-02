// 홈 '가을의 문장' 카드. 모두 저작권 보호기간이 끝난 원작의 문장이고, 번역은 글릿이 원문에서 직접 옮겼습니다.
export interface SeasonSentence {
  text: string
  book: string
  author: string
  original: string
}

const seasonSentences: SeasonSentence[] = [
  {
    text: '가을이 와 공기가 선선해지면, 삶은 처음부터 다시 시작된다.',
    book: '위대한 개츠비',
    author: 'F. 스콧 피츠제럴드',
    original: 'Life starts all over again when it gets crisp in the fall.',
  },
  {
    text: '너의 장미를 그토록 소중하게 만든 건, 네가 장미를 위해 보낸 시간이야.',
    book: '어린 왕자',
    author: '앙투안 드 생텍쥐페리',
    original: "C'est le temps que tu as perdu pour ta rose qui fait ta rose si importante.",
  },
  {
    text: '새는 알을 깨고 나오려 애쓴다. 알은 세계다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.',
    book: '데미안',
    author: '헤르만 헤세',
    original: 'Der Vogel kämpft sich aus dem Ei. Das Ei ist die Welt. Wer geboren werden will, muß eine Welt zerstören.',
  },
]

export default seasonSentences
