import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VIDEO_ID = "e6XOayuFTFE"; // Tu Jaane Na — Atif Aslam

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    __loveMusic?: { unmute: () => void; toggle: () => void };
  }
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const init = () => {
      playerRef.current = new window.YT.Player("yt-audio", {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            // Muted autoplay (browser-allowed)
            e.target.mute();
            e.target.setVolume(70);
            e.target.playVideo();
            setPlaying(true);
          },
          onStateChange: (e: any) => {
            if (e.data === 1) setPlaying(true);
            if (e.data === 2) setPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      init();
    } else if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = init;
    } else {
      window.onYouTubeIframeAPIReady = init;
    }

    // Expose helpers so the intro button can unmute on user gesture
    window.__loveMusic = {
      unmute: () => {
        const p = playerRef.current;
        if (!p) return;
        try {
          p.unMute();
          p.setVolume(70);
          p.playVideo();
          setMuted(false);
          setPlaying(true);
        } catch {}
      },
      toggle: () => {
        const p = playerRef.current;
        if (!p) return;
        if (playing) {
          p.pauseVideo();
          setPlaying(false);
        } else {
          p.playVideo();
          setPlaying(true);
        }
      },
    };

    // Fallback: unmute on first user interaction anywhere
    const onFirstInteract = () => {
      window.__loveMusic?.unmute();
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
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      window.__loveMusic?.unmute();
      return;
    }
    if (playing) {
      p.pauseVideo();
      setPlaying(false);
    } else {
      p.playVideo();
      setPlaying(true);
    }
  };

  const label = muted
    ? "tap to hear ♡"
    : playing
      ? "playing — tu jaane na"
      : "paused";

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
        <div id="yt-audio" />
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
          animation: playing && !muted ? "pulse-glow 2.4s ease-in-out infinite" : undefined,
        }}
      >
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{
            background: "var(--rose-glow)",
            boxShadow: "0 0 12px var(--rose-glow)",
            animation: playing && !muted ? "heartbeat 1.4s ease-in-out infinite" : undefined,
            opacity: playing && !muted ? 1 : 0.6,
          }}
        />
        <span style={{ fontFamily: "var(--font-serif)" }} className="italic">
          {label}
        </span>
      </motion.button>
    </>
  );
}
