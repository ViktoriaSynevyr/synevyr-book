"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LanguageSelector from "../components/LanguageSelector";
import { homeTranslations } from "../translations/home";
import { supabase } from "../../lib/supabase";
import {
  clearLocalReaderData,
  loadReaderData,
  type Bookmark,
} from "../../lib/readerData";

const leaves = [
  { id: 1, symbol: "🍂", left: "5%", delay: "0s", duration: "15s" },
  { id: 2, symbol: "🍁", left: "14%", delay: "3s", duration: "18s" },
  { id: 3, symbol: "🍂", left: "25%", delay: "6s", duration: "16s" },
  { id: 4, symbol: "🍁", left: "37%", delay: "1s", duration: "20s" },
  { id: 5, symbol: "🍂", left: "49%", delay: "8s", duration: "17s" },
  { id: 6, symbol: "🍁", left: "61%", delay: "4s", duration: "19s" },
  { id: 7, symbol: "🍂", left: "73%", delay: "9s", duration: "15s" },
  { id: 8, symbol: "🍁", left: "84%", delay: "2s", duration: "21s" },
  { id: 9, symbol: "🍂", left: "94%", delay: "7s", duration: "18s" },
];

const fireflies = [
  { id: 1, left: "8%", top: "24%", delay: "0s" },
  { id: 2, left: "19%", top: "70%", delay: "2s" },
  { id: 3, left: "31%", top: "42%", delay: "4s" },
  { id: 4, left: "46%", top: "76%", delay: "1s" },
  { id: 5, left: "58%", top: "31%", delay: "5s" },
  { id: 6, left: "69%", top: "62%", delay: "3s" },
  { id: 7, left: "81%", top: "22%", delay: "6s" },
  { id: 8, left: "91%", top: "72%", delay: "2.5s" },
  { id: 9, left: "40%", top: "18%", delay: "4.5s" },
  { id: 10, left: "74%", top: "84%", delay: "1.5s" },
];

type AccountSection = "bookmarks" | "progress" | null;

type SavedReadingProgress = {
  lastPath: string;
  lastChapter: number | null;
  currentPart: number;
  totalParts: number;
  percent: number;
  title: string;
  updatedAt: string;
};

const accountTranslations = {
  uk: {
    account: "Мій акаунт",
    bookmarks: "Закладки",
    progress: "Прогрес читання",
    forestSounds: "Звуки лісу",
    soundOn: "Увімкнено",
    soundOff: "Вимкнено",
    login: "Увійти",
    signup: "Створити акаунт",
    logout: "Вийти",
    noBookmarks: "У вас поки немає закладок.",
    noProgress: "Прогрес читання поки не збережено.",
    continueReading: "Продовжити читання",
    completed: "прочитано",
    back: "Назад",
    loading: "Завантаження...",
    menu: "Меню",
  },
  en: {
    account: "My account",
    bookmarks: "Bookmarks",
    progress: "Reading progress",
    forestSounds: "Forest sounds",
    soundOn: "On",
    soundOff: "Off",
    login: "Login",
    signup: "Create account",
    logout: "Logout",
    noBookmarks: "You do not have any bookmarks yet.",
    noProgress: "No reading progress has been saved yet.",
    continueReading: "Continue reading",
    completed: "completed",
    back: "Back",
    loading: "Loading...",
    menu: "Menu",
  },
  es: {
    account: "Mi cuenta",
    bookmarks: "Marcadores",
    progress: "Progreso de lectura",
    forestSounds: "Sonidos del bosque",
    soundOn: "Activados",
    soundOff: "Desactivados",
    login: "Iniciar sesión",
    signup: "Crear cuenta",
    logout: "Cerrar sesión",
    noBookmarks: "Todavía no tienes marcadores.",
    noProgress: "Aún no se ha guardado el progreso de lectura.",
    continueReading: "Continuar leyendo",
    completed: "completado",
    back: "Volver",
    loading: "Cargando...",
    menu: "Menú",
  },
};

export default function HomePage() {
  const params = useParams<{ lang: string }>();
  const router = useRouter();

  const lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const text = homeTranslations[lang];
  const accountText = accountTranslations[lang];
const mapLabel =
  lang === "uk"
    ? "Карта"
    : lang === "es"
      ? "Mapa"
      : "Map";
  const [scrollY, setScrollY] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [accountSection, setAccountSection] =
    useState<AccountSection>(null);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [readingProgress, setReadingProgress] =
    useState<SavedReadingProgress | null>(null);

  const [readerDataLoading, setReaderDataLoading] =
    useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function refreshReaderData() {
    setReaderDataLoading(true);

    const data = await loadReaderData();

    if (!data) {
      setBookmarks([]);
      setReadingProgress(null);
      setReaderDataLoading(false);
      return;
    }

    setBookmarks(data.bookmarks);

    const progress =
      data.reading_progress as unknown as SavedReadingProgress;

    if (
      progress &&
      typeof progress === "object" &&
      typeof progress.lastPath === "string" &&
      typeof progress.percent === "number"
    ) {
      setReadingProgress(progress);
    } else {
      setReadingProgress(null);
    }

    setReaderDataLoading(false);
  }

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const hasSession = Boolean(session);

      setLoggedIn(hasSession);
      setUserEmail(session?.user.email ?? "");
      setAuthChecked(true);

      if (hasSession) {
        await refreshReaderData();
      }
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const hasSession = Boolean(session);

      setLoggedIn(hasSession);
      setUserEmail(session?.user.email ?? "");
      setAuthChecked(true);

      if (hasSession) {
        window.setTimeout(() => {
          void refreshReaderData();
        }, 0);
      } else {
        setBookmarks([]);
        setReadingProgress(null);
        setAccountSection(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (profileOpen && loggedIn) {
      void refreshReaderData();
    }

    if (!profileOpen) {
      setAccountSection(null);
    }
  }, [profileOpen, loggedIn]);

  const toggleSound = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      if (soundOn) {
        audio.pause();
        setSoundOn(false);
      } else {
        await audio.play();
        setSoundOn(true);
      }
    } catch {
      setSoundOn(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Could not log out:", error);
      return;
    }

    clearLocalReaderData();

    setLoggedIn(false);
    setUserEmail("");
    setProfileOpen(false);
    setAccountSection(null);
    setBookmarks([]);
    setReadingProgress(null);

    router.refresh();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="relative overflow-hidden bg-[#050706] text-white">
      <audio ref={audioRef} src="/forest-sounds.mp3" loop />

      <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6">
        <Link
          href={"/" + lang}
          className="hidden whitespace-nowrap text-[10px] font-semibold tracking-[0.18em] text-white sm:block xl:text-sm xl:tracking-[0.25em]"
        >
          LEGEND OF LAKE SYNEVYR
        </Link>

        <div className="hidden items-center gap-4 text-xs uppercase tracking-[0.18em] text-white/80 lg:flex xl:gap-6">
          <Link className="nav-link" href={"/" + lang}>
            {text.navHome}
          </Link>

          <Link
            className="nav-link"
            href={"/" + lang + "/reading/prologue"}
          >
            {text.navRead}
          </Link>

          <Link
            className="nav-link"
            href={"/" + lang + "/reading"}
          >
            {text.navChapters}
          </Link>

          <Link
            className="nav-link"
            href={"/" + lang + "/folklore"}
          >
            {text.navFolklore}
          </Link>
<Link
  className="nav-link"
  href={"/" + lang + "/map"}
>
  {mapLabel}
</Link>
          <Link
            className="nav-link"
            href={"/" + lang + "/author"}
          >
            {text.navAuthor}
          </Link>
        </div>

        <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen((current) => !current);
                setProfileOpen(false);
              }}
              aria-label={accountText.menu}
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-200/30 bg-black/40 text-xl text-amber-100 transition hover:border-amber-200/70 hover:bg-amber-200/10"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            {mobileMenuOpen && (
              <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-white/15 bg-[#0d1712]/95 p-3 text-sm shadow-2xl backdrop-blur-xl">
                <p className="px-4 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-100/50">
                  {accountText.menu}
                </p>

                <Link
                  href={"/" + lang}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-amber-100"
                >
                  {text.navHome}
                </Link>

                <Link
                  href={"/" + lang + "/reading/prologue"}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-amber-100"
                >
                  {text.navRead}
                </Link>

                <Link
                  href={"/" + lang + "/reading"}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-amber-100"
                >
                  {text.navChapters}
                </Link>

                <Link
                  href={"/" + lang + "/folklore"}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-amber-100"
                >
                  {text.navFolklore}
                </Link>
<Link
  href={"/" + lang + "/map"}
  onClick={closeMobileMenu}
  className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-amber-100"
>
  {mapLabel}
</Link>
                <Link
                  href={"/" + lang + "/author"}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-amber-100"
                >
                  {text.navAuthor}
                </Link>

                <Link
                  href="/subscription"
                  onClick={closeMobileMenu}
                  className="mt-2 block rounded-xl border border-amber-200/20 bg-amber-200/10 px-4 py-3 font-semibold text-amber-100 transition hover:bg-amber-200/20"
                >
                  ✦ Synevyr+
                </Link>
              </div>
            )}
          </div>

          {authChecked && (
            <div className="relative z-20">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((current) => !current);
                  setMobileMenuOpen(false);
                }}
                aria-label={accountText.account}
                aria-expanded={profileOpen}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-200/30 bg-black/40 text-lg text-amber-100 transition hover:border-amber-200/70 hover:bg-amber-200/10"
              >
                👤
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 max-h-[75vh] w-[calc(100vw-2rem)] max-w-80 overflow-y-auto rounded-2xl border border-white/15 bg-[#0d1712]/95 p-3 text-sm shadow-2xl backdrop-blur-xl">
                  {loggedIn ? (
                    <>
                      <div className="border-b border-white/10 px-3 pb-3 pt-2">
                        <p className="font-semibold text-amber-100">
                          {accountText.account}
                        </p>

                        <p className="mt-1 break-all text-xs text-white/55">
                          {userEmail}
                        </p>
                      </div>

                      {accountSection === null && (
                        <>
                          <div className="py-2">
                            <button
                              type="button"
                              onClick={() =>
                                setAccountSection("bookmarks")
                              }
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-white/80 transition hover:bg-white/10 hover:text-amber-100"
                            >
                              <span>
                                🔖 {accountText.bookmarks}
                              </span>

                              <span className="rounded-full bg-amber-200/10 px-2 py-1 text-[10px] text-amber-100">
                                {bookmarks.length}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setAccountSection("progress")
                              }
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-white/80 transition hover:bg-white/10 hover:text-amber-100"
                            >
                              <span>
                                📖 {accountText.progress}
                              </span>

                              <span className="text-xs text-amber-100/70">
                                {readingProgress
                                  ? readingProgress.percent + "%"
                                  : "0%"}
                              </span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={toggleSound}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-white/80 transition hover:bg-white/10"
                          >
                            <span>
                              {soundOn ? "🔊" : "🔇"}{" "}
                              {accountText.forestSounds}
                            </span>

                            <span className="text-xs text-amber-100/70">
                              {soundOn
                                ? accountText.soundOn
                                : accountText.soundOff}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={handleLogout}
                            className="mt-2 flex w-full items-center gap-2 rounded-xl border border-red-300/20 px-3 py-3 text-left text-red-100 transition hover:bg-red-900/30"
                          >
                            🚪 {accountText.logout}
                          </button>
                        </>
                      )}

                      {accountSection === "bookmarks" && (
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={() => setAccountSection(null)}
                            className="mb-3 flex items-center gap-2 px-2 text-xs text-white/55 transition hover:text-amber-100"
                          >
                            ← {accountText.back}
                          </button>

                          <h3 className="mb-3 px-2 font-semibold text-amber-100">
                            🔖 {accountText.bookmarks}
                          </h3>

                          {readerDataLoading ? (
                            <p className="px-2 py-4 text-sm text-white/50">
                              {accountText.loading}
                            </p>
                          ) : bookmarks.length === 0 ? (
                            <p className="rounded-xl bg-white/5 px-3 py-4 text-sm leading-6 text-white/50">
                              {accountText.noBookmarks}
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {bookmarks.map((bookmark) => (
                                <Link
                                  key={`${bookmark.chapterNumber}-${bookmark.path}`}
                                  href={bookmark.path}
                                  onClick={() => {
                                    setProfileOpen(false);
                                    setAccountSection(null);
                                  }}
                                  className="block rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition hover:border-amber-200/40 hover:bg-amber-200/10"
                                >
                                  <p className="font-medium text-white">
                                    {bookmark.title}
                                  </p>

                                  <p className="mt-1 text-xs text-white/40">
                                    Chapter {bookmark.chapterNumber}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {accountSection === "progress" && (
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={() => setAccountSection(null)}
                            className="mb-3 flex items-center gap-2 px-2 text-xs text-white/55 transition hover:text-amber-100"
                          >
                            ← {accountText.back}
                          </button>

                          <h3 className="mb-3 px-2 font-semibold text-amber-100">
                            📖 {accountText.progress}
                          </h3>

                          {readerDataLoading ? (
                            <p className="px-2 py-4 text-sm text-white/50">
                              {accountText.loading}
                            </p>
                          ) : readingProgress ? (
                            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-medium text-white">
                                  {readingProgress.title}
                                </p>

                                <span className="text-sm font-semibold text-amber-100">
                                  {readingProgress.percent}%
                                </span>
                              </div>

                              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-100 transition-all"
                                  style={{
                                    width:
                                      readingProgress.percent + "%",
                                  }}
                                />
                              </div>

                              <p className="mt-3 text-xs text-white/45">
                                {readingProgress.currentPart} /{" "}
                                {readingProgress.totalParts}{" "}
                                {accountText.completed}
                              </p>

                              <Link
                                href={readingProgress.lastPath}
                                onClick={() => {
                                  setProfileOpen(false);
                                  setAccountSection(null);
                                }}
                                className="mt-4 block rounded-xl bg-amber-200 px-4 py-3 text-center font-semibold text-[#172018] transition hover:bg-amber-100"
                              >
                                {accountText.continueReading} →
                              </Link>
                            </div>
                          ) : (
                            <p className="rounded-xl bg-white/5 px-3 py-4 text-sm leading-6 text-white/50">
                              {accountText.noProgress}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          router.push("/login");
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-white transition hover:bg-white/10"
                      >
                        🔑 {accountText.login}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          router.push("/signup");
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-white transition hover:bg-white/10"
                      >
                        ✨ {accountText.signup}
                      </button>

                      <button
                        type="button"
                        onClick={toggleSound}
                        className="mt-2 flex w-full items-center justify-between rounded-xl border-t border-white/10 px-3 py-3 text-left text-white/80 transition hover:bg-white/10"
                      >
                        <span>
                          {soundOn ? "🔊" : "🔇"}{" "}
                          {accountText.forestSounds}
                        </span>

                        <span className="text-xs text-amber-100/70">
                          {soundOn
                            ? accountText.soundOn
                            : accountText.soundOff}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="relative z-10">
            <LanguageSelector />
          </div>
        </div>
      </nav>

      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        {leaves.map((leaf) => (
          <span
            key={leaf.id}
            className="falling-leaf"
            style={{
              left: leaf.left,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
            }}
          >
            {leaf.symbol}
          </span>
        ))}
      </div>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/library.jpg')] bg-cover bg-center"
          style={{
            transform:
              "translateY(" + scrollY * 0.2 + "px) scale(1.12)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/80" />
        <div className="cinematic-vignette" />
        <div className="fog-layer fog-layer-one" />
        <div className="fog-layer fog-layer-two" />

        <div className="pointer-events-none absolute inset-0 z-10">
          {fireflies.map((firefly) => (
            <span
              key={firefly.id}
              className="firefly"
              style={{
                left: firefly.left,
                top: firefly.top,
                animationDelay: firefly.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 mx-auto max-w-5xl px-6 pt-28 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-amber-100/80 md:text-sm">
            {text.intro}
          </p>

          <h1 className="hero-title mb-7 text-5xl font-bold uppercase leading-[0.92] md:text-8xl lg:text-9xl">
            <span className="block">{text.titleFirst}</span>

            <span className="block text-amber-100">
              {text.titleSecond}
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
            {text.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={"/" + lang + "/reading/prologue"}
              className="gold-button rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
            >
              {text.startReading}
            </Link>

            <Link
              href={"/" + lang + "/folklore"}
              className="rounded-full border border-white/30 bg-black/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/70 hover:bg-white/10"
            >
              {text.exploreFolklore}
            </Link>
          </div>

          <div className="mt-16 animate-bounce text-3xl text-amber-100/70">
            ↓
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src="/library-transition.jpg"
          alt="Library transforming into a Carpathian forest"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform:
              "translateY(" + scrollY * 0.1 + "px) scale(1.12)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/75" />
        <div className="cinematic-vignette" />
        <div className="fog-layer fog-layer-three" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-amber-100/70 md:text-sm">
            {text.sectionTwoLabel}
          </p>

          <h2 className="mb-7 text-4xl font-bold md:text-7xl">
            {text.sectionTwoTitle}
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-9 text-white/75 md:text-2xl">
            {text.sectionTwoText}
          </p>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src="/forest-library.jpg"
          alt="The mythological living library"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform:
              "translateY(" + scrollY * 0.05 + "px) scale(1.12)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
        <div className="cinematic-vignette" />
        <div className="fog-layer fog-layer-one" />
        <div className="fog-layer fog-layer-two" />

        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-amber-100/80 md:text-sm">
            {text.sectionThreeLabel}
          </p>

          <h2 className="mb-7 text-5xl font-bold md:text-8xl">
            {text.sectionThreeTitle}
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-9 text-white/80 md:text-2xl">
            {text.sectionThreeText}
          </p>

          <Link
            href={"/" + lang + "/reading/prologue"}
            className="gold-button inline-block rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
          >
            {text.enterStory}
          </Link>
        </div>
      </section>
    </main>
  );
}
