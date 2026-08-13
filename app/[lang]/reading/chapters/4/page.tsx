"use client";

import { useParams } from "next/navigation";
import BookChapter from "../../../../components/BookChapter";
import { chapter4Translations } from "../../../../translations/chapter4";

export default function Chapter4Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" ||
    params.lang === "en" ||
    params.lang === "es"
      ? params.lang
      : "en";

  const text = chapter4Translations[lang];

  return (
    <BookChapter
      chapterNumber={4}
      title={text.title}
      path={`/${lang}/reading/chapters/4`}
    >
      <div className="space-y-7">
        {text.content}
      </div>
    </BookChapter>
  );
}