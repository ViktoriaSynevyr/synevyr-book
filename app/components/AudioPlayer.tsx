"use client";

import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
  chapterNumber: number | string;
};

export default function AudioPlayer({
  src,
  chapterNumber,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const storageKey = `audio-progress-${chapterNumber}`;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const savedTime = Number(
      localStorage.getItem(storageKey) || 0
    );

    const restoreProgress = () => {
      if (
        Number.isFinite(savedTime) &&
        savedTime > 0 &&
        savedTime < audio.duration
      ) {
        audio.currentTime = savedTime;
        setCurrentTime(savedTime);
      }
    };

    if (audio.readyState >= 1) {
      restoreProgress();
    } else {
      audio.addEventListener(
        "loadedmetadata",
        restoreProgress,
        { once: true }
      );
    }

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        restoreProgress
      );
    };
  }, [storageKey, src]);

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error(
          "Audio playback failed:",
          error
        );
      }
    } else {
      audio.pause();
    }
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setCurrentTime(audio.currentTime);

    localStorage.setItem(
      storageKey,
      String(audio.currentTime)
    );
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setDuration(audio.duration);
  }

  function handleSeek(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);

    localStorage.setItem(
      storageKey,
      String(newTime)
    );
  }

  function skip(seconds: number) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const audioDuration =
      Number.isFinite(audio.duration)
        ? audio.duration
        : 0;

    const newTime = Math.min(
      Math.max(
        audio.currentTime + seconds,
        0
      ),
      audioDuration
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function changePlaybackRate(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const newRate = Number(event.target.value);

    audio.playbackRate = newRate;
    setPlaybackRate(newRate);
  }

  function formatTime(time: number) {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          localStorage.removeItem(storageKey);
        }}
      />

      <button
  type="button"
  onClick={() =>
    setIsOpen((previous) => !previous)
  }
  className={
    isOpen || isPlaying
      ? "grid h-11 w-11 min-h-11 min-w-11 place-items-center rounded-full border border-amber-200/60 bg-amber-200/15 text-xl text-amber-100 shadow-lg transition hover:bg-amber-200/25"
      : "grid h-11 w-11 min-h-11 min-w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-xl text-white/70 shadow-lg transition hover:border-amber-200/50 hover:bg-amber-200/10 hover:text-amber-100"
  }
  aria-label="Audiobook"
  title="Audiobook"
>
  ♫
</button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[280px] rounded-2xl border border-amber-100/20 bg-[#11110f]/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-100/60">
              Audiobook
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-lg text-white/50 transition hover:text-white"
              aria-label="Close audiobook player"
            >
              ×
            </button>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => skip(-10)}
              className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:bg-white/10"
            >
              −10
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-lg text-[#181610] transition hover:scale-105"
              aria-label={
                isPlaying ? "Pause" : "Play"
              }
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>

            <button
              type="button"
              onClick={() => skip(10)}
              className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:bg-white/10"
            >
              +10
            </button>
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(
                currentTime,
                duration || 0
              )}
              onChange={handleSeek}
              className="w-full cursor-pointer"
              aria-label="Audio progress"
            />

            <div className="mt-1 flex justify-between text-[11px] text-white/40">
              <span>
                {formatTime(currentTime)}
              </span>

              <span>
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <select
              value={playbackRate}
              onChange={changePlaybackRate}
              className="rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs text-white"
              aria-label="Playback speed"
            >
              <option value={0.75}>
                0.75×
              </option>

              <option value={1}>
                1×
              </option>

              <option value={1.25}>
                1.25×
              </option>

              <option value={1.5}>
                1.5×
              </option>

              <option value={2}>
                2×
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
