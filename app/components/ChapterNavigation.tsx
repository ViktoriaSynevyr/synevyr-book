"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SeasonLink, { type Season } from "./SeasonLink";

function getSeasonForHref(href: string): Season {
  if (href.endsWith("/reading/prologue")) {
    return "summer";
  }

  if (href.endsWith("/reading/epilogue")) {
    return "spring";
  }

  const match = href.match(/\/reading\/chapters\/(\d+)$/);
  const chapterNumber = match ? Number(match[1]) : null;

  if (chapterNumber === 1) {
    return "summer";
  }

  if (
    chapterNumber !== null &&
    chapterNumber >= 2 &&
    chapterNumber <= 15
  ) {
    return "autumn";
  }

  if (
    chapterNumber !== null &&
    chapterNumber >= 16 &&
    chapterNumber <= 22
  ) {
    return "winter";
  }

  return "autumn";
}

export default function ChapterNavigation() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const lang =
    parts[0] === "uk" || parts[0] === "es"
      ? parts[0]
      : "en";

  const chapterIndex = parts.indexOf("chapters");
  const chapterNumber = Number(parts[chapterIndex + 1]);

  const isChapterPage =
    chapterIndex !== -1 &&
    Number.isInteger(chapterNumber) &&
    chapterNumber >= 1 &&
    chapterNumber <= 22;

  if (!isChapterPage) {
    return null;
  }

  const previousHref =
    chapterNumber === 1
      ? "/" + lang + "/reading/prologue"
      : "/" +
        lang +
        "/reading/chapters/" +
        (chapterNumber - 1);

  const nextHref =
    chapterNumber === 22
      ? "/" + lang + "/reading/epilogue"
      : "/" +
        lang +
        "/reading/chapters/" +
        (chapterNumber + 1);

  const previousSeason = getSeasonForHref(previousHref);
  const nextSeason = getSeasonForHref(nextHref);

  return (
    <nav
      style={{
        width: "100%",
        maxWidth: "760px",
        margin: "48px auto 0",
        paddingTop: "24px",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <SeasonLink
        href={previousHref}
        season={previousSeason}
        style={{
          color: "#fde68a",
          textDecoration: "none",
          fontSize: "17px",
        }}
      >
        {lang === "uk"
          ? "← Попередній"
          : lang === "es"
          ? "← Anterior"
          : "← Previous"}
      </SeasonLink>

      <Link
        href={"/" + lang + "/reading"}
        style={{
          color: "rgba(255,255,255,0.75)",
          textDecoration: "none",
          fontSize: "15px",
        }}
      >
        {lang === "uk"
          ? "Зміст"
          : lang === "es"
          ? "Índice"
          : "Contents"}
      </Link>

      <SeasonLink
        href={nextHref}
        season={nextSeason}
        style={{
          color: "#fde68a",
          textDecoration: "none",
          fontSize: "17px",
          textAlign: "right",
        }}
      >
        {lang === "uk"
          ? "Наступний →"
          : lang === "es"
          ? "Siguiente →"
          : "Next →"}
      </SeasonLink>
    </nav>
  );
}