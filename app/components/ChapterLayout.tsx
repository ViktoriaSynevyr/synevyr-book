import Link from "next/link";
import type { ReactNode } from "react";

type ChapterLayoutProps = {
  lang: "uk" | "en";
  chapterNumber: number;
  children: ReactNode;
  previousHref?: string;
  nextHref?: string;
};

export default function ChapterLayout({
  lang,
  chapterNumber,
  children,
  previousHref,
  nextHref,
}: ChapterLayoutProps) {
  const isUkrainian = lang === "uk";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#07130f",
        color: "white",
        padding: "48px 24px",
        fontFamily: "Georgia, serif",
      }}
    >
      <article
        style={{
          width: "100%",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <Link
          href={"/" + lang + "/reading"}
          style={{
            display: "inline-block",
            marginBottom: "40px",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
          }}
        >
          {isUkrainian ? "← До змісту" : "← Contents"}
        </Link>

        <header
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <p
            style={{
              marginBottom: "12px",
              color: "#fde68a",
              fontSize: "13px",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {isUkrainian
              ? "Легенда про озеро Синевир"
              : "Legend of Lake Synevyr"}
          </p>

          <h1
            style={{
              margin: 0,
              color: "#fef3c7",
              fontSize: "48px",
              lineHeight: 1.1,
            }}
          >
            {isUkrainian
              ? "Розділ " + chapterNumber
              : "Chapter " + chapterNumber}
          </h1>
        </header>

        <div
          style={{
            fontSize: "19px",
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          {children}
        </div>

        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            marginTop: "64px",
            paddingTop: "28px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div>
            {previousHref ? (
              <Link
                href={previousHref}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {isUkrainian ? "← Попередній" : "← Previous"}
              </Link>
            ) : null}
          </div>

          <div>
            {nextHref ? (
              <Link
                href={nextHref}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {isUkrainian ? "Наступний →" : "Next →"}
              </Link>
            ) : null}
          </div>
        </nav>
      </article>
    </main>
  );
}