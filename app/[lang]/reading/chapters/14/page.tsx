"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter14 from "../../../../translations/chapter14";

export default function Chapter14Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const chapter = chapter14[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={14}
        title={chapter.title}
        path={`/${lang}/reading/chapters/14`}
      >
        {chapter.content}
      </BookChapter>
    </main>
  );
}