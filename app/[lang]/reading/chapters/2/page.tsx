"use client";

import { useParams } from "next/navigation";

import BookChapter from "../../../../components/BookChapter";
import { chapter2Translations } from "../../../../translations/chapter2";

export default function Chapter2Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" ||
    params.lang === "en" ||
    params.lang === "es"
      ? params.lang
      : "en";

  const text = chapter2Translations[lang];

  const paragraphs = text.content
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <BookChapter
      chapterNumber={2}
      title={text.title}
      path={"/" + lang + "/reading/chapters/2"}
    >
      <div className="space-y-7">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </BookChapter>
  );
}