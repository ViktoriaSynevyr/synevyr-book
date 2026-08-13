"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter13 from "../../../../translations/chapter13";

export default function Chapter13Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk"
      ? "uk"
      : params.lang === "es"
      ? "es"
      : "en";

  const chapter = chapter13[lang];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={13}
        title={chapter.title}
        path={`/${lang}/reading/chapters/13`}
      >
        {chapter.content}
      </BookChapter>
    </main>
  );
}