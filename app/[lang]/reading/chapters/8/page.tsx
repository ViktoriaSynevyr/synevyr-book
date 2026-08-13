"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter8 from "../../../../translations/chapter8";

export default function Chapter8Page() {
  const params = useParams<{ lang: string }>();

  const lang: "uk" | "en" | "es" =
    params.lang === "uk"
      ? "uk"
      : params.lang === "es"
      ? "es"
      : "en";

  const chapter = chapter8[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={8}
        title={chapter.title}
        path={`/${lang}/reading/chapters/8`}
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