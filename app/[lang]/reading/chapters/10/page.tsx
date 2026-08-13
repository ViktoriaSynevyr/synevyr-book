"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter10 from "../../../../translations/chapter10";

export default function Chapter10Page() {
  const params = useParams<{ lang: string }>();

  const lang: "uk" | "en" | "es" =
    params.lang === "uk"
      ? "uk"
      : params.lang === "es"
      ? "es"
      : "en";

  const chapter = chapter10[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={10}
        title={chapter.title}
        path={`/${lang}/reading/chapters/10`}
      >
        <div className="space-y-7">
          {chapter.content.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      </BookChapter>
    </main>
  );
}