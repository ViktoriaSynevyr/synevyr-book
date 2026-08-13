"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  loadReaderData,
  saveReaderData,
  type ReadingProgressData,
} from "../../lib/readerData";

type ReadingProgressProps = {
  title: string;
  path: string;
  chapterNumber?: number;
  partType?: "prologue" | "chapter" | "epilogue";
};

type CurrentReadingProgress = {
  lastPath: string;
  lastChapter: number | null;
  currentPart: number;
  totalParts: number;
  percent: number;
  title: string;
  updatedAt: string;
};

const TOTAL_PARTS = 24;

export default function ReadingProgress({
  title,
  path,
  chapterNumber,
  partType = "chapter",
}: ReadingProgressProps) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const lang =
    parts[0] === "uk" || parts[0] === "es"
      ? parts[0]
      : "en";

  const progressKey = "synevyr-reading-progress-" + lang;
  const completedKey = "synevyr-completed-chapters-" + lang;

  let currentPart = 1;

  if (
    partType === "chapter" &&
    chapterNumber !== undefined
  ) {
    currentPart = chapterNumber + 1;
  }

  if (partType === "epilogue") {
    currentPart = TOTAL_PARTS;
  }

  const percent = Math.round(
    (currentPart / TOTAL_PARTS) * 100
  );

  useEffect(() => {
    function loadLocalCompletedChapters(): number[] {
      const savedCompleted =
        localStorage.getItem(completedKey);

      if (!savedCompleted) {
        return [];
      }

      try {
        const parsed: unknown =
          JSON.parse(savedCompleted);

        if (!Array.isArray(parsed)) {
          return [];
        }

        return parsed.filter(
          (chapter): chapter is number =>
            typeof chapter === "number"
        );
      } catch {
        localStorage.removeItem(completedKey);
        return [];
      }
    }

    const readingProgress: CurrentReadingProgress = {
      lastPath: path,
      lastChapter:
        partType === "chapter"
          ? chapterNumber ?? null
          : null,
      currentPart,
      totalParts: TOTAL_PARTS,
      percent,
      title,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      progressKey,
      JSON.stringify(readingProgress)
    );

    const localCompleted =
      loadLocalCompletedChapters();

    if (
      partType === "chapter" &&
      chapterNumber !== undefined &&
      !localCompleted.includes(chapterNumber)
    ) {
      localCompleted.push(chapterNumber);
      localCompleted.sort((a, b) => a - b);

      localStorage.setItem(
        completedKey,
        JSON.stringify(localCompleted)
      );
    }

    async function syncWithSupabase() {
      const cloudData = await loadReaderData();

      if (!cloudData) {
        return;
      }

      const completedChapters = Array.from(
        new Set([
          ...cloudData.completed_chapters,
          ...localCompleted,
        ])
      ).sort((a, b) => a - b);

      const saved = await saveReaderData({
        bookmarks: cloudData.bookmarks,
        reading_progress:
          readingProgress as unknown as ReadingProgressData,
        completed_chapters: completedChapters,
      });

      if (!saved) {
        console.error(
          "Reading progress was saved locally, but cloud synchronization failed."
        );
      }
    }

    void syncWithSupabase();
  }, [
    chapterNumber,
    completedKey,
    currentPart,
    partType,
    path,
    percent,
    progressKey,
    title,
  ]);

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "720px",
        margin: "0 auto 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.65)",
        }}
      >
        <span>
          {lang === "uk"
            ? "Прогрес читання"
            : lang === "es"
            ? "Progreso de lectura"
            : "Reading progress"}
        </span>

        <span>{percent}%</span>
      </div>

      <div
      style={{
          width: "100%",
          height: "4px",
          overflow: "hidden",
          borderRadius: "999px",
          backgroundColor: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            width: percent + "%",
            height: "100%",
            borderRadius: "999px",
            background:
              "linear-gradient(to right, rgba(177, 102, 42, 0.75), #fff1c7)",
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </section>
  );
}