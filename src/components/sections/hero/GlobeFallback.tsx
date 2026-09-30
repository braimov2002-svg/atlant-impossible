/** Static, zero-JS stand-in for the globe (no WebGL, or while three.js loads). */
export function GlobeFallback() {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[6%]">
      <div className="relative aspect-square w-[82vw] max-w-[860px] lg:w-[58vw]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,#0f4d31_0%,#06170f_55%,#030b07_100%)] shadow-[0_0_120px_20px_rgb(25_227_138/0.12)]" />
        <div className="bg-field-grid absolute inset-0 rounded-full opacity-60 [mask-image:radial-gradient(circle,#000_55%,transparent_71%)]" />
        <div className="absolute top-[44%] left-[46%] h-[9%] w-[16%] rounded-[40%] bg-lime/30 blur-md" />
        <div className="absolute top-[46%] left-[55%] h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_#d4af37]" />
      </div>
    </div>
  );
}
