/** Static blueprint elevation for devices without WebGL (and while loading). */
export function HeroFallback() {
  return (
    <div aria-hidden className="bg-blueprint absolute inset-0 flex items-end justify-center lg:justify-end lg:pr-[16%]">
      <svg viewBox="0 0 200 520" className="h-[78%] text-cyan/60" fill="none" stroke="currentColor" strokeWidth="1">
        {Array.from({ length: 24 }, (_, i) => {
          const y = 470 - i * 18;
          const w = 62 - i * 0.6;
          return <path key={i} d={`M${100 - w} ${y} L${100 + w} ${y - 4}`} />;
        })}
        <path d="M38 470 L52 38 M162 466 L148 34 M100 38 V4" />
        <path d="M10 470 H190 V500 H10 Z" stroke="#e2b859" />
      </svg>
    </div>
  );
}
