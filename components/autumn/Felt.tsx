// 가을 펠트 일러스트 조각들. 모두 인라인 SVG이며, 질감은 feTurbulence 필터로 냅니다.

const STITCH = {
  fill: 'none',
  stroke: '#FFF3DF',
  strokeWidth: 2.6,
  strokeDasharray: '8 6',
  strokeLinecap: 'round' as const,
}

/** SVG 안에 한 번 넣어 두면 filter="url(#{id})"로 펠트 질감을 입힐 수 있습니다. */
export function FeltFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-10%" y="-10%" width="120%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="5" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" result="fz" />
      <feColorMatrix
        in="n"
        type="matrix"
        values="0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 -0.9 0.5"
        result="s"
      />
      <feComposite in="s" in2="fz" operator="in" result="si" />
      <feMerge result="m">
        <feMergeNode in="fz" />
        <feMergeNode in="si" />
      </feMerge>
      <feDropShadow in="m" dx="0" dy="4" stdDeviation="4" floodColor="#3A2E25" floodOpacity="0.25" />
    </filter>
  )
}

export function Leaf({
  kind = 'oval',
  color,
  className = '',
  style,
}: {
  kind?: 'oval' | 'ginkgo'
  color: string
  className?: string
  style?: React.CSSProperties
}) {
  const id = `leaf-${kind}-${color.slice(1)}`
  return (
    <svg viewBox="-90 -90 180 190" aria-hidden="true" className={className} style={style}>
      <defs>
        <FeltFilter id={id} />
      </defs>
      {kind === 'oval' ? (
        <g filter={`url(#${id})`}>
          <path fill={color} d="M0,-60 C38,-38 38,32 0,62 C-38,32 -38,-38 0,-60Z" />
          <path d="M0,60 Q3,74 9,86" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g filter={`url(#${id})`}>
          <path fill={color} d="M0,40 Q-36,4 -72,-30 Q-58,-66 -8,-64 L0,-50 L8,-64 Q58,-66 72,-30 Q36,4 0,40Z" />
          <path d="M0,38 L5,84" stroke={color} strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
      {kind === 'oval' ? (
        <path {...STITCH} opacity={0.85} d="M0,-44 C26,-28 26,24 0,46 C-26,24 -26,-28 0,-44Z M0,-34 L0,36" />
      ) : (
        <path
          {...STITCH}
          opacity={0.85}
          d="M0,24 Q-28,-2 -55,-28 Q-46,-50 -9,-50 L0,-38 L9,-50 Q46,-50 55,-28 Q28,-2 0,24Z M0,20 L0,-34"
        />
      )}
    </svg>
  )
}

export function FeltDiamond({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-4 -4 32 34" aria-hidden="true" className={className}>
      <defs>
        <FeltFilter id="felt-diamond" />
      </defs>
      <path filter="url(#felt-diamond)" fill="#D9774E" d="M12 0L24 12L12 24L0 12Z" />
      <path {...STITCH} strokeWidth={1.2} strokeDasharray="2.6 2" d="M12 4L20 12L12 20L4 12Z" />
    </svg>
  )
}

export function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 130" aria-hidden="true" className={className}>
      <defs>
        <FeltFilter id="felt-cloud" />
      </defs>
      <path
        filter="url(#felt-cloud)"
        fill="#F6ECD8"
        d="M40,118 C10,118 6,80 34,74 C30,44 66,30 88,48 C98,16 150,10 166,44 C190,28 226,44 220,76 C250,80 250,118 222,118Z"
      />
      <path
        {...STITCH}
        stroke="#D8C6A6"
        d="M42,108 C20,108 18,84 42,82 C38,54 68,44 88,60 C98,30 146,24 160,56 C184,40 214,54 208,82 C236,86 236,108 214,108Z"
      />
    </svg>
  )
}

type Bush = { cx: number; cy: number; r: number }

const HILLS: { color: string; bushes: Bush[] }[] = [
  { color: '#7E8B3E', bushes: [{ cx: 40, cy: 310, r: 120 }, { cx: 170, cy: 260, r: 110 }, { cx: 290, cy: 320, r: 95 }] },
  { color: '#DDA03A', bushes: [{ cx: 420, cy: 300, r: 100 }, { cx: 540, cy: 250, r: 115 }, { cx: 660, cy: 315, r: 90 }] },
  { color: '#96A04A', bushes: [{ cx: 800, cy: 310, r: 100 }, { cx: 910, cy: 275, r: 95 }] },
  { color: '#C2622F', bushes: [{ cx: 1050, cy: 315, r: 95 }, { cx: 1180, cy: 250, r: 120 }, { cx: 1330, cy: 295, r: 105 }, { cx: 1440, cy: 330, r: 90 }] },
]

/** 히어로·Join 하단의 가을 언덕 장면. props=false면 소품 없이 언덕만 그립니다. */
export function HillScene({ props = true, className = '' }: { props?: boolean; className?: string }) {
  const f = props ? 'felt-hill' : 'felt-hill-plain'
  return (
    <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className={className}>
      <defs>
        <FeltFilter id={f} />
        <pattern id={`${f}-check`} width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
          <rect width="36" height="36" fill="#F1E2C4" />
          <rect width="18" height="18" fill="#C65F35" />
          <rect x="18" y="18" width="18" height="18" fill="#C65F35" />
        </pattern>
      </defs>

      {HILLS.map((hill) => (
        <g key={hill.color} filter={`url(#${f})`}>
          {hill.bushes.map((b) => (
            <circle key={`${b.cx}-${b.cy}`} cx={b.cx} cy={b.cy} r={b.r} fill={hill.color} />
          ))}
        </g>
      ))}
      {HILLS.flatMap((hill) =>
        hill.bushes.map((b) => (
          <circle key={`s-${b.cx}-${b.cy}`} cx={b.cx} cy={b.cy} r={b.r - 9} {...STITCH} opacity={0.55} />
        )),
      )}

      <path filter={`url(#${f})`} fill="#C9A548" d="M0,300 Q360,250 720,282 T1440,268 L1440,420 L0,420Z" />
      <path {...STITCH} opacity={0.7} d="M0,314 Q360,264 720,296 T1440,282" />

      {props && (
        <g>
          <g filter={`url(#${f})`}>
            <polygon points="560,336 870,326 910,404 520,414" fill={`url(#${f}-check)`} />
            {/* 펼친 책 */}
            <polygon points="600,350 715,362 715,392 594,380" fill="#F4E9D3" />
            <polygon points="715,362 830,350 836,380 715,392" fill="#FBF3E4" />
            {/* 찻잔 */}
            <ellipse cx="955" cy="392" rx="46" ry="11" fill="#F4E9D3" />
            <path d="M925,350 L985,350 L978,386 Q955,396 932,386Z" fill="#DDA03A" />
            <path d="M985,358 q22,4 12,22 q-6,8 -16,8" stroke="#DDA03A" strokeWidth="7" fill="none" />
            {/* 쌓인 책 */}
            <rect x="420" y="366" width="96" height="22" rx="3" fill="#7E8B3E" />
            <rect x="428" y="346" width="86" height="20" rx="3" fill="#F1E2C4" transform="rotate(-3 470 356)" />
            <rect x="424" y="326" width="90" height="20" rx="3" fill="#9E4430" transform="rotate(2 470 336)" />
          </g>
          <g stroke="#4A3627" strokeWidth="3" strokeLinecap="round">
            <path d="M620 362 L690 370" />
            <path d="M620 372 L680 379" />
            <path d="M740 370 L810 362" />
            <path d="M740 380 L800 373" />
          </g>
          <polygon points="566,343 864,333 900,398 528,407" {...STITCH} opacity={0.6} />
        </g>
      )}
    </svg>
  )
}
