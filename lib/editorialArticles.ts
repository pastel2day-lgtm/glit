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
    slug: 'rain',
    category: '에세이',
    issue: 'Vol.01',
    title: '비 오는 날, 왜 글이 더 필요해질까',
    subtitle: '흐린 날의 문장이 우리를 조금 더 투명하게 만드는 이유',
    author: '김서연',
    authorRole: '에디터',
    readTime: '6분',
    date: '2026년 1월 14일',
    image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1400&h=800&fit=crop&q=85',
    style: 'essay',
    body: [
      {
        type: 'paragraph',
        text: '비가 내리기 시작하는 순간, 우리는 무언가를 꺼내야 한다는 충동을 느낀다.',
      },
      {
        type: 'paragraph',
        text: '창밖을 두드리는 소리가 하나씩 늘어날 때, 나는 늘 같은 것을 한다. 서랍 깊숙이 넣어두었던 노트를 꺼내거나, 잠들어 있던 화면을 깨우거나. 흐린 날의 빛이 방 안에 들어차기 시작하면, 무언가를 적지 않으면 안 될 것 같은 기분이 온다. 그 기분은 배고픔과 다르고, 졸음과도 다르다. 다만 내 안에 무언가가 흘러넘치려 한다는, 그 신호다.',
      },
      {
        type: 'paragraph',
        text: '생각해보면 이상한 일이다. 비는 아무것도 요구하지 않는다. 그저 하늘이 무거워진 것이고, 대기가 물기를 이기지 못한 것이고, 지구가 자신의 방식으로 숨을 고르는 것이다. 그런데 우리는 왜, 빗소리 앞에서 기어이 무언가를 쓰고 싶어지는 걸까.',
      },
      {
        type: 'pullquote',
        text: '비 오는 날의 고독은 마치 따뜻한 이불처럼, 포근하게 우리를 감싼다. 그 포근함 속에서 우리는 비로소 자기 자신을 들여다볼 수 있게 된다.',
      },
      {
        type: 'paragraph',
        text: '나는 한때 그것이 고독 때문이라고 생각했다. 비가 오는 날의 고독은 다른 날의 고독과 질감이 다르다. 맑은 날의 외로움은 날카롭고 서럽다. 하지만 비 오는 날의 고독은 마치 따뜻한 이불처럼 우리를 감싸고, 그 포근함 속에서 우리는 비로소 자기 자신을 들여다볼 수 있게 된다. 그러나 나는 이제 다른 이유를 안다.',
      },
      {
        type: 'paragraph',
        text: '비 오는 날, 우리가 글을 쓰고 싶어지는 것은 세상이 일시정지되기 때문이다. 창밖의 모든 것이 흐릿해지고, 소리는 빗소리 하나로 통일되고, 우리의 시간은 어느 순간 느려진다. 일정이 취소되고, 약속이 미루어지고, 배달이 늦어지는 그 모든 지연 속에서 우리는 드디어 현재에 머무를 수 있게 된다. 과거를 후회하거나 미래를 걱정하는 대신, 지금 이 창가에서, 이 소리 안에서, 이 빛 속에서 그냥 존재하게 된다.',
      },
      {
        type: 'paragraph',
        text: '그리고 그 순간, 말들이 온다.',
      },
      {
        type: 'paragraph',
        text: '평소에는 너무 빠르게 지나쳐 붙잡지 못했던 감정들이 빗소리를 타고 천천히 흘러들어온다. 지난주에 엄마가 전화에서 한 말, 오래 보지 못한 친구의 얼굴, 아무 이유 없이 눈물이 날 것 같았던 그 오후. 그것들이 빗소리라는 틀 안에 담겨 마침내 붙잡힐 수 있는 형태가 된다.',
      },
      {
        type: 'pullquote',
        text: '우리 안에는 이미 쓰여야 할 것들이 가득 차 있다. 빗소리는 다만 우리에게 잠시 멈추고 들으라고 한다.',
      },
      {
        type: 'paragraph',
        text: '글쓰기가 특별한 날에만 가능한 일이라고 생각하는 사람들이 있다. 영감이 와야 하고, 조용해야 하고, 준비가 되어야 한다고. 하지만 비 오는 날이 우리에게 가르쳐주는 것이 있다면 그것은 이것이다. 우리는 이미 준비되어 있다는 것. 우리 안에 이미 쓰여야 할 것들이 가득 차 있다는 것.',
      },
      {
        type: 'paragraph',
        text: '오늘 비가 온다면, 그것은 하늘이 당신에게 글을 쓰라고 보내준 시간일지도 모른다. 창을 열고, 빗소리를 들어라. 그리고 무언가 하나만 적어라. 완벽하지 않아도 좋다. 다 쓰지 않아도 된다. 빗소리가 들리는 그 한 문장이, 오늘의 당신을 온전하게 만들어줄 것이다.',
      },
    ],
  },
  {
    slug: 'unasked',
    category: '일상',
    issue: 'Vol.01',
    title: '아무도 묻지 않는 것들에 대하여',
    subtitle: '사소해서 지나친 질문들이 어느 날 가장 오래 남는 문장이 되는 순간',
    author: '이준호',
    authorRole: '기고 작가',
    readTime: '3분',
    date: '2026년 1월 21일',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1400&h=800&fit=crop&q=85',
    style: 'diary',
    body: [
      {
        type: 'paragraph',
        text: '아무도 묻지 않는다.',
      },
      {
        type: 'paragraph',
        text: '오늘 아침, 당신이 커피를 홀짝이던 그 3분 동안 무슨 생각을 했는지. 지하철에서 누군가의 가방에 찍혔을 때 미안하다고 말하고 싶었지만 말하지 않은 이유를. 점심으로 먹은 것이 맛있었는지, 아니면 그냥 먹었는지. 그 차이가 오늘 당신에게 얼마나 중요했는지.',
      },
      {
        type: 'italic',
        text: '아무도 묻지 않는다, 라고 생각하다가 나는 이 문장이 얼마나 슬픈지 깨달았다.',
      },
      {
        type: 'paragraph',
        text: '우리는 하루에도 수십 번, 아무도 알지 못할 감정들을 지나친다.',
      },
      {
        type: 'paragraph',
        text: '퇴근길 버스 창문에 기댄 채 지나가던 낯선 거리의 불빛이 예뻤다는 것. 그 빛이 어딘가 오래전 여행지를 닮았다는 것. 그래서 잠깐, 딱 한 호흡만큼, 그 여행지가 그리웠다는 것.',
      },
      {
        type: 'paragraph',
        text: '아무도 묻지 않을 것이다. 심지어 당신 자신도, 집에 돌아와 씻고 누우면 기억하지 못할 것이다.',
      },
      {
        type: 'divider',
        text: '',
      },
      {
        type: 'paragraph',
        text: '그러나 그것들은 사라진 게 아니다.',
      },
      {
        type: 'paragraph',
        text: '우리의 몸 어딘가에 켜켜이 쌓인다. 말해지지 않은 것들이 조용히 쌓이고 쌓여, 어느 날 문득 우리를 울게 만든다. 이유도 모른 채. 특별한 일이 없었는데도.',
      },
      {
        type: 'italic',
        text: '그때 우리는 이렇게 말한다. 요즘 좀 예민한 것 같다고. 피곤한가 보다고.',
      },
      {
        type: 'paragraph',
        text: '하지만 나는 안다. 그건 말해지지 않은 것들이 몸 밖으로 나오려는 것이라고.',
      },
      {
        type: 'divider',
        text: '',
      },
      {
        type: 'paragraph',
        text: '글은 그래서 필요하다. 아무도 묻지 않아도, 당신 자신이 묻는 행위. 오늘 아침 커피의 온도가 어떠했는지. 지하철 안 낯선 사람의 가방 무늬가 왜 자꾸 눈에 들어왔는지. 그 불빛이 왜 그렇게 아름다웠는지.',
      },
      {
        type: 'pullquote',
        text: '묻고, 적는 것. 그것이 글이다.',
      },
      {
        type: 'paragraph',
        text: '그런 사람이 되는 것은 특별한 일이 아니다. 다만 조금 더 깊이 살아가는 일이다. 아무도 묻지 않는 것들에 대해, 스스로 답을 쓰는 사람. 사소한 것들을 그냥 흘려보내지 않는 사람.',
      },
    ],
  },
  {
    slug: 'between-days',
    category: '감상',
    issue: 'Vol.01',
    title: '오늘과 어제 사이에서',
    subtitle: '매일의 경계 위에서 우리는 무언가를 놓고, 또 무언가를 안고 살아간다',
    author: '박소희',
    authorRole: '시인',
    readTime: '4분',
    date: '2026년 1월 28일',
    image: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=1400&h=800&fit=crop&q=85',
    style: 'lyric',
    body: [
      {
        type: 'paragraph',
        text: '오늘이 어제가 되는 순간은 언제일까.',
      },
      {
        type: 'paragraph',
        text: '자정이 지나는 순간이라고 말하는 사람이 있겠지만, 나는 그렇게 생각하지 않는다. 오늘이 어제가 되는 것은 더 조용한 방식으로, 더 눈치채기 어려운 방식으로 일어난다.',
      },
      {
        type: 'paragraph',
        text: '아마도 그것은 잠드는 순간일 것이다. 눈을 감고, 오늘의 이야기가 기억 속으로 미끄러져 들어가는 그때. 아직 완전히 소화하지 못한 감정들이 잠의 강을 건너 어제의 편에 가 닿는 그 경계에서.',
      },
      {
        type: 'italic',
        text: '그 경계는 우리가 의식할 때 사라진다.',
      },
      {
        type: 'pullquote',
        text: '오늘도 아니고 어제도 아닌, 그 가느다란 틈새에. 오늘이 아직 완성되지 않았고, 어제는 아직 굳어지지 않은 그곳에서는 아직 모든 것이 가능하다.',
      },
      {
        type: 'paragraph',
        text: '나는 이 경계에 오래 머물러 있고 싶다는 생각을 자주 한다. 오늘도 아니고 어제도 아닌, 그 가느다란 틈새에. 오늘이 아직 완성되지 않았고, 어제는 아직 굳어지지 않은 그곳에. 그곳에서는 아직 모든 것이 가능하다. 오늘 하지 못한 말을 내일 하는 것이 가능하고, 어제 상처받은 마음이 오늘 조금 나아지는 것도 가능하다.',
      },
      {
        type: 'paragraph',
        text: '우리는 왜 이렇게 빠르게 어제를 보내려 하는 걸까. 어제는 이미 지나갔으니 잊어야 한다고, 오늘에 집중해야 한다고, 그래야 내일이 온다고. 하지만 충분히 살지 못한 어제는 어디로 가는 걸까. 제대로 울지 못한 눈물, 다 말하지 못한 고마움, 너무 늦게 알아챈 아름다움.',
      },
      {
        type: 'italic',
        text: '그것들은 사라지지 않는다. 다만 쌓인다.',
      },
      {
        type: 'paragraph',
        text: '나는 글을 쓰는 것이 어제를 되살리는 일이라고 생각하지 않는다. 그것은 어제를 오늘로 데려오는 일이다. 기억 속에서 잠든 것들을 불러내어, 지금 이 순간의 빛 아래 한 번 더 보여주는 일. 그렇게 해서 비로소, 우리는 어제와 작별을 고할 수 있다.',
      },
      {
        type: 'paragraph',
        text: '빠르게 보내는 것이 아니라. 충분히 바라보고, 충분히 느끼고, 충분히 사랑한 다음에.',
      },
      {
        type: 'pullquote',
        text: '오늘과 어제 사이 어딘가에, 당신의 이야기가 있다. 적어라. 천천히. 충분히.',
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
