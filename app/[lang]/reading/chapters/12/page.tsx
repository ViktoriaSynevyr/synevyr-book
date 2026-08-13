"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter12 from "../../../../translations/chapter12";

export default function Chapter12Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk"
      ? "uk"
      : params.lang === "es"
      ? "es"
      : "en";

  const chapter = chapter12[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={12}
        title={chapter.title}
        path={`/${lang}/reading/chapters/12`}
      >
        {chapter.content}
      </BookChapter>
    </main>
  );
}