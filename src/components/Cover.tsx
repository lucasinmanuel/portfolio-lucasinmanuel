type CoverProps = {
  hue: number
  monogram: string
  className?: string
  /** Scales the monogram and grid. Thumbnails need a tighter weave. */
  size?: 'thumb' | 'card' | 'hero'
}

/**
 * Projects are closed-source, so there is no screenshot to show. Each one gets a
 * generated cover instead — derived from its hue, so the same project always
 * looks the same and no two sit next to each other looking alike.
 */
export function Cover({ hue, monogram, className = '', size = 'card' }: CoverProps) {
  const grid = size === 'thumb' ? 8 : size === 'card' ? 22 : 40
  const type = size === 'thumb' ? 'text-lg' : size === 'card' ? 'text-6xl' : 'text-[9rem]'

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg,
          hsl(${hue} 62% 24%) 0%,
          hsl(${hue} 55% 13%) 45%,
          hsl(${hue + 30} 45% 8%) 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `linear-gradient(hsl(${hue} 90% 80%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(${hue} 90% 80%) 1px, transparent 1px)`,
          backgroundSize: `${grid}px ${grid}px`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 18% 8%,
            hsl(${hue} 95% 68% / 0.38) 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-void/75 via-transparent to-transparent" />
      <span
        className={`absolute right-[-0.08em] bottom-[-0.28em] font-mono font-bold ${type} leading-none tracking-tighter select-none`}
        style={{ color: `hsl(${hue} 90% 85% / 0.14)` }}
      >
        {monogram}
      </span>
    </div>
  )
}
