import type { Metadata } from "next";

type Lang = "uk" | "en" | "es";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

const seo = {
  uk: {
    title: "Легенда про озеро Синевир",
    description:
      "Фентезійний роман, натхненний українською міфологією, карпатськими легендами, давніми духами та забутим фольклором.",
  },

  en: {
    title: "Legend of Lake Synevyr",
    description:
      "A fantasy novel inspired by Ukrainian mythology, Carpathian legends, ancient spirits, and forgotten folklore.",
  },

  es: {
    title: "La leyenda del lago Synevyr",
    description:
      "Una novela de fantasía inspirada en la mitología ucraniana, las leyendas de los Cárpatos, espíritus antiguos y folclore olvidado.",
  },
} satisfies Record<
  Lang,
  {
    title: string;
    description: string;
  }
>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;

  const lang: Lang =
    rawLang === "uk" ||
    rawLang === "es"
      ? rawLang
      : "en";

  const currentSeo = seo[lang];

  return {
    title: currentSeo.title,
    description: currentSeo.description,

    alternates: {
      languages: {
        uk: "/uk",
        en: "/en",
        es: "/es",
      },
    },

    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      locale:
        lang === "uk"
          ? "uk_UA"
          : lang === "es"
          ? "es_ES"
          : "en_US",
    },

    twitter: {
      title: currentSeo.title,
      description: currentSeo.description,
    },
  };
}

export default function LangLayout({
  children,
}: LangLayoutProps) {
  return <>{children}</>;
}