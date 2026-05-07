import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  src: string;
  shayari: string[];
  index: number;
  reverse?: boolean;
}

export function PhotoFrame({ src, shayari, index, reverse }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.12, 1.05]);

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24"
    >
      <div
        className={`grid w-full max-w-6xl items-center gap-12 md:gap-20 md:grid-cols-2 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ y }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="relative overflow-hidden rounded-[2rem] glass"
            style={{
              animation: "pulse-glow 4.5s ease-in-out infinite",
              boxShadow: "0 30px 80px oklch(0 0 0 / 0.6)",
            }}
          >
            <motion.img
              src={src}
              alt="A quiet portrait"
              style={{ scale }}
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, oklch(0.05 0.02 350 / 0.5))",
              }}
            />
          </div>
          <div
            className="absolute -inset-4 -z-10 rounded-[2.5rem] opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.65 0.25 8 / 0.4), transparent 70%)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent via-rose to-transparent" />
            <span
              style={{ fontFamily: "var(--font-script)" }}
              className="text-2xl text-rose"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-rose/40 to-transparent" />
          </div>
          <p
            style={{ fontFamily: "var(--font-hindi)" }}
            className="text-2xl leading-relaxed text-blush md:text-3xl"
          >
            {shayari.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
