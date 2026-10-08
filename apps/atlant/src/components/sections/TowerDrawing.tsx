/**
 * Worm's-eye line drawing of a tower corner (two curtain-wall faces receding
 * to the sides, floors tightening toward the sky). Pure SVG, drawn on with a
 * CSS stroke animation — an architectural drawing, not an illustration.
 */
type P = [number, number];
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

interface Face {
  bl: P;
  br: P;
  tr: P;
  tl: P;
  /** spacing curve for columns: dense toward the outer edge */
  col: (u: number) => number;
}

const FACES: Face[] = [
  { bl: [40, 1000], br: [470, 1000], tr: [440, 60], tl: [235, 175], col: (u) => u ** 1.35 },
  { bl: [470, 1000], br: [900, 965], tr: [705, 195], tl: [440, 60], col: (u) => 1 - (1 - u) ** 1.35 },
];
const COLS = 9;
const FLOORS = 24;
const floorAt = (v: number) => 1 - (1 - v) ** 1.75;

type Seg = { a: P; b: P; kind: "col" | "floor" };
const SEGMENTS: Seg[] = FACES.flatMap((f) => {
  const segs: Seg[] = [];
  for (let i = 1; i < COLS; i++) {
    const u = f.col(i / COLS);
    segs.push({ a: lerp(f.bl, f.br, u), b: lerp(f.tl, f.tr, u), kind: "col" });
  }
  for (let j = 1; j < FLOORS; j++) {
    const v = floorAt(j / FLOORS);
    segs.push({ a: lerp(f.bl, f.tl, v), b: lerp(f.br, f.tr, v), kind: "floor" });
  }
  return segs;
});

const d = (s: Seg) => `M${s.a[0].toFixed(1)} ${s.a[1].toFixed(1)}L${s.b[0].toFixed(1)} ${s.b[1].toFixed(1)}`;

export function TowerDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 1000" preserveAspectRatio="xMidYMax slice" fill="none" className={className} aria-hidden>
      <g strokeWidth="1">
        {SEGMENTS.map((s, i) => (
          <path
            key={i}
            d={d(s)}
            pathLength={1}
            strokeDasharray="1"
            stroke="#fff"
            strokeOpacity={s.kind === "col" ? 0.2 : 0.12}
            className="animate-draw"
            style={{ animationDelay: `${0.2 + (i % 32) * 0.035}s` }}
          />
        ))}
      </g>
      {/* outline: outer edges, the corner and the parapet */}
      <g strokeWidth="1.4">
        {FACES.map((f, i) => (
          <path
            key={i}
            d={`M${f.bl.join(" ")}L${f.tl.join(" ")}L${f.tr.join(" ")}L${f.br.join(" ")}`}
            pathLength={1}
            strokeDasharray="1"
            stroke="#fff"
            strokeOpacity="0.42"
            className="animate-draw"
            style={{ animationDelay: `${0.1 + i * 0.15}s` }}
          />
        ))}
        <path d="M235 175L440 60L705 195" pathLength={1} strokeDasharray="1" stroke="#c9a865" strokeOpacity="0.85" className="animate-draw" style={{ animationDelay: "1.2s" }} />
      </g>
    </svg>
  );
}
