"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter15 from "../../../../translations/chapter15";

export default function Chapter15Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const chapter = chapter15[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={15}
        title={chapter.title}
        path={`/${lang}/reading/chapters/15`}
      >
        {chapter.content}
      </BookChapter>
    </main>
  );
}