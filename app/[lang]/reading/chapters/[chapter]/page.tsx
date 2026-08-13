"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import BookPage from "@/app/components/BookPage";
import SeasonLink from "@/app/components/SeasonLink";
import { chapter1 } from "@/data/chapters/chapter1";

const TOTAL_BOOK_PARTS = 24;

export default function ChapterPage() {
  const params = useParams<{
    lang: string;
    chapter: string;
  }>();

  const lang = params.lang === "uk" ? "uk" : "en";
  const chapter = params.chapter;
  const chapterNumber = Number(chapter);

  const currentPart = chapterNumber + 1;

  const progressPercent = Math.round(
    (currentPart / TOTAL_BOOK_PARTS) * 100
  );

  useEffect(() => {
    if (chapter !== "1") {
      return;
    }

    const readingProgress = {
      lastPath:
        "/" +
        lang +
        "/reading/chapters/" +
        chapter,
      lastChapter: chapterNumber,
      currentPart: currentPart,
      totalParts: TOTAL_BOOK_PARTS,
      percent: progressPercent,
      title:
        lang === "uk"
          ? chapter1.title
          : "Chapter 1",
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "synevyr-reading-progress-" + lang,
      JSON.stringify(readingProgress)
    );
  }, [
    chapter,
    chapterNumber,
    currentPart,
    lang,
    progressPercent,
  ]);

  if (chapter !== "1") {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#050505",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "20px" }}>
            {lang === "uk"
              ? "Цей розділ ще не додано"
              : "This chapter has not been added yet"}
          </h1>

          <Link
            href={
              "/" +
              lang +
              "/reading"
            }
            style={{
              color: "#fff1c7",
              textDecoration: "none",
            }}
          >
            {lang === "uk"
              ? "← Назад до змісту"
              : "← Back to contents"}
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = chapter1.content
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        color: "white",
        padding: "72px 24px",
        fontFamily: "serif",
      }}
    >
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
            alignItems: "center",
            marginBottom: "10px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <span>
            {lang === "uk"
              ? "Прогрес читання"
              : "Reading progress"}
          </span>

          <span>{progressPercent}%</span>
        </div>

        <div
          style={{
            width: "100%",
            height: "4px",
            overflow: "hidden",
            borderRadius: "999px",
            backgroundColor:
              "rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              width: progressPercent + "%",
              height: "100%",
              borderRadius: "999px",
              background:
                "linear-gradient(to right, rgba(177, 102, 42, 0.75), #fff1c7)",
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </section>

      <BookPage
        title={
          lang === "uk"
            ? chapter1.title
            : "Chapter 1"
        }
      >
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{
              marginBottom: "24px",
            }}
          >
            {paragraph}
            </p>
        ))}
      </BookPage>

      <nav
        style={{
          maxWidth: "720px",
          margin: "56px auto 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <SeasonLink
          href={
            "/" +
            lang +
            "/reading/prologue"
          }
          season="autumn"
          style={{
            color: "#fff1c7",
            textDecoration: "none",
          }}
        >
          {lang === "uk"
            ? "← Пролог"
            : "← Prologue"}
        </SeasonLink>

        <Link
          href={
            "/" +
            lang +
            "/reading"
          }
          style={{
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
          }}
        >
          {lang === "uk"
            ? "До змісту"
            : "Contents"}
        </Link>

        <SeasonLink
          href={
            "/" +
            lang +
            "/reading/chapters/2"
          }
          season="autumn"
          style={{
            color: "#fff1c7",
            textDecoration: "none",
          }}
        >
          {lang === "uk"
            ? "Розділ 2 →"
            : "Chapter 2 →"}
        </SeasonLink>
      </nav>
    </main>
  );
}