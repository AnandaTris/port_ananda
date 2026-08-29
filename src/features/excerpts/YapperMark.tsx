import {
  ART_BODY,
  ART_HEIGHT,
  ART_WIDTH,
  BAR_WIDTH,
  BARS,
  BOLT_PATH,
  DOT_RADIUS,
  DOTS,
  MARK_MID_Y,
  SHELL_PATH,
  SHOUT_DOT,
  SHOUT_STEM,
  WAVE_PATH,
  WAVE_STROKE,
  type Yapper,
} from '@/content/yappers'

/**
 * One yapper, drawn the way the product draws it: a near-black bubble with the
 * accent as a rim and as the mark inside. The accent never becomes a fill,
 * because the palette it belongs to was validated as a rim on that body.
 *
 * Decorative in every placement here — the name is always written next to it —
 * so the SVG stays out of the accessibility tree.
 */
export function YapperMark({ yapper, width }: { yapper: Yapper; width: number }) {
  const { accent, mark, stroke } = yapper

  return (
    <svg
      aria-hidden="true"
      className="yapper-mark"
      focusable="false"
      height={(width * ART_HEIGHT) / ART_WIDTH}
      viewBox={`0 0 ${ART_WIDTH} ${ART_HEIGHT}`}
      width={width}
    >
      <path
        d={SHELL_PATH}
        fill={ART_BODY}
        stroke={accent}
        strokeLinejoin="round"
        strokeWidth={stroke}
      />
      {mark === 'bars' &&
        BARS.map((bar) => (
          <rect
            fill={accent}
            height={bar.h}
            key={bar.x}
            rx={BAR_WIDTH / 2}
            width={BAR_WIDTH}
            x={bar.x}
            y={MARK_MID_Y - bar.h / 2}
          />
        ))}
      {mark === 'dots' &&
        DOTS.map((cx) => <circle cx={cx} cy={MARK_MID_Y} fill={accent} key={cx} r={DOT_RADIUS} />)}
      {mark === 'wave' && (
        <path
          d={WAVE_PATH}
          fill="none"
          stroke={accent}
          strokeLinecap="round"
          strokeWidth={WAVE_STROKE}
        />
      )}
      {mark === 'shout' && (
        <>
          <rect
            fill={accent}
            height={SHOUT_STEM.h}
            rx={SHOUT_STEM.w / 2}
            width={SHOUT_STEM.w}
            x={SHOUT_STEM.x}
            y={SHOUT_STEM.y}
          />
          <circle cx={SHOUT_DOT.cx} cy={SHOUT_DOT.cy} fill={accent} r={SHOUT_DOT.r} />
        </>
      )}
      {mark === 'bolt' && <path d={BOLT_PATH} fill={accent} />}
    </svg>
  )
}
