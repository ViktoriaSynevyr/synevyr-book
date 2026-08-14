"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { supabase } from "../../lib/supabase";

import BookPage from "./BookPage";
import ReadingProgress from "./ReadingProgress";
import ReadingToolbar from "./ReadingToolbar";

type BookChapterProps = {
  chapterNumber: number;
  title: string;
  path: string;
  children: ReactNode;
};

export default function BookChapter({
  chapterNumber,
  title,
  path,
  children,
}: BookChapterProps) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const lang =
    parts[0] === "uk" || parts[0] === "es"
      ? parts[0]
      : "en";

  const audioFileName =
  chapterNumber === 0
    ? "prologue.mp3"
    : chapterNumber === 23
    ? "epilogue.mp3"
    : "chapter-" + chapterNumber + ".mp3";

const audioPath =
  "/audio/" + lang + "/" + audioFileName;

  const [audioSrc, setAudioSrc] =
    useState<string | undefined>(undefined);

  const [fontSize, setFontSize] = useState(20);

  const [hasPremiumAccess, setHasPremiumAccess] =
    useState<boolean | null>(
      chapterNumber <= 3 ? true : null
    );

  useEffect(() => {
    let cancelled = false;

    async function checkAudio() {
      try {
        const response = await fetch(audioPath, {
          method: "HEAD",
        });

        if (cancelled) {
          return;
        }

        if (response.ok) {
          setAudioSrc(audioPath);
        } else {
          setAudioSrc(undefined);
        }
      } catch {
        if (!cancelled) {
          setAudioSrc(undefined);
        }
      }
    }

    void checkAudio();

    return () => {
      cancelled = true;
    };
  }, [audioPath]);

  useEffect(() => {
    const savedFontSize =
      localStorage.getItem("synevyr-font-size");

    if (!savedFontSize) {
      return;
    }

    const parsedFontSize = Number(savedFontSize);

    if (
      Number.isFinite(parsedFontSize) &&
      parsedFontSize >= 16 &&
      parsedFontSize <= 24
    ) {
      setFontSize(parsedFontSize);
    }
  }, []);

  useEffect(() => {
    if (chapterNumber <= 3) {
      setHasPremiumAccess(true);
      return;
    }

    async function checkSubscription() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setHasPremiumAccess(false);
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error(
          "Could not check subscription:",
          error
        );

        setHasPremiumAccess(false);
        return;
      }

      const isPremium =
        data?.status === "active" ||
        data?.status === "trialing";

      setHasPremiumAccess(isPremium);
    }

    checkSubscription();
  }, [chapterNumber]);

  const checkingText =
    lang === "uk"
      ? "Перевіряємо доступ Synevyr+..."
      : lang === "es"
      ? "Comprobando el acceso a Synevyr+..."
      : "Checking Synevyr+ access...";

  const exclusiveText =
    lang === "uk"
      ? "Ексклюзив Synevyr+"
      : lang === "es"
      ? "Exclusivo de Synevyr+"
      : "Synevyr+ Exclusive";

  const lockedTitle =
    lang === "uk"
      ? "Цей розділ заблоковано"
      : lang === "es"
      ? "Este capítulo está bloqueado"
      : "This chapter is locked";

  const lockedDescription =
    lang === "uk"
      ? "Розділи 4–22 доступні активним учасникам Synevyr+."
      : lang === "es"
      ? "Los capítulos 4–22 están disponibles para los miembros activos de Synevyr+."
      : "Chapters 4–22 are available to active Synevyr+ members.";

  const unlockText =
    lang === "uk"
      ? "Розблокувати з Synevyr+"
      : lang === "es"
      ? "Desbloquear con Synevyr+"
      : "Unlock with Synevyr+";

  const backToContentsText =
    lang === "uk"
      ? "Назад до змісту"
      : lang === "es"
      ? "Volver al índice"
      : "Back to contents";

  if (hasPremiumAccess === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <p className="text-sm text-white/60">
          {checkingText}
        </p>
      </main>
    );
  }

  if (!hasPremiumAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-16 text-white">
        <section className="w-full max-w-xl rounded-3xl border border-amber-200/20 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">
            {exclusiveText}
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            {lockedTitle}
          </h1>

          <p className="mt-4 leading-7 text-white/60">
            {lockedDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/subscription"
              className="rounded-2xl bg-amber-200 px-6 py-4 font-bold text-[#172018] transition hover:bg-amber-100"
            >
              {unlockText}
            </Link>

            <Link
              href={"/" + lang + "/reading"}
              className="rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white/80 transition hover:bg-white/5"
            >
              {backToContentsText}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
  <>
    <ReadingProgress
      title={title}
      path={path}
      chapterNumber={chapterNumber}
    />

    <ReadingToolbar
      chapterNumber={chapterNumber}
      title={title}
      path={path}
      fontSize={fontSize}
      audioSrc={audioSrc}
      onFontSizeChange={setFontSize}
    />

    <BookPage
      title={title}
      fontSize={fontSize}
    >
      {children}

      {chapterNumber === 0 && (
        <div className="mt-16 flex justify-end">
          <Link
            href={"/" + lang + "/reading/chapters/1"}
            className="rounded-2xl border border-amber-200/30 bg-amber-200/10 px-6 py-4 font-semibold text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-200/20"
          >
            {lang === "uk"
              ? "Розділ 1 →"
              : lang === "es"
              ? "Capítulo 1 →"
              : "Chapter 1 →"}
          </Link>
        </div>
      )}
    </BookPage>
  </>
);
}
