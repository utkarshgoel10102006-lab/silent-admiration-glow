import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Petals } from "@/components/Petals";
import { HeartParticles } from "@/components/HeartParticles";
import { CursorGlow } from "@/components/CursorGlow";
import { PhotoFrame } from "@/components/PhotoFrame";
import { MusicPlayer } from "@/components/MusicPlayer";
import pari1 from "@/assets/pari1.png";
import pari2 from "@/assets/pari2.png";
import pari3 from "@/assets/pari3.png";
import pari4 from "@/assets/pari4.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tum Khaas Ho — Ek Khamoshi Si Mohabbat" },
      {
        name: "description",
        content:
          "Ek cinematic, khaamosh si mohabbat ki dastaan — petals, glow, aur kuch lafz tumhare liye.",
      },
      { property: "og:title", content: "Tum Khaas Ho" },
      {
        property: "og:description",
        content: "Ek khamoshi si mohabbat — cinematic visual letter.",
      },
    ],
  }),
});

const photos = [
  {
    src: pari1,
    shayari: [
      "Tumhe dekhkar lagta hai jaise",
      "khuda ne fursat se koi dua likhi ho…",
    ],
  },
  {
    src: pari2,
    shayari: [
      "Chehre par itni saadgi lekar bhi",
      "itna khoobsurat kaise dikha jaata hai koi…",
    ],
  },
  {
    src: pari3,
    shayari: [
      "Teri muskurahat mein shor nahi hota,",
      "phir bhi dil poora sun leta hai…",
    ],
  },
  {
    src: pari4,
    shayari: [
      "Tumhara hona hi kaafi hai,",
      "kuch lafz aksar chhote pad jaate hain…",
    ],
  },
];

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CursorGlow />
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.section
            key="intro"
            exit={{
              opacity: 0,
              filter: "blur(40px)",
              scale: 1.15,
              transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] },
            }}
            className="relative z-20 flex min-h-screen items-center justify-center px-6"
          >
            <Petals count={20} />
            <HeartParticles count={10} />
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, oklch(0.25 0.18 8 / 0.5), transparent 60%)",
              }}
            />
            <div className="relative max-w-3xl text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.3 }}
                className="mb-6 text-xs uppercase tracking-[0.5em] text-rose/70"
              >
                — A quiet letter —
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: "var(--font-script)" }}
                className="shimmer-text text-7xl leading-none md:text-9xl"
              >
                tum
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.4 }}
                style={{ fontFamily: "var(--font-hindi)" }}
                className="mt-4 text-lg text-blush/80 md:text-xl"
              >
                kuch hai jo lafzon mein nahi keh paaya…
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setEntered(true)}
                className="group relative mt-12 inline-flex items-center gap-3 rounded-full glass px-10 py-5 text-base tracking-widest text-foreground transition"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              >
                <span
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="font-light italic"
                >
                  Ek Baar Zaroor Dekho
                </span>
                <span className="text-rose transition group-hover:translate-x-1">
                  →
                </span>
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2, delay: 2.6 }}
                className="mt-10 text-xs tracking-[0.3em] text-muted-foreground"
              >
                YAHAN KUCH TUMHARE LIYE HAI
              </motion.p>
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="story"
            initial={{ opacity: 0, filter: "blur(30px)", scale: 0.95 }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              transition: { duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <Petals count={32} />
            <HeartParticles count={16} />

            {/* Hero after entry */}
            <section className="relative z-10 flex min-h-[90vh] items-center justify-center px-6 text-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.6 }}
                  className="text-xs uppercase tracking-[0.5em] text-rose/70"
                >
                  silent admiration
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2, delay: 0.8 }}
                  style={{ fontFamily: "var(--font-script)" }}
                  className="shimmer-text mt-4 text-7xl leading-none md:text-[10rem]"
                >
                  khaamoshi
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.6, delay: 1.6 }}
                  style={{ fontFamily: "var(--font-hindi)" }}
                  className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-blush/90 md:text-2xl"
                >
                  kuch baatein dil mein reh jaati hain —
                  <br />
                  yeh unhi mein se ek hai…
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 2.4 }}
                  className="mt-16 flex flex-col items-center gap-2 text-rose/60"
                >
                  <span className="text-xs tracking-[0.4em]">SCROLL</span>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-10 w-px bg-gradient-to-b from-rose to-transparent"
                  />
                </motion.div>
              </div>
            </section>

            {photos.map((p, i) => (
              <PhotoFrame
                key={i}
                src={p.src}
                shayari={p.shayari}
                index={i}
                reverse={i % 2 === 1}
              />
            ))}

            {/* Final */}
            <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-32 text-center">
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.3 0.2 8 / 0.4), transparent 60%)",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              >
                <p className="mb-6 text-xs uppercase tracking-[0.5em] text-rose/70">
                  — bas itna —
                </p>
                <h3
                  style={{ fontFamily: "var(--font-hindi)" }}
                  className="text-4xl leading-snug text-blush md:text-6xl text-glow"
                >
                  Bas itna samajh lo…
                  <br />
                  <span
                    style={{ fontFamily: "var(--font-script)" }}
                    className="shimmer-text mt-4 inline-block text-7xl md:text-9xl"
                  >
                    tum khaas ho.
                  </span>
                </h3>
                <motion.div
                  className="mx-auto mt-16 h-12 w-12"
                  animate={{ scale: [1, 1.15, 1, 1.08, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  <svg viewBox="0 0 24 24" className="h-full w-full" style={{ filter: "drop-shadow(0 0 20px oklch(0.7 0.28 12))" }}>
                    <path
                      d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"
                      fill="oklch(0.7 0.28 12)"
                    />
                  </svg>
                </motion.div>
                <p className="mt-12 text-xs tracking-[0.4em] text-muted-foreground">
                  — END OF A QUIET LETTER —
                </p>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
