"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Lang = "uk" | "en" | "es";

const authorTranslations = {
  uk: {
    navHome: "Головна",
    navRead: "Читати",
    navChapters: "Розділи",
    navFolklore: "Фольклор",
    navAuthor: "Про авторку",

    label: "Про авторку",
    debutLabel: "Дебютний роман",
    debutTitle: "Легенда про озеро Синевир",

    intro:
      "Українська письменниця у жанрі фентезі та історикиня, чиї історії повертають забуті легенди Карпат у сучасне фентезі.",

    bio:
      "Народилася в Україні та нині живе у Сполучених Штатах. Вікторія-Анна має ступінь бакалавра з історії та археології. Її творчість натхненна українською міфологією, гірськими краєвидами, родинними спогадами та загадковою атмосферою давніх карпатських легенд.",

    bookBio:
      "«Легенда про озеро Синевир» — її дебютний роман і початок магічного світу, наповненого мавками, водяними духами, давніми таємницями та юними героями, яким доведеться вирішити, що вони готові захищати.",

    readBook: "Читати книгу",

    storyBegins: "Історія починається",
    enterWorld: "Увійдіть у світ озера Синевир",
    storyText:
      "Сучасне українське фентезі про дружбу, втрату, давні сили та істот, прихованих у карпатських лісах.",

    startReading: "Почати читати",
    exploreFolklore: "Дослідити фольклор",
  },

  en: {
    navHome: "Home",
    navRead: "Read",
    navChapters: "Chapters",
    navFolklore: "Folklore",
    navAuthor: "Author",

    label: "About the Author",
    debutLabel: "Debut novel",
    debutTitle: "Legend of Lake Synevyr",

    intro:
      "Ukrainian fantasy author and historian whose stories bring the forgotten legends of the Carpathians into modern fantasy.",

    bio:
      "Born in Ukraine and now living in the United States, Viktoriia-Anna holds a bachelor's degree in History and Archaeology. Her writing is inspired by Ukrainian mythology, mountain landscapes, family memories and the haunting atmosphere of old Carpathian legends.",

    bookBio:
      "Legend of Lake Synevyr is her debut novel and the beginning of a magical world filled with mavkas, water spirits, ancient secrets and young heroes who must decide what they are willing to protect.",

    readBook: "Read the Book",

    storyBegins: "The story begins",
    enterWorld: "Enter the world of Lake Synevyr",
    storyText:
      "A modern Ukrainian fantasy shaped by friendship, grief, ancient powers and the creatures hidden inside the forests of the Carpathians.",

    startReading: "Start Reading",
    exploreFolklore: "Explore Folklore",
  },

  es: {
    navHome: "Inicio",
    navRead: "Leer",
    navChapters: "Capítulos",
    navFolklore: "Folclore",
    navAuthor: "Autora",

    label: "Sobre la autora",
    debutLabel: "Novela debut",
    debutTitle: "La leyenda del lago Synevyr",

    intro:
      "Autora ucraniana de fantasía e historiadora cuyas historias llevan las leyendas olvidadas de los Cárpatos a la fantasía moderna.",

    bio:
      "Nacida en Ucrania y actualmente residente en los Estados Unidos, Viktoriia-Anna tiene una licenciatura en Historia y Arqueología. Su escritura está inspirada en la mitología ucraniana, los paisajes montañosos, los recuerdos familiares y la atmósfera inquietante de las antiguas leyendas de los Cárpatos.",

    bookBio:
      "La leyenda del lago Synevyr es su primera novela y el comienzo de un mundo mágico lleno de mavkas, espíritus del agua, secretos antiguos y jóvenes héroes que deben decidir qué están dispuestos a proteger.",

    readBook: "Leer el libro",

    storyBegins: "La historia comienza",
    enterWorld: "Entra en el mundo del lago Synevyr",
    storyText:
      "Una fantasía ucraniana moderna marcada por la amistad, el duelo, poderes antiguos y criaturas ocultas en los bosques de los Cárpatos.",

    startReading: "Empezar a leer",
    exploreFolklore: "Explorar el folclore",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function AuthorPage() {
  const params = useParams<{ lang: string }>();

  const lang: Lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const text = authorTranslations[lang];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050706] text-white">
      <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-black/55 px-5 py-4 shadow-2xl backdrop-blur-xl md:px-8">
        <Link
          href={"/" + lang}
          className="text-xs font-semibold tracking-[0.2em] text-white md:text-base md:tracking-[0.3em]"
        >
          LEGEND OF LAKE SYNEVYR
        </Link>

        <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.22em] text-white/70 lg:flex">
          <Link
            className="transition hover:text-amber-100"
            href={"/" + lang}
          >
            {text.navHome}
          </Link>

          <Link
            className="transition hover:text-amber-100"
            href={"/" + lang + "/reading/prologue"}
          >
            {text.navRead}
          </Link>

          <Link
            className="transition hover:text-amber-100"
            href={"/" + lang + "/reading"}
          >
            {text.navChapters}
          </Link>

          <Link
            className="transition hover:text-amber-100"
            href={"/" + lang + "/folklore"}
          >
            {text.navFolklore}
          </Link>

          <Link
            className="text-amber-100"
            href={"/" + lang + "/author"}
          >
            {text.navAuthor}
          </Link>
        </div>
      </nav>

      <section className="relative px-6 pb-24 pt-36 md:px-10 lg:pt-44">
        <div className="absolute left-[-120px] top-[180px] h-[320px] w-[320px] rounded-full bg-amber-200/10 blur-[130px]" />

        <div className="absolute right-[-120px] top-[260px] h-[360px] w-[360px] rounded-full bg-emerald-900/20 blur-[150px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.45em] text-amber-100/60">
              {text.label}
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Viktoriia-Anna Nievienchenko
            </h1>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <div className="mx-auto w-full max-w-[280px]">
              <div className="overflow-hidden rounded-3xl border border-amber-100/20 bg-white/5 p-3 shadow-2xl">
                <img
                  src="/author.jpg"
                  alt="Viktoriia-Anna Nievienchenko"
                  className="h-[340px] w-full rounded-2xl object-cover object-center"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-100/55">
                  {text.debutLabel}
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {text.debutTitle}
                </p>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-xl leading-9 text-white/80">
                {text.intro}
              </p>

              <p className="mt-6 leading-8 text-white/60">
                {text.bio}
              </p>

              <p className="mt-6 leading-8 text-white/60">
                {text.bookBio}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href="https://www.instagram.com/nevenchenkko"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:border-amber-100/40 hover:bg-amber-100/10"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:border-amber-100/40 hover:bg-amber-100/10"
                >
                  TikTok
                </a>

                <a
                  href="#"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:border-amber-100/40 hover:bg-amber-100/10"
                >
                  Amazon
                </a>
              </div>

              <div className="mt-8">
                <Link
                  href={"/" + lang + "/reading/prologue"}
                  className="gold-button inline-block rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
                >
                  {text.readBook}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.035] px-7 py-12 text-center shadow-2xl">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-100/55">
            {text.storyBegins}
          </p>

          <h2 className="mt-5 text-3xl font-bold md:text-5xl">
            {text.enterWorld}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            {text.storyText}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href={"/" + lang + "/reading/prologue"}
              className="gold-button rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
            >
              {text.startReading}
            </Link>

            <Link
              href={"/" + lang + "/folklore"}
              className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-amber-100/40 hover:text-amber-100"
            >
              {text.exploreFolklore}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
