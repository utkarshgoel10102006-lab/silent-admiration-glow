import { useMemo } from "react";

export function Petals({ count = 28 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 9 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 300,
        scale: 0.5 + Math.random() * 1.2,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.scale})`,
            opacity: p.opacity,
            // @ts-expect-error custom prop
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
