"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import chapter16 from "../../../../translations/chapter16";

type Lang = "uk" | "en" | "es";

export default function Chapter16Page() {
  const params = useParams<{ lang: string }>();

  const lang: Lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const chapter = chapter16[lang as keyof typeof chapter16];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12">
      <BookChapter
        chapterNumber={16}
        title={chapter.title}
        path={`/${lang}/reading/chapters/16`}
      >
        {chapter.content}
      </BookChapter>
    </main>
  );
}