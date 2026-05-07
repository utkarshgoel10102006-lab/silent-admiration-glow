import { useMemo } from "react";

export function HeartParticles({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 6 + Math.random() * 14,
        delay: Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      {items.map((it, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: it.size,
            height: it.size,
            opacity: it.opacity,
            animation: `float-y 6s ease-in-out ${it.delay}s infinite, heartbeat 3.2s ease-in-out ${it.delay}s infinite`,
            filter: "drop-shadow(0 0 8px oklch(0.7 0.28 12 / 0.8))",
          }}
        >
          <path
            d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"
            fill="oklch(0.7 0.28 12)"
          />
        </svg>
      ))}
    </div>
  );
}
