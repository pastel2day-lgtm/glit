// 아홉 유형 점수 막대 그래프. 내 결만 강조색, 나머지는 회색으로 두는 강조형 차트입니다.
// 회색 막대는 배경 대비가 낮아서, 모든 막대에 값을 글자로 함께 적습니다.

export type GrainScoreRow = {
  number: number
  name: string
  count: number
  max: number
}

const EMPHASIS = '#B5532E'
const CONTEXT = '#BDB09A'
const TRACK = '#E9DFCB'

export default function GrainScoreChart({ rows, highlight }: { rows: GrainScoreRow[]; highlight: number }) {
  return (
    <ol className="space-y-1">
      {rows.map((row) => {
        const isMe = row.number === highlight
        const ratio = row.max > 0 ? row.count / row.max : 0
        return (
          <li
            key={row.number}
            tabIndex={0}
            aria-label={`${row.number}번 ${row.name}: ${row.max}문항 중 ${row.count}번 선택`}
            className="group relative grid grid-cols-[7rem_1fr_1.75rem] items-center gap-3 rounded-xl px-2 py-1.5 outline-none transition-colors hover:bg-white/60 focus:bg-white/60 sm:grid-cols-[8.5rem_1fr_2rem]"
          >
            <span className={`text-sm ${isMe ? 'font-bold text-au-ink' : 'text-au-ink/70'}`}>
              <span className="mr-1.5 font-jua">{row.number}</span>
              {row.name}
            </span>
            <span className="relative h-3.5 rounded-r-[4px]" style={{ backgroundColor: TRACK }}>
              <span
                className="absolute inset-y-0 left-0 rounded-r-[4px]"
                style={{ width: `${ratio * 100}%`, backgroundColor: isMe ? EMPHASIS : CONTEXT }}
              />
            </span>
            <span className={`text-right text-sm tabular-nums ${isMe ? 'font-bold text-au-ink' : 'text-au-ink/60'}`}>
              {row.count}
            </span>
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-8 right-8 z-10 hidden whitespace-nowrap rounded-lg bg-au-ink px-2.5 py-1 text-xs text-au-cream shadow-lg group-hover:block group-focus:block"
            >
              <strong className="font-bold">{row.count}번 선택</strong>
              <span className="opacity-75"> · {row.max}문항 중</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}
