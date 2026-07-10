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

// 최신 글이 앞에 오도록 정렬해 둡니다. (/editorial 목록과 홈 This Issue가 이 순서를 따릅니다.)
const articles: Article[] = [
  {
    slug: 'rainy-day-sentences',
    category: '문장 수집',
    issue: 'Vol.02',
    title: '비 오는 날의 문장들',
    subtitle: '창밖의 소리가 문장이 되는 시간',
    author: '글릿',
    authorRole: '에디터',
    readTime: '2분',
    date: '2026년 7월 8일',
    image: '/images/glit-rain-essay.png',
    style: 'lyric',
    body: [
      { type: 'paragraph', text: '비가 오면 세상의 소리가 한 겹 낮아져요.' },
      {
        type: 'paragraph',
        text: '자동차도, 발걸음도, 말소리도 빗소리 아래로 조금씩 잠깁니다.',
      },
      { type: 'paragraph', text: '그런 날엔 이상하게 오래 미뤄둔 문장이 떠올라요.' },
      {
        type: 'italic',
        text: '읽다 만 책의 첫 문장, 부치지 못한 편지의 마지막 줄 같은 것들.',
      },
      { type: 'divider', text: '' },
      {
        type: 'pullquote',
        text: '비는 아무것도 씻어내지 않아요. 다만 우리를 잠시 멈추게 할 뿐이죠.',
      },
      {
        type: 'paragraph',
        text: '멈춘 자리에서야 비로소 보이는 것들이 있어요. 창밖이 아니라, 창을 바라보는 내 얼굴 같은 것.',
      },
      {
        type: 'paragraph',
        text: '오늘 비가 온다면 우산을 펴기 전에 잠깐 서 있어보세요. 그 몇 초가 하루의 문장을 바꿔놓을지도 몰라요.',
      },
      {
        type: 'paragraph',
        text: '비 오는 날 당신에게 떠오르는 문장은 무엇인가요? 댓글로 들려주세요.',
      },
    ],
  },
  {
    slug: 'sitting-at-the-desk',
    category: '쓰는 마음',
    issue: 'Vol.02',
    title: '책상 앞에 앉는 일',
    subtitle: '영감을 기다리지 않고 매일 앉는 사람들에 대하여',
    author: '글릿',
    authorRole: '에디터',
    readTime: '3분',
    date: '2026년 7월 8일',
    image: '/images/glit-writer-studio.png',
    style: 'essay',
    body: [
      { type: 'paragraph', text: '쓰는 사람들에게 물어보면 대답이 신기할 만큼 비슷해요.' },
      {
        type: 'paragraph',
        text: '영감이 와서 쓰는 게 아니라, 앉아 있으니까 결국 쓰게 된다고요.',
      },
      {
        type: 'paragraph',
        text: '재능은 어쩌면 책상 앞에 앉은 시간의 다른 이름인지도 모릅니다.',
      },
      {
        type: 'pullquote',
        text: '쓰고 싶지 않은 날에도 앉는 것. 그것이 이미 쓰는 일입니다.',
      },
      {
        type: 'paragraph',
        text: '오늘 한 문장도 완성하지 못했더라도 괜찮아요. 화면을 오래 바라보고 있었다면, 당신은 이미 쓰는 사람이에요.',
      },
      {
        type: 'italic',
        text: '완성하지 않아도 괜찮아요. 시작한 문장은 사라지지 않으니까요.',
      },
      {
        type: 'paragraph',
        text: '당신의 책상은 어떤 모습인가요? 오늘 그 앞에 몇 분쯤 앉아 있었는지 들려주세요.',
      },
    ],
  },
  {
    slug: 'small-things-remain',
    category: '혼자 있는 시간',
    issue: 'Vol.02',
    title: '작은 것들이 남는다',
    subtitle: '오래 곁에 둔 사물과 문장에 관하여',
    author: '글릿',
    authorRole: '에디터',
    readTime: '2분',
    date: '2026년 7월 8일',
    image: '/images/glit-editorial-still-life.png',
    style: 'diary',
    body: [
      { type: 'paragraph', text: '오래 쓴 컵, 모서리가 닳은 노트, 접힌 자국이 남은 책장.' },
      { type: 'paragraph', text: '값비싼 것들은 생각보다 기억에 남지 않아요.' },
      { type: 'paragraph', text: '남는 건 이상하게도 작고 사소한 것들입니다.' },
      { type: 'divider', text: '' },
      { type: 'pullquote', text: '사랑한 것들은 늘 조금 낡아 있어요.' },
      {
        type: 'paragraph',
        text: '문장도 그래요. 근사한 문장보다, 밑줄이 두 번 세 번 겹쳐 그어진 낡은 문장이 더 오래 남습니다.',
      },
      {
        type: 'paragraph',
        text: '혼자 있는 저녁에 그 낡은 것들을 하나씩 만져보는 시간이 좋아요. 아무 말도 하지 않는데 많은 이야기를 듣게 되거든요.',
      },
      {
        type: 'paragraph',
        text: '당신의 책에서 가장 많이 밑줄 그은 문장은 무엇인가요? 글릿에 들려주세요.',
      },
    ],
  },
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
