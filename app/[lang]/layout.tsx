import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

function isSupportedLang(value: string): value is Lang {
  return ["uk", "en", "es"].includes(value as Lang);
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;

  if (!isSupportedLang(rawLang)) {
    return {};
  }

  const currentSeo = seo[rawLang];

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
        rawLang === "uk"
          ? "uk_UA"
          : rawLang === "es"
          ? "es_ES"
          : "en_US",
    },

    twitter: {
      title: currentSeo.title,
      description: currentSeo.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  return <>{children}</>;
}