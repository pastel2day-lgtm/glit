const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, Header, Footer, TableOfContents, PageBreak, Tab
} = require("docx");

// ---- Brand palette (from Instagram theme) ----
const CORAL   = "D9774E"; // deep coral (diamond accent)
const CORAL_L = "E89B7D"; // salmon
const CREAM   = "F4ECDD"; // ivory background
const CREAM_D = "EFE4CF";
const INK     = "2E2B28"; // charcoal text
const SUB     = "6E655C"; // muted brown-gray
const LINE    = "D8CDBA";

const FONT = "Malgun Gothic"; // Korean-friendly; falls back gracefully

// ---- helpers ----
const H = (text, opts = {}) => new Paragraph({
  heading: opts.level || HeadingLevel.HEADING_1,
  spacing: { before: opts.before ?? 320, after: opts.after ?? 160 },
  children: [new TextRun({ text })],
});

const P = (runs, opts = {}) => new Paragraph({
  spacing: { before: opts.before ?? 40, after: opts.after ?? 120, line: 300 },
  alignment: opts.align,
  shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill, color: "auto" } : undefined,
  border: opts.leftBar ? { left: { style: BorderStyle.SINGLE, size: 24, color: CORAL, space: 14 } } : undefined,
  indent: opts.leftBar ? { left: 220 } : opts.indent,
  children: Array.isArray(runs) ? runs : [new TextRun({ text: runs, size: opts.size || 22, color: opts.color || INK, bold: opts.bold, italics: opts.italics })],
});

const T = (text, o = {}) => new TextRun({ text, size: o.size || 22, color: o.color || INK, bold: o.bold, italics: o.italics });

const bullet = (text, sub) => new Paragraph({
  numbering: { reference: "b", level: 0 },
  spacing: { after: 80, line: 290 },
  children: [ new TextRun({ text, size: 22, color: INK }), ...(sub ? [new TextRun({ text: "  —  " + sub, size: 21, color: SUB })] : []) ],
});

// label chip line
const chip = (label, text) => new Paragraph({
  spacing: { after: 90, line: 290 },
  children: [
    new TextRun({ text: " " + label + " ", size: 18, bold: true, color: "FFFFFF", shading: { type: ShadingType.CLEAR, fill: CORAL, color: "auto" } }),
    new TextRun({ text: "  " + text, size: 22, color: INK }),
  ],
});

// 2-col table
const tbl = (rows, widths, headRow = true) => new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: widths,
  rows: rows.map((cells, ri) => new TableRow({
    tableHeader: headRow && ri === 0,
    children: cells.map((c, ci) => new TableCell({
      width: { size: widths[ci], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: (headRow && ri === 0) ? INK : (ri % 2 ? CREAM : "FFFFFF"), color: "auto" },
      margins: { top: 90, bottom: 90, left: 150, right: 150 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: LINE },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: LINE },
        left: { style: BorderStyle.SINGLE, size: 2, color: LINE },
        right: { style: BorderStyle.SINGLE, size: 2, color: LINE },
      },
      children: [new Paragraph({
        spacing: { line: 280 },
        children: Array.isArray(c) ? c : [new TextRun({ text: c, size: (headRow && ri === 0) ? 20 : 21, bold: (headRow && ri === 0) || ci === 0, color: (headRow && ri === 0) ? "FFFFFF" : INK })],
      })],
    })),
  })),
});

const spacer = (h = 80) => new Paragraph({ spacing: { after: h }, children: [new TextRun({ text: "" })] });

const rule = () => new Paragraph({ spacing: { before: 120, after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LINE, space: 1 } }, children: [new TextRun({ text: "" })] });

// section header band
const band = (no, title, en) => new Paragraph({
  spacing: { before: 360, after: 160 },
  shading: { type: ShadingType.CLEAR, fill: CREAM, color: "auto" },
  border: { left: { style: BorderStyle.SINGLE, size: 28, color: CORAL, space: 16 } },
  indent: { left: 200 },
  children: [
    new TextRun({ text: no + "  ", size: 26, bold: true, color: CORAL }),
    new TextRun({ text: title, size: 26, bold: true, color: INK }),
    new TextRun({ text: "   " + en, size: 17, color: SUB }),
  ],
});

const children = [];

// ===================== COVER =====================
children.push(new Paragraph({ spacing: { before: 700, after: 0 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "◆", size: 80, color: CORAL })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 0 }, children: [new TextRun({ text: "글릿", size: 64, bold: true, color: INK })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 0 }, children: [new TextRun({ text: "Gleam it, Glit!", size: 30, italics: true, color: CORAL })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 220, after: 0 }, children: [new TextRun({ text: "나의 삶 속에서 빛나는 문장을 발견하다", size: 24, color: SUB })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 0 }, children: [new TextRun({ text: "사람  |  잇다  |  글", size: 20, color: INK, bold: true })] }));
children.push(spacer(420));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "원페이지 웹사이트 기획서", size: 34, bold: true, color: INK })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Editorial One-Page Website · Planning Document", size: 18, color: SUB })] }));
children.push(spacer(260));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "작성일 2026.06.16   ·   v1.0", size: 18, color: SUB })] }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ===================== TOC =====================
children.push(H("목차", { level: HeadingLevel.HEADING_1, before: 80 }));
children.push(new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }));
children.push(new Paragraph({ spacing: { before: 80 }, children: [new TextRun({ text: "※ 목차는 Word에서 ‘필드 업데이트’ 시 페이지번호가 표시됩니다.", size: 17, color: SUB, italics: true })] }));
children.push(new Paragraph({ children: [new PageBreak()] }));

// ===================== 1. 프로젝트 개요 =====================
children.push(H("1. 프로젝트 개요"));
children.push(P("‘글릿(Glit)’은 일상 속에서 스쳐 지나가기 쉬운 마음과 문장을 천천히 모아 보여주는 에디토리얼 프로젝트입니다. 이번 웹사이트는 브랜드를 길게 설명하는 소개형 페이지가 아니라, 문장과 감성을 전면에 내세우는 ‘에디토리얼형 원페이지’로 설계합니다. 방문자가 정보를 읽기보다 글릿의 정서를 먼저 ‘경험’하게 만드는 것이 목표입니다."));
children.push(spacer(40));
children.push(tbl([
  ["항목", "내용"],
  ["브랜드명", "글릿 (Gleam it, Glit!)"],
  ["한 줄 정의", "나의 삶 속에서 빛나는 문장을 발견하는 에디토리얼 프로젝트"],
  ["핵심 키워드", "사람  |  잇다  |  글"],
  ["사이트 유형", "타이포그래피 중심 에디토리얼 원페이지 (앵커 스크롤형)"],
  ["사이트 역할", "글릿의 세계관을 짧고 선명하게 경험시키기"],
  ["목표 행동(KPI)", "정체성 이해 → 문장·콘텐츠 열람 → 하나의 참여(CTA) 전환"],
  ["연계 채널", "Instagram @gleamit_glit (‘당신의 이야기’ 시리즈)"],
], [2200, 7160]));

// ===================== 2. 기획 방향 =====================
children.push(band("2", "기획 방향", "Strategy"));
children.push(P([
  T("브랜드 핵심 메시지는 "),
  T("“나의 삶 속에서 빛나는 문장을 발견하다”", { bold: true }),
  T("이며, 사이트의 역할은 방문자에게 글릿의 세계관을 짧고 선명하게 경험시키는 것입니다. 따라서 정보 전달보다 "),
  T("첫인상 → 감정 → 공감 → 참여", { bold: true, color: CORAL }),
  T("의 흐름이 중요하며, 한 페이지 안에서 문장 중심으로 리듬감 있게 읽히는 구조가 가장 적합합니다."),
]));
children.push(P("타이포가 강한 사이트일수록 섹션 수를 과하게 늘리지 않을수록 읽기 좋습니다. 글릿은 5개 섹션 정도로 짧고 강하게 가는 편을 권장합니다.", { leftBar: true, color: SUB }));
children.push(spacer(20));
children.push(P([T("설계 원칙", { bold: true, color: CORAL, size: 23 })]));
children.push(bullet("적게 말하고 깊게 남긴다", "설명 대신 문장 1~2개로 정서를 먼저 전달"));
children.push(bullet("하나의 행동에 집중한다", "CTA를 여러 개 두지 않고 단일 행동으로 수렴"));
children.push(bullet("여백을 콘텐츠로 쓴다", "넓은 마진과 큰 타이포로 ‘읽는 호흡’을 만든다"));
children.push(bullet("인스타와 결을 잇는다", "‘당신의 이야기’ 시리즈 무드를 웹에서도 그대로 연결"));

// ===================== 3. 정보 구조 / 사이트맵 =====================
children.push(band("3", "정보 구조 · 사이트맵", "Structure"));
children.push(P("원페이지는 앵커(anchor) 기반으로 논리적 흐름을 만듭니다. 상단 고정 내비게이션의 메뉴를 누르면 해당 섹션으로 부드럽게 스크롤됩니다."));
children.push(tbl([
  ["#", "섹션", "역할", "앵커"],
  ["01", "Hero", "브랜드 첫인상 · 메인 카피", "#home"],
  ["02", "Concept", "사람·잇다·글 3축 정의", "#concept"],
  ["03", "Editorial", "실제 문장 카드 3~6개", "#archive"],
  ["04", "About / Why", "프로젝트의 이유 (에세이 톤)", "#about"],
  ["05", "Join / Submit", "단일 CTA (구독·제보·이동)", "#join"],
], [700, 1900, 4760, 2000]));
children.push(spacer(40));
children.push(P([T("네비게이션 구성  ", { bold: true }), T("글릿 ◆   ·   Concept   ·   Editorial   ·   About   ·   ", { color: SUB }), T("문장 만나러 가기", { bold: true, color: CORAL })]));

// ===================== 4. 섹션별 상세 설계 =====================
children.push(band("4", "섹션별 상세 설계", "Section Detail"));

const sec = (num, kr, desc, items) => {
  children.push(new Paragraph({ spacing: { before: 260, after: 100 }, children: [
    new TextRun({ text: num + "  ", size: 24, bold: true, color: CORAL }),
    new TextRun({ text: kr, size: 24, bold: true, color: INK }),
  ]}));
  children.push(P(desc));
  items.forEach(([k, v]) => children.push(new Paragraph({
    spacing: { after: 70, line: 290 }, indent: { left: 120 },
    children: [ new TextRun({ text: k + " · ", size: 21, bold: true, color: CORAL }), new TextRun({ text: v, size: 21, color: INK }) ],
  })));
};

sec("4.1", "Hero", "첫 화면에는 설명을 길게 쓰지 않습니다. 가장 큰 타이포로 브랜드 문장 1개 + 짧은 보조 문장만 둡니다. 배경은 인스타 카드처럼 살구·아이보리 톤의 단색 + 코럴 다이아몬드(◆) 심볼.", [
  ["메인 카피", "“글릿 Gleam it, Glit! 삶 속에서 반짝이는 문장을 발견합니다.”"],
  ["보조 카피", "“스쳐 지나간 마음, 오래 남는 문장, 사람과 사람 사이를 잇는 글을 모읍니다.”"],
  ["요소", "브랜드 심볼 ◆ · 스크롤 유도 인디케이터(↓) · 상단 고정 GNB"],
]);
sec("4.2", "Concept — 사람 | 잇다 | 글", "브랜드를 3개의 축으로 또렷하게 풀어냅니다. 각 축을 짧은 한 문장으로 정의해 추상적이지 않게 만듭니다. 3단 카드(데스크탑) / 세로 스택(모바일).", [
  ["사람", "“한 사람의 하루와 마음을 들여다보는 문장.”"],
  ["잇다", "“읽는 사람과 쓰는 사람, 오늘과 내일을 잇는 기록.”"],
  ["글", "“흘려보내기 아까운 문장을 천천히 모아두는 방식.”"],
]);
sec("4.3", "Editorial Sample", "글릿이 ‘무슨 톤의 문장을 다루는지’ 바로 느끼게 해주는 핵심 섹션입니다. 인스타 ‘당신의 이야기’ 시리즈처럼 살구·아이보리·차콜 3가지 배경의 문장 카드를 3~6개 배치합니다.", [
  ["카드 1", "“비교하는 대신, 오늘 한 만큼만 보기로 했어요.”"],
  ["카드 2", "“최근에 다시 시작한 게 있나요?”"],
  ["카드 3", "“고통은 피할 수 없지만 괴로움은 선택할 수 있다.”"],
  ["형식", "정사각/세로형 카드 · 큰 따옴표 인용 · 하단 시리즈 라벨(ep.04)"],
]);
sec("4.4", "About / Why", "왜 이 프로젝트를 시작했는지, 어떤 사람에게 필요한지 설명합니다. 회사 소개처럼 쓰지 않고 ‘에세이 한 단락’처럼 씁니다.", [
  ["본문 예시", "“우리는 매일 수많은 문장을 흘려보냅니다. 글릿은 그중 오래 남는 한 줄을 천천히 줍는 일에서 시작했습니다. 누군가의 하루를 닮은 문장이, 또 다른 누군가의 오늘을 밝힐 수 있다고 믿습니다.”"],
  ["대상", "바쁜 일상 속에서도 ‘좋은 문장 한 줄’로 마음을 정리하고 싶은 사람"],
]);
sec("4.5", "Join / Submit", "매거진·에디토리얼형 랜딩은 CTA를 여러 개 두기보다 하나의 행동에 집중할수록 좋습니다. 핵심 행동 1개 + 보조 링크 최소화.", [
  ["메인 CTA", "“빛나는 문장을 만나러 가기”  또는  “문장 수집 시작하기”"],
  ["입력", "이메일 1줄 입력(뉴스레터 구독) — 최소 마찰"],
  ["보조", "Instagram @gleamit_glit 이동 · 문장 제보 링크(텍스트 링크)"],
]);

// ===================== 5. 섹션 문안 (카피 모음) =====================
children.push(band("5", "섹션 문안 (카피 시트)", "Copy Sheet"));
children.push(P("아래 톤으로 시작하면 전체 분위기가 잘 잡힙니다. 그대로 적용하거나 변형해 사용하세요."));
children.push(tbl([
  ["섹션", "예시 문안"],
  ["Hero", "“글릿 Gleam it, Glit! 삶 속에서 반짝이는 문장을 발견합니다.”"],
  ["Subcopy", "“스쳐 지나간 마음, 오래 남는 문장, 사람과 사람 사이를 잇는 글을 모읍니다.”"],
  ["사람", "“한 사람의 하루와 마음을 들여다보는 문장.”"],
  ["잇다", "“읽는 사람과 쓰는 사람, 오늘과 내일을 잇는 기록.”"],
  ["글", "“흘려보내기 아까운 문장을 천천히 모아두는 방식.”"],
  ["CTA", "“빛나는 문장을 만나러 가기”  /  “문장 수집 시작하기”"],
], [1800, 7560]));

// ===================== 6. 디자인 가이드 (인스타 테마) =====================
children.push(band("6", "디자인 가이드 — 인스타 테마", "Design Guide"));
children.push(P("인스타그램 @gleamit_glit 피드의 무드를 그대로 웹으로 옮깁니다. 살구·아이보리·차콜의 따뜻한 3톤과 코럴 다이아몬드(◆) 심볼이 핵심입니다."));
children.push(spacer(30));
children.push(P([T("컬러 팔레트", { bold: true, color: CORAL, size: 23 })]));
children.push(tbl([
  ["역할", "컬러", "HEX", "용도"],
  [[new TextRun({ text: "●", color: CORAL, size: 26 }), new TextRun({ text: " Coral", size: 21, bold: true })], "딥 코럴", "#D9774E", "포인트·심볼·CTA·강조"],
  [[new TextRun({ text: "●", color: CORAL_L, size: 26 }), new TextRun({ text: " Salmon", size: 21, bold: true })], "살구", "#E89B7D", "Hero/카드 배경"],
  [[new TextRun({ text: "●", color: CREAM_D, size: 26 }), new TextRun({ text: " Ivory", size: 21, bold: true })], "아이보리", "#F4ECDD", "기본 배경"],
  [[new TextRun({ text: "●", color: INK, size: 26 }), new TextRun({ text: " Ink", size: 21, bold: true })], "차콜", "#2E2B28", "본문·다크 카드 배경"],
  [[new TextRun({ text: "●", color: SUB, size: 26 }), new TextRun({ text: " Sub", size: 21, bold: true })], "뮤트 브라운", "#6E655C", "보조 텍스트"],
], [2100, 2200, 1900, 3160]));
children.push(spacer(30));
children.push(P([T("타이포그래피", { bold: true, color: CORAL, size: 23 })]));
children.push(bullet("국문 본문/제목: 정돈된 산세리프 (예: Pretendard, Spoqa Han Sans Neo)", "가독성과 미니멀 톤"));
children.push(bullet("인용 문장: 큰 사이즈·넉넉한 행간으로 ‘여백의 호흡’ 강조"));
children.push(bullet("위계: Hero 48–72px · 섹션 제목 28–36px · 본문 16–18px (데스크탑 기준)"));
children.push(spacer(20));
children.push(P([T("무드 & 모션", { bold: true, color: CORAL, size: 23 })]));
children.push(bullet("미니멀·정돈·따뜻함", "장식 최소화, 한 화면 한 메시지"));
children.push(bullet("스크롤 시 문장 페이드인(fade-up) — 과하지 않게"));
children.push(bullet("심볼 ◆ 는 로딩·구분·포인트에 일관되게 반복 사용"));

// ===================== 7. 와이어프레임 (텍스트) =====================
children.push(band("7", "와이어프레임 (구조 스케치)", "Wireframe"));
children.push(P("데스크탑 기준 세로 흐름입니다. 모바일은 모든 단을 1열로 스택합니다.", { color: SUB }));
const wire = [
  "┌──────────────────────────────────────────────┐",
  "│  ◆ 글릿      Concept · Editorial · About   [CTA] │  ← 고정 GNB",
  "├──────────────────────────────────────────────┤",
  "│                                              │",
  "│            ◆   (코럴 심볼)                     │",
  "│      글릿  Gleam it, Glit!                     │  ① HERO",
  "│      삶 속에서 반짝이는 문장을 발견합니다           │",
  "│      ─ 짧은 보조 카피 ─              ↓ scroll    │",
  "├──────────────────────────────────────────────┤",
  "│   [ 사람 ]      [ 잇다 ]      [ 글 ]            │  ② CONCEPT",
  "│   한 줄 정의     한 줄 정의     한 줄 정의          │",
  "├──────────────────────────────────────────────┤",
  "│   ┌──살구──┐  ┌─아이보리─┐  ┌──차콜──┐        │",
  "│   │ ‘문장’  │  │ ‘문장?’ │  │ ‘문장’ │         │  ③ EDITORIAL",
  "│   └ ep.04 ─┘  └ ep.04 ─┘  └ ep.04 ─┘         │",
  "├──────────────────────────────────────────────┤",
  "│   About — 에세이 한 단락 (좌측 코럴 바)            │  ④ ABOUT",
  "├──────────────────────────────────────────────┤",
  "│        빛나는 문장을 만나러 가기                   │  ⑤ JOIN",
  "│        [  이메일 입력            ] [ 구독 ]        │",
  "│        Instagram @gleamit_glit · 문장 제보         │",
  "└──────────────────────────────────────────────┘",
];
wire.forEach(l => children.push(new Paragraph({ spacing: { after: 0, line: 240 }, children: [new TextRun({ text: l, font: "Consolas", size: 16, color: INK })] })));

// ===================== 8. 제작 가이드 / 다음 단계 =====================
children.push(band("8", "제작 가이드 · 다음 단계", "Next Steps"));
children.push(tbl([
  ["단계", "내용", "산출물"],
  ["1. 콘텐츠 확정", "문장 카드 6개·About 본문·CTA 문구 픽스", "카피 시트"],
  ["2. 디자인 시안", "컬러/타이포/카드 레이아웃 시안", "Figma 시안"],
  ["3. 개발", "원페이지(반응형) + 앵커 스크롤 + 폼 연동", "HTML/웹사이트"],
  ["4. 연동", "뉴스레터 구독 폼 · 인스타 링크", "구독 리스트"],
  ["5. 오픈/측정", "스크롤 깊이·CTA 전환 측정", "GA 리포트"],
], [1900, 5000, 2460]));
children.push(spacer(40));
children.push(P([T("권장 기술 스택  ", { bold: true }), T("정적 원페이지(HTML/CSS/JS) 또는 Framer/Webflow 등 노코드 — 타이포 중심이라 가볍게 가는 편을 권장.", { color: SUB })]));
children.push(rule());
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "◆", size: 36, color: CORAL })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "글릿 · Gleam it, Glit!", size: 20, bold: true, color: INK })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "나의 삶 속에서 빛나는 문장을 발견하다", size: 17, color: SUB })] }));

// ===================== DOC =====================
const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 22, color: INK } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: FONT, color: INK },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: FONT, color: INK },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [
    { reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "·", alignment: AlignmentType.LEFT, style: { run: { color: CORAL, bold: true }, paragraph: { indent: { left: 460, hanging: 260 } } } }] },
  ]},
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, right: 1440, bottom: 1300, left: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 8 } },
      children: [ new TextRun({ text: "글릿 Gleam it, Glit!  ·  웹사이트 기획서        ", size: 16, color: SUB }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: SUB }) ],
    })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync("글릿_웹사이트_기획서.docx", buf); console.log("written", buf.length); });
