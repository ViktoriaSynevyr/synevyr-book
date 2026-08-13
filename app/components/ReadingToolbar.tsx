"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  loadReaderData,
  saveBookmarks,
  type Bookmark,
} from "../../lib/readerData";

import AudioPlayer from "./AudioPlayer";

type ReadingToolbarProps = {
  chapterNumber: number;
  title: string;
  path: string;
  fontSize: number;
  audioSrc?: string;
  onFontSizeChange: (fontSize: number) => void;
};

function mergeBookmarks(
  localBookmarks: Bookmark[],
  cloudBookmarks: Bookmark[]
): Bookmark[] {
  const bookmarkMap = new Map<number, Bookmark>();

  for (const bookmark of cloudBookmarks) {
    bookmarkMap.set(bookmark.chapterNumber, bookmark);
  }

  for (const bookmark of localBookmarks) {
    bookmarkMap.set(bookmark.chapterNumber, bookmark);
  }

  return Array.from(bookmarkMap.values()).sort(
    (firstBookmark, secondBookmark) =>
      firstBookmark.chapterNumber -
      secondBookmark.chapterNumber
  );
}

export default function ReadingToolbar({
  chapterNumber,
  title,
  path,
  fontSize,
  audioSrc,
  onFontSizeChange,
}: ReadingToolbarProps) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const lang =
    parts[0] === "uk" || parts[0] === "es"
      ? parts[0]
      : "en";

  const bookmarksKey = "synevyr-bookmarks-" + lang;

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] =
    useState(true);

  useEffect(() => {
    let isCancelled = false;

    function loadLocalBookmarks(): Bookmark[] {
      const savedBookmarks =
        localStorage.getItem(bookmarksKey);

      if (!savedBookmarks) {
        return [];
      }

      try {
        const parsed: unknown =
          JSON.parse(savedBookmarks);

        if (!Array.isArray(parsed)) {
          return [];
        }

        return parsed.filter(
          (bookmark): bookmark is Bookmark =>
            typeof bookmark === "object" &&
            bookmark !== null &&
            typeof bookmark.chapterNumber === "number" &&
            typeof bookmark.title === "string" &&
            typeof bookmark.path === "string"
        );
      } catch {
        localStorage.removeItem(bookmarksKey);
        return [];
      }
    }

    async function prepareBookmarks() {
      const localBookmarks = loadLocalBookmarks();
      const cloudData = await loadReaderData();

      const mergedBookmarks = cloudData
        ? mergeBookmarks(
            localBookmarks,
            cloudData.bookmarks
          )
        : localBookmarks;

      if (isCancelled) {
        return;
      }

      setBookmarks(mergedBookmarks);

      setIsBookmarked(
        mergedBookmarks.some(
          (bookmark) =>
            bookmark.chapterNumber === chapterNumber
        )
      );

      localStorage.setItem(
        bookmarksKey,
        JSON.stringify(mergedBookmarks)
      );

      if (cloudData) {
        const synchronizationSucceeded =
          await saveBookmarks(mergedBookmarks);

        if (!synchronizationSucceeded) {
          console.error(
            "Bookmarks were loaded locally, but cloud synchronization failed."
          );
        }
      }

      if (!isCancelled) {
        setIsBookmarkLoading(false);
      }
    }

    void prepareBookmarks();

    return () => {
      isCancelled = true;
    };
  }, [bookmarksKey, chapterNumber]);

  async function toggleBookmark() {
    if (isBookmarkLoading) {
      return;
    }

    const bookmarkExists = bookmarks.some(
      (bookmark) =>
        bookmark.chapterNumber === chapterNumber
    );

    let updatedBookmarks: Bookmark[];

    if (bookmarkExists) {
      updatedBookmarks = bookmarks.filter(
        (bookmark) =>
          bookmark.chapterNumber !== chapterNumber
      );
    } else {
      updatedBookmarks = [
        ...bookmarks,
        {
          chapterNumber,
          title,
          path,
        },
      ].sort(
        (firstBookmark, secondBookmark) =>
          firstBookmark.chapterNumber -
          secondBookmark.chapterNumber
      );
    }

    setBookmarks(updatedBookmarks);
    setIsBookmarked(!bookmarkExists);

    localStorage.setItem(
      bookmarksKey,
      JSON.stringify(updatedBookmarks)
    );

    const synchronizationSucceeded =
      await saveBookmarks(updatedBookmarks);

    if (!synchronizationSucceeded) {
      return;
    }
  }

  function changeFontSize(newSize: number) {
    const safeSize = Math.min(
      24,
      Math.max(16, newSize)
    );

    onFontSizeChange(safeSize);

    localStorage.setItem(
      "synevyr-font-size",
      String(safeSize)
    );
  }

  const decreaseTextLabel =
    lang === "uk"
      ? "Зменшити текст"
      : lang === "es"
      ? "Reducir el texto"
      : "Decrease text size";

  const increaseTextLabel =
    lang === "uk"
      ? "Збільшити текст"
      : lang === "es"
      ? "Aumentar el texto"
      : "Increase text size";

  const addBookmarkLabel =
    lang === "uk"
      ? "Додати в закладки"
      : lang === "es"
      ? "Añadir a marcadores"
      : "Add bookmark";

  const removeBookmarkLabel =
    lang === "uk"
      ? "Видалити із закладок"
      : lang === "es"
      ? "Eliminar de marcadores"
      : "Remove bookmark";

  const bookmarkedLabel =
    lang === "uk"
      ? "У закладках"
      : lang === "es"
      ? "En marcadores"
      : "Bookmarked";

  const loadingLabel =
    lang === "uk"
      ? "Завантаження..."
      : lang === "es"
      ? "Cargando..."
      : "Loading...";

  return (
    <section className="mx-auto mb-8 flex w-full max-w-[720px] flex-wrap items-center justify-between gap-3">
      <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1">
        <button
          type="button"
          onClick={() =>
            changeFontSize(fontSize - 2)
          }
          disabled={fontSize <= 16}
          aria-label={decreaseTextLabel}
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm text-white/70 transition hover:bg-white/10 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          A−
        </button>

        <span className="min-w-12 text-center text-xs text-white/55">
          {fontSize}px
        </span>

        <button
          type="button"
          onClick={() =>
            changeFontSize(fontSize + 2)
          }
          disabled={fontSize >= 24}
          aria-label={increaseTextLabel}
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white/70 transition hover:bg-white/10 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          A+
        </button>
      </div>

      <div className="flex items-center gap-4">
        {audioSrc && (
  <AudioPlayer
    src={audioSrc}
    chapterNumber={chapterNumber}
  />
)}

        <button
          type="button"
          onClick={() => {
            void toggleBookmark();
          }}
          disabled={isBookmarkLoading}
          aria-label={
            isBookmarked
              ? removeBookmarkLabel
              : addBookmarkLabel
          }
          className={
            isBookmarked
              ? "flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-200/15 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-200/25 disabled:cursor-wait disabled:opacity-50"
              : "flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:border-amber-200/40 hover:text-amber-100 disabled:cursor-wait disabled:opacity-50"
          }
        >
          <span className="text-xl leading-none">
            {isBookmarkLoading
              ? "…"
              : isBookmarked
              ? "★"
              : "☆"}
          </span>

          <span>
            {isBookmarkLoading
              ? loadingLabel
              : isBookmarked
              ? bookmarkedLabel
              : addBookmarkLabel}
          </span>
        </button>
      </div>
    </section>
  );
}
