import { supabase } from "./supabase";

export type Bookmark = {
  chapterNumber: number;
  title: string;
  path: string;
};

export type ReadingProgressData = Record<string, number>;

export type ReaderData = {
  bookmarks: Bookmark[];
  reading_progress: ReadingProgressData;
  completed_chapters: number[];
};

const emptyReaderData: ReaderData = {
  bookmarks: [],
  reading_progress: {},
  completed_chapters: [],
};

export async function getCurrentUserId(): Promise<string | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

export async function loadReaderData(): Promise<ReaderData | null> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("reader_data")
    .select("bookmarks, reading_progress, completed_chapters")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Could not load reader data:", error);
    return null;
  }

  if (!data) {
    return emptyReaderData;
  }

  return {
    bookmarks: Array.isArray(data.bookmarks)
      ? (data.bookmarks as Bookmark[])
      : [],
    reading_progress:
      data.reading_progress &&
      typeof data.reading_progress === "object" &&
      !Array.isArray(data.reading_progress)
        ? (data.reading_progress as ReadingProgressData)
        : {},
    completed_chapters: Array.isArray(data.completed_chapters)
      ? (data.completed_chapters as number[])
      : [],
  };
}

export async function saveReaderData(
  readerData: ReaderData
): Promise<boolean> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return false;
  }

  const { error } = await supabase.from("reader_data").upsert(
    {
      user_id: userId,
      bookmarks: readerData.bookmarks,
      reading_progress: readerData.reading_progress,
      completed_chapters: readerData.completed_chapters,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    }
  );

  if (error) {
    console.error("Could not save reader data:", error);
    return false;
  }

  return true;
}

export async function saveBookmarks(
  bookmarks: Bookmark[]
): Promise<boolean> {
  const currentData = (await loadReaderData()) ?? emptyReaderData;

  return saveReaderData({
    ...currentData,
    bookmarks,
  });
}

export async function saveReadingProgress(
  readingProgress: ReadingProgressData
): Promise<boolean> {
  const currentData = (await loadReaderData()) ?? emptyReaderData;

  return saveReaderData({
    ...currentData,
    reading_progress: readingProgress,
  });
}

export async function saveCompletedChapters(
  completedChapters: number[]
): Promise<boolean> {
  const currentData = (await loadReaderData()) ?? emptyReaderData;

  return saveReaderData({
    ...currentData,
    completed_chapters: completedChapters,
  });
}
const LOCAL_PROGRESS_KEY = "synevyr-reading-progress-uk";
const LOCAL_COMPLETED_KEY = "synevyr-completed-chapters-uk";
const LOCAL_BOOKMARKS_KEY = "synevyr-bookmarks-uk";

export function clearLocalReaderData(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(LOCAL_PROGRESS_KEY);
  localStorage.removeItem(LOCAL_COMPLETED_KEY);
  localStorage.removeItem(LOCAL_BOOKMARKS_KEY);
}

export async function restoreReaderDataFromCloud(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  const cloudData = await loadReaderData();

  if (!cloudData) {
    return false;
  }

  localStorage.setItem(
    LOCAL_BOOKMARKS_KEY,
    JSON.stringify(cloudData.bookmarks)
  );

  localStorage.setItem(
    LOCAL_PROGRESS_KEY,
    JSON.stringify(cloudData.reading_progress)
  );

  localStorage.setItem(
    LOCAL_COMPLETED_KEY,
    JSON.stringify(cloudData.completed_chapters)
  );

  return true;
}