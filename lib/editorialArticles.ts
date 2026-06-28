export type ArticleStyle = 'essay' | 'diary' | 'lyric'

export interface Article {
  slug: string
  category: string
  issue: string
  title: string
  subtitle: string
  author: string
  authorRole: string
  readTime: string
  date: string
  image: string
  style: ArticleStyle
  body: Section[]
}

export interface Section {
  type: 'paragraph' | 'pullquote' | 'divider' | 'italic'
  text: string
}

const articles: Article[] = [
  {
    slug: 'sleepless-night',
    category: '책 추천',
    issue: 'Vol.01',
    title: '잠 못 드는 밤을 위한 책',
    subtitle: '화면 빛 대신 종이의 촉감으로 밤을 조금 다르게 보내는 법',
    author: '글릿',
    authorRole: '에디터',
    readTime: '2분',
    date: '2026년 6월 24일',
    image: '/images/glit_mag_bright_night.png',
    style: 'essay',
    body: [
      { type: 'paragraph', text: '잠이 오지 않는 밤이 있어요.' },
      { type: 'paragraph', text: '뒤척이다 핸드폰을 켜고, 또 끄고.' },
      { type: 'paragraph', text: '그래도 눈이 말똥말똥한 그런 밤.' },
      { type: 'paragraph', text: '그럴 때 저는 책을 펼쳐요.' },
      {
        type: 'italic',
        text: '화면 빛이 아니라 종이의 촉감으로, 그 밤을 조금 다르게 보내보려고요.',
      },
      {
        type: 'pullquote',
        text: '어둠이 깊을수록 별은 더 선명해진다는 걸.',
      },
      {
        type: 'paragraph',
        text: '칼 힐티는 100년 전에 이미 알고 있었어요. 잠 못 드는 밤에도 우리 곁에는 조용히 기대어 읽을 수 있는 문장이 필요하다는 걸요.',
      },
      {
        type: 'paragraph',
        text: '잠 못 드는 밤, 당신 곁에 두고 싶은 책이 있나요? 댓글로 추천해주세요. 글릿이 다음 큐레이션에 담아볼게요.',
      },
    ],
  },
  {
    slug: 'your-own-star',
    category: '문장 수집',
    issue: 'Vol.01',
    title: '당신만의 별은 어디 있나요',
    subtitle: '바쁘고 지친 날에도 사라지지 않는 나만의 별에 관하여',
    author: '글릿',
    authorRole: '에디터',
    readTime: '2분',
    date: '2026년 6월 24일',
    image: '/images/glit_mag_bright_star.png',
    style: 'diary',
    body: [
      { type: 'paragraph', text: '어린왕자는 말했어요.' },
      { type: 'paragraph', text: '사람은 누구나 자기 별을 가지고 있다고.' },
      { type: 'paragraph', text: '근데 요즘은 자꾸 잊게 돼요. 내 별이 어디 있는지.' },
      {
        type: 'paragraph',
        text: '너무 바빠서, 너무 지쳐서, 아니면 그냥 찾기가 무서워서.',
      },
      { type: 'divider', text: '' },
      { type: 'pullquote', text: '그래도 괜찮아요. 별은 사라지지 않으니까요.' },
      {
        type: 'paragraph',
        text: '당신이 고개를 드는 순간, 다시 거기 있을 거예요.',
      },
      {
        type: 'paragraph',
        text: '당신만의 별은 지금 어디 있나요? 댓글로 들려주세요. 어떤 대답이든 괜찮아요.',
      },
    ],
  },
  {
    slug: 'fullest-alone',
    category: '혼자 있는 시간',
    issue: 'Vol.01',
    title: '혼자 있는 시간이 가장 충만했다',
    subtitle: '월든이 먼저 증명해준 혼자만의 시간에 대한 작은 기록',
    author: '글릿',
    authorRole: '에디터',
    readTime: '2분',
    date: '2026년 6월 24일',
    image: '/images/glit_mag_week3_forest.png',
    style: 'lyric',
    body: [
      {
        type: 'paragraph',
        text: '혼자 있는 게 불편한 사람이 있고, 혼자 있는 게 꼭 필요한 사람이 있어요.',
      },
      {
        type: 'paragraph',
        text: '소로는 월든 호숫가에서 2년을 혼자 살았어요.',
      },
      {
        type: 'paragraph',
        text: '누군가는 그게 외로움이라고 했지만, 그는 그 시간을 "가장 충만했다"고 기억했어요.',
      },
      { type: 'divider', text: '' },
      {
        type: 'pullquote',
        text: '혼자 있는 시간은 낭비가 아니라, 나를 다시 채우는 방식일지도 몰라요.',
      },
      {
        type: 'paragraph',
        text: '혼자 있는 시간, 당신은 어떻게 보내나요? 산책인지, 멍 때리기인지, 책 한 페이지인지.',
      },
      {
        type: 'paragraph',
        text: '당신만의 혼자 있는 시간 루틴을 댓글로 들려주세요.',
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug)
}

export default articles
