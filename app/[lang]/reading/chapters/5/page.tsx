"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import { chapter5 } from "../../../../translations/chapter5";

export default function Chapter5Page() {
  const params = useParams<{ lang: string }>();

  const lang: "uk" | "en" | "es" =
    params.lang === "uk"
      ? "uk"
      : params.lang === "es"
      ? "es"
      : "en";

  const chapter = chapter5[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={5}
        title={chapter.title}
        path={`/${lang}/reading/chapters/5`}
      >
        <div className="space-y-7">
          {chapter.content.map((paragraph: string, index: number) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      </BookChapter>
    </main>
  );
}