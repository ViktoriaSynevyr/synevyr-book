"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter11 from "../../../../translations/chapter11";

export default function Chapter11Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk"
      ? "uk"
      : params.lang === "es"
      ? "es"
      : "en";

  const chapter = chapter11[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={11}
        title={chapter.title}
        path={`/${lang}/reading/chapters/11`}
      >
        {chapter.content}
      </BookChapter>
    </main>
  );
}