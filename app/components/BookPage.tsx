"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type BookPageProps = {
  title: string;
  children: ReactNode;
  fontSize?: number;
};

export default function BookPage({
  title,
  children,
  fontSize = 20,
}: BookPageProps) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const lang =
    parts[0] === "uk" || parts[0] === "es"
      ? parts[0]
      : "en";

  const bookTitle =
    lang === "uk"
      ? "Легенда про озеро Синевир"
      : lang === "es"
      ? "La leyenda del lago Synevyr"
      : "Legend of Lake Synevyr";

  return (
    <article
      style={{
        width: "100%",
        maxWidth: "720px",
        margin: "0 auto",
      }}
    >
      <header
        style={{
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            marginBottom: "12px",
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(253, 230, 180, 0.55)",
          }}
        >
          {bookTitle}
        </p>

        <h1
          style={{
            margin: "0",
            fontSize: "clamp(32px, 6vw, 52px)",
            lineHeight: "1.15",
            fontWeight: "700",
            color: "#fff1c7",
          }}
        >
          {title}
        </h1>

        <div
          style={{
            width: "90px",
            height: "1px",
            margin: "24px auto 0",
            background:
              "linear-gradient(to right, transparent, rgba(253, 230, 180, 0.7), transparent)",
          }}
        />
      </header>

      <div
        className="book-text"
        style={{
          fontSize: fontSize + "px",
          lineHeight: "1.95",
          color: "rgba(255, 255, 255, 0.88)",
          transition: "font-size 0.2s ease",
        }}
      >
        {children}
      </div>
    </article>
  );
}