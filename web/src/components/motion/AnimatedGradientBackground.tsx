/**
 * Layered gradient blobs + subtle tech grid.
 * Pure CSS animations (transform-only) — runs on the compositor,
 * no main-thread work, no expensive blur filters.
 */
export function AnimatedGradientBackground({
  intensity = 1,
  grid = true,
}: {
  intensity?: number;
  grid?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* deep base */}
      <div className="absolute inset-0 bg-[color:var(--bg)]" />

      {/* blue/violet — top left */}
      <div
        className="blob-a absolute -top-[25%] -left-[20%] h-[75vmax] w-[75vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,147,255,0.18) 0%, rgba(124,147,255,0.05) 35%, transparent 65%)",
          opacity: 0.9 * intensity,
        }}
      />

      {/* cyan — bottom right */}
      <div
        className="blob-b absolute -bottom-[30%] -right-[15%] h-[70vmax] w-[70vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.13) 0%, rgba(94,234,212,0.04) 35%, transparent 65%)",
          opacity: 0.75 * intensity,
        }}
      />

      {/* purple — center pulse */}
      <div
        className="blob-c absolute top-1/3 left-1/2 h-[45vmax] w-[45vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.10) 0%, rgba(167,139,250,0.03) 40%, transparent 65%)",
          opacity: 0.7 * intensity,
        }}
      />

      {/* grid */}
      {grid && (
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-70" />
      )}

      {/* noise */}
      <div className="noise" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,7,0.65) 100%)",
        }}
      />
    </div>
  );
}
