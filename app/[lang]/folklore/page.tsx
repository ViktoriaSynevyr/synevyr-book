"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Lang = "uk" | "en" | "es";

const translations = {
  uk: {
    navHome: "Головна",
    navRead: "Читати",
    navChapters: "Розділи",
    navFolklore: "Фольклор",
    navAuthor: "Про авторку",

    heroLabel: "Духи Карпат",
    heroTitle: "Український фольклор",
    heroText:
      "Відкрийте для себе істот, легенди та забуті голоси, що населяють прихований світ озера Синевир.",

    creaturesLabel: "Істоти",
    creaturesTitle:
      "Легенди, збережені у живій бібліотеці",

    discoverLegend: "Дізнатися легенду →",

    storyLabel: "Увійдіть в історію",
    storyTitle:
      "Зустріньте їх у живій бібліотеці",
    storyText:
      "Ці духи — не просто легенди. У світі озера Синевир вони пам’ятають, говорять, обманюють, захищають і обирають сторону.",

    startReading: "Почати читати",
  },

  en: {
    navHome: "Home",
    navRead: "Read",
    navChapters: "Chapters",
    navFolklore: "Folklore",
    navAuthor: "Author",

    heroLabel: "Spirits of the Carpathians",
    heroTitle: "Ukrainian Folklore",
    heroText:
      "Discover the beings, legends and forgotten voices that inhabit the hidden world of Lake Synevyr.",

    creaturesLabel: "The creatures",
    creaturesTitle:
      "Legends preserved in the living library",

    discoverLegend: "Discover the legend →",

    storyLabel: "Enter the story",
    storyTitle:
      "Meet them inside the living library",
    storyText:
      "These spirits are not only legends. In the world of Lake Synevyr, they remember, speak, deceive, protect and choose sides.",

    startReading: "Start reading",
  },

  es: {
    navHome: "Inicio",
    navRead: "Leer",
    navChapters: "Capítulos",
    navFolklore: "Folclore",
    navAuthor: "Autora",

    heroLabel: "Espíritus de los Cárpatos",
    heroTitle: "Folclore ucraniano",
    heroText:
      "Descubre los seres, las leyendas y las voces olvidadas que habitan el mundo oculto del lago Synevyr.",

    creaturesLabel: "Las criaturas",
    creaturesTitle:
      "Leyendas preservadas en la biblioteca viviente",

    discoverLegend: "Descubrir la leyenda →",

    storyLabel: "Entra en la historia",
    storyTitle:
      "Conócelos dentro de la biblioteca viviente",
    storyText:
      "Estos espíritus no son solo leyendas. En el mundo del lago Synevyr recuerdan, hablan, engañan, protegen y eligen un bando.",

    startReading: "Empezar a leer",
  },
} satisfies Record<Lang, Record<string, string>>;

const creatures = {
  uk: [
    {
      name: "Мавка",
      secondaryName: "Mavka",
      description:
        "Таємничий лісовий дух, пов’язаний із красою, спокусою, смутком і дикою пам’яттю лісу.",
    },
    {
      name: "Чорт",
      secondaryName: "Chort",
      description:
        "Хитра й непередбачувана істота українського фольклору, відома обманом, угодами та темним гумором.",
    },
    {
      name: "Потерчата",
      secondaryName: "Potterchata",
      description:
        "Неспокійні дитячі духи, чиї вогники з’являються в полях, болотах і самотніх місцях після заходу сонця.",
    },
    {
      name: "Водяник",
      secondaryName: "Vodianyk",
      description:
        "Давній володар річок, озер і глибоких вод, здатний охороняти таємниці, приховані під поверхнею.",
    },
    {
      name: "Перелесник",
      secondaryName: "Perelesnyk",
      description:
        "Вогняний дух, що приходить уночі, часто набуваючи вигляду красивого й небезпечного незнайомця.",
    },
    {
      name: "Кікімора",
      secondaryName: "Kikimora",
      description:
        "Тіньовий домашній або болотяний дух, пов’язаний із дивними звуками, тривогою та речами, що рухаються в темряві.",
    },
  ],

  en: [
    {
      name: "Mavka",
      secondaryName: "Мавка",
      description:
        "A mysterious forest spirit connected to beauty, temptation, grief and the untamed memory of the woods.",
    },
    {
      name: "Chort",
      secondaryName: "Чорт",
      description:
        "A cunning and unpredictable being from Ukrainian folklore, feared for deception, bargains and dark humor.",
    },
    {
      name: "Potterchata",
      secondaryName: "Потерчата",
      description:
        "Restless child spirits whose lights appear in fields, marshes and lonely places after sunset.",
    },
    {
      name: "Vodianyk",
      secondaryName: "Водяник",
      description:
        "An ancient master of rivers, lakes and deep water, capable of guarding secrets hidden beneath the surface.",
    },
    {
      name: "Perelesnyk",
      secondaryName: "Перелесник",
      description:
        "A fiery spirit that arrives through the night, often taking the form of a beautiful and dangerous stranger.",
    },
    {
      name: "Kikimora",
      secondaryName: "Кікімора",
      description:
        "A shadowy household or marsh spirit associated with strange noises, unease and things moving in the dark.",
    },
  ],

  es: [
    {
      name: "Mavka",
      secondaryName: "Мавка",
      description:
        "Un misterioso espíritu del bosque asociado con la belleza, la tentación, el dolor y la memoria indómita de los bosques.",
    },
    {
      name: "Chort",
      secondaryName: "Чорт",
      description:
        "Un ser astuto e impredecible del folclore ucraniano, temido por sus engaños, pactos y humor oscuro.",
    },
    {
      name: "Potterchata",
      secondaryName: "Потерчата",
      description:
        "Espíritus infantiles inquietos cuyas luces aparecen en campos, pantanos y lugares solitarios después del atardecer.",
    },
    {
      name: "Vodianyk",
      secondaryName: "Водяник",
      description:
        "Un antiguo señor de ríos, lagos y aguas profundas, capaz de proteger secretos ocultos bajo la superficie.",
    },
    {
      name: "Perelesnyk",
      secondaryName: "Перелесник",
      description:
        "Un espíritu de fuego que llega durante la noche y a menudo adopta la forma de un desconocido hermoso y peligroso.",
    },
    {
      name: "Kikimora",
      secondaryName: "Кікімора",
      description:
        "Un espíritu sombrío del hogar o de los pantanos, asociado con ruidos extraños, inquietud y objetos que se mueven en la oscuridad.",
    },
  ],
} satisfies Record<
  Lang,
  {
    name: string;
    secondaryName: string;
    description: string;
  }[]
>;

export default function FolklorePage() {
  const params = useParams<{ lang: string }>();

  const lang: Lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const text = translations[lang];
  const currentCreatures = creatures[lang];

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4 shadow-2xl backdrop-blur-xl md:px-8">
        <Link
          href={"/" + lang}
          className="text-xs font-semibold tracking-[0.22em] text-white md:text-base md:tracking-[0.3em]"
        >
          LEGEND OF LAKE SYNEVYR
        </Link>

        <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.22em] text-white/75 lg:flex">
          <Link
            className="nav-link"
            href={"/" + lang}
          >
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
            className="nav-link text-amber-100"
            href={"/" + lang + "/folklore"}
          >
            {text.navFolklore}
          </Link>

          <Link
            className="nav-link"
            href={"/" + lang + "/author"}
          >
            {text.navAuthor}
          </Link>
        </div>
      </nav>

      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 pt-28">
        <div className="absolute inset-0 bg-[url('/forest-library.jpg')] bg-cover bg-center brightness-[0.45]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#050706]" />
        <div className="cinematic-vignette" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-amber-100/70 md:text-sm">
            {text.heroLabel}
          </p>

          <h1 className="mb-7 text-5xl font-bold md:text-8xl">
            {text.heroTitle}
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-9 text-white/75 md:text-2xl">
            {text.heroText}
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-100/55">
            {text.creaturesLabel}
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            {text.creaturesTitle}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentCreatures.map((creature) => (
            <article
              key={creature.name}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-amber-200/40 hover:bg-amber-100/[0.07]"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-200/5 blur-3xl transition group-hover:bg-amber-200/15" />

              <div className="relative z-10">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-100/55">
                  {creature.secondaryName}
                </p>

                <h3 className="mb-4 text-3xl font-bold text-white">
                  {creature.name}
                </h3>

                <p className="leading-7 text-white/65">
                  {creature.description}
                </p>

                <button
                  type="button"
                  className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100/80 transition group-hover:text-amber-100"
                >
                  {text.discoverLegend}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-amber-100/55">
          {text.storyLabel}
        </p>

        <h2 className="mb-6 text-3xl font-bold md:text-5xl">
          {text.storyTitle}
        </h2>

        <p className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-white/65">
          {text.storyText}
        </p>

        <Link
          href={"/" + lang + "/reading/prologue"}
          className="gold-button inline-block rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
        >
          {text.startReading}
        </Link>
      </section>
    </main>
  );
}
