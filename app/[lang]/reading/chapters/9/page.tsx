"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter9 from "../../../../translations/chapter9";

export default function Chapter9Page() {
  const params = useParams<{ lang: string }>();

  const lang: "uk" | "en" | "es" =
    params.lang === "uk"
      ? "uk"
      : params.lang === "es"
      ? "es"
      : "en";

  const chapter = chapter9[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={9}
        title={chapter.title}
        path={`/${lang}/reading/chapters/9`}
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