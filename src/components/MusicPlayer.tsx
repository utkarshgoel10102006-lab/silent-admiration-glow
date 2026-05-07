import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// "Tu Jaane Na" — Atif Aslam (YouTube audio via hidden iframe)
const VIDEO_ID = "e6XOayuFTFE";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const init = () => {
      playerRef.current = new window.YT.Player("yt-audio", {
        videoId: VIDEO_ID,
        playerVars: { autoplay: 0, controls: 0, loop: 1, playlist: VIDEO_ID, modestbranding: 1 },
        events: {
          onReady: () => setReady(true),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      init();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = init;
    }
  }, []);

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    } else {
      playerRef.current.setVolume(60);
      playerRef.current.playVideo();
      setPlaying(true);
    }
  };

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
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? "Pause music" : "Play music"}
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
            opacity: playing ? 1 : 0.5,
          }}
        />
        <span style={{ fontFamily: "var(--font-serif)" }} className="italic">
          {playing ? "playing — tu jaane na" : "play tu jaane na"}
        </span>
      </motion.button>
    </>
  );
}
