"use client";

import { useParams } from "next/navigation";

import BookChapter from "../../../components/BookChapter";
import { prologueTranslations } from "../../../translations/prologue";

export default function ProloguePage() {
  const params = useParams<{ lang: string }>();

  const lang =
    params.lang === "uk" ||
    params.lang === "en" ||
    params.lang === "es"
      ? params.lang
      : "en";

  const text = prologueTranslations[lang];

  return (
    <BookChapter
      chapterNumber={0}
      title={text.title}
      path={"/" + lang + "/reading/prologue"}
    >
      <div className="space-y-7">
        {text.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </BookChapter>
  );
}