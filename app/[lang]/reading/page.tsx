"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { chapterTitles } from "../../../data/contents";

type ReadingProgress = {
  lastPath?: string;
  lastTitle?: string;
  title?: string;
  percent?: number;
};

export default function ReadingContentsPage() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const [lastPath, setLastPath] = useState("");
  const [lastTitle, setLastTitle] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(
      "synevyr-reading-progress-" + lang
    );

    if (savedProgress) {
      try {
        const parsedProgress: ReadingProgress = JSON.parse(savedProgress);

        setLastPath(parsedProgress.lastPath || "");
        setLastTitle(
          parsedProgress.title ||
            parsedProgress.lastTitle ||
            ""
        );
        setProgressPercent(parsedProgress.percent || 0);
      } catch {
        localStorage.removeItem(
          "synevyr-reading-progress-" + lang
        );
      }
    }

    const savedCompleted = localStorage.getItem(
      "synevyr-completed-chapters-" + lang
    );

    if (savedCompleted) {
      try {
        const parsedCompleted = JSON.parse(savedCompleted);

        if (Array.isArray(parsedCompleted)) {
          setCompletedChapters(parsedCompleted);
        }
      } catch {
        localStorage.removeItem(
          "synevyr-completed-chapters-" + lang
        );
      }
    }
  }, [lang]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07130f] text-white">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/forest.png')",
        }}
      />

      <div className="fixed inset-0 bg-black/70" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-16 md:px-10">
        <Link
          href={"/" + lang}
          className="mb-10 w-fit text-sm text-white/70 transition hover:text-white"
        >
          {lang === "uk"
            ? "← На головну"
            : lang === "es"
            ? "← Volver al inicio"
            : "← Back to home"}
        </Link>

        <header className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-200/70">
            {lang === "uk"
              ? "Легенда про озеро Синевир"
              : lang === "es"
              ? "La leyenda del lago Synevyr"
              : "Legend of Lake Synevyr"}
          </p>

          <h1 className="text-4xl font-bold text-amber-100 md:text-6xl">
            {lang === "uk"
              ? "Зміст"
              : lang === "es"
              ? "Índice"
              : "Contents"}
          </h1>

          <div className="mx-auto mt-6 h-px w-32 bg-amber-200/40" />
        </header>

        {lastPath && (
          <Link
            href={lastPath}
            className="mx-auto mb-8 block w-full max-w-2xl rounded-2xl border border-amber-200/30 bg-amber-200/10 p-5 backdrop-blur-md transition hover:bg-amber-200/15"
          >
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="mb-1 text-sm uppercase tracking-[0.2em] text-amber-200/70">
                  {lang === "uk"
                    ? "Продовжити читання"
                    : lang === "es"
                    ? "Continuar leyendo"
                    : "Continue reading"}
                </p>

                <p className="text-lg font-semibold text-amber-100">
                  {lastTitle}
                </p>
              </div>

              <span className="text-2xl text-amber-200">
                →
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs text-white/55">
                <span>
                  {lang === "uk"
                    ? "Прогрес"
                    : lang === "es"
                    ? "Progreso"
                    : "Progress"}
                </span>

                <span>{progressPercent}%</span>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-200 transition-all"
                  style={{
                    width: progressPercent + "%",
                  }}
                />
              </div>
            </div>
          </Link>
        )}

        <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl backdrop-blur-md md:p-10">
          <Link
            href={"/" + lang + "/reading/prologue"}
            className="group flex items-center justify-between rounded-xl border-b border-white/10 px-3 py-5 transition hover:bg-white/5 hover:text-amber-200"
          >
            <div>
              <span className="block text-xl font-semibold">
                {lang === "uk"
                  ? "Пролог"
                  : lang === "es"
                  ? "Prólogo"
                  : "Prologue"}
              </span>

              <span className="mt-1 block text-sm text-white/45">
                {lang === "uk"
                  ? "Початок історії"
                  : lang === "es"
                  ? "El comienzo de la historia"
                  : "The beginning of the story"}
              </span>
            </div>

            <span className="text-xl text-white/50 transition group-hover:translate-x-1 group-hover:text-amber-200">
              →
            </span>
          </Link>

          <div className="divide-y divide-white/10">
            {chapterTitles.map((chapter) => {
              const isCompleted =
                completedChapters.includes(chapter.number);

              const chapterTitle =
                lang === "uk"
                  ? chapter.uk
                  : lang === "es"
                  ? chapter.es
                  : chapter.en;

              return (
                <Link
                  key={chapter.number}
                  href={
                    "/" +
                    lang +
                    "/reading/chapters/" +
                    chapter.number
                  }
                  className="group flex items-center justify-between rounded-xl px-3 py-5 transition hover:bg-white/5 hover:text-amber-200"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        isCompleted
                          ? "flex h-7 w-7 items-center justify-center rounded-full border border-amber-200/60 bg-amber-200/15 text-sm text-amber-100"
                          : "flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-sm text-white/25"
                      }
                    >
                      {isCompleted ? "✓" : "○"}
                    </span>

                    <div>
                      <span className="block text-lg font-medium">
                        {lang === "uk"
                          ? "Розділ " + chapter.number
                          : lang === "es"
                          ? "Capítulo " + chapter.number
                          : "Chapter " + chapter.number}
                      </span>

                      <span className="mt-1 block text-sm text-white/50 transition group-hover:text-amber-200/80">
                        {chapterTitle}
                      </span>
                    </div>
                  </div>

                  <span className="text-lg text-white/40 transition group-hover:translate-x-1 group-hover:text-amber-200">
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href={"/" + lang + "/reading/epilogue"}
            className="group flex items-center justify-between rounded-xl border-t border-white/10 px-3 py-5 transition hover:bg-white/5 hover:text-amber-200"
          >
            <div>
              <span className="block text-xl font-semibold">
                {lang === "uk"
                  ? "Епілог"
                  : lang === "es"
                  ? "Epílogo"
                  : "Epilogue"}
              </span>

              <span className="mt-1 block text-sm text-white/45">
                {lang === "uk"
                  ? "Завершення історії"
                  : lang === "es"
                  ? "El final de la historia"
                  : "The end of the story"}
              </span>
            </div>

            <span className="text-xl text-white/50 transition group-hover:translate-x-1 group-hover:text-amber-200">
              →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
