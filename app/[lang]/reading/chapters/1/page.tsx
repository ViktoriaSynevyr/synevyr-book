"use client";

import { useParams } from "next/navigation";

import BookChapter from "../../../../components/BookChapter";
import { chapter1Translations } from "../../../../translations/chapter1";

export default function Chapter1Page() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" ||
    params.lang === "en" ||
    params.lang === "es"
      ? params.lang
      : "en";

  const text = chapter1Translations[lang];

  const paragraphs = text.content
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <BookChapter
      chapterNumber={1}
      title={text.title}
      path={"/" + lang + "/reading/chapters/1"}
    >
      <div className="space-y-7">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </BookChapter>
  );
}