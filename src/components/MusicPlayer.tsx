import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import loveSong from "@/assets/love-song.webm";

declare global {
  interface Window {
    __loveMusic?: { play: () => void; toggle: () => void };
  }
}

export function MusicPlayer() {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const playSong = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.72;
      audio
        .play()
        .then(() => {
          setNeedsTap(false);
          setPlaying(true);
        })
        .catch(() => {
          setNeedsTap(true);
          setPlaying(false);
        });
    };

    window.__loveMusic = {
      play: playSong,
      toggle: () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (!audio.paused) {
          audio.pause();
          setPlaying(false);
        } else {
          playSong();
        }
      },
    };

    playSong();

    const onFirstInteract = () => {
      playSong();
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    window.addEventListener("keydown", onFirstInteract, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
  }, []);

  const handleClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
    } else {
      window.__loveMusic?.play();
    }
  };

  const label = needsTap ? "tap to hear ♡" : playing ? "playing — aram ata hai" : "paused";

  if (!mounted) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <audio ref={audioRef} src={loveSong} loop preload="auto" playsInline />
      </div>

      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
        className="glass fixed top-5 right-5 z-[9998] flex items-center gap-2 rounded-full px-4 py-2.5 text-xs tracking-[0.25em] text-blush"
        style={{
          animation: playing ? "pulse-glow 2.4s ease-in-out infinite" : undefined,
        }}
      >
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{
            background: "var(--rose-glow)",
            boxShadow: "0 0 12px var(--rose-glow)",
            animation: playing ? "heartbeat 1.4s ease-in-out infinite" : undefined,
            opacity: playing ? 1 : 0.6,
          }}
        />
        <span style={{ fontFamily: "var(--font-serif)" }} className="italic">
          {label}
        </span>
      </motion.button>
    </>
  );
}
