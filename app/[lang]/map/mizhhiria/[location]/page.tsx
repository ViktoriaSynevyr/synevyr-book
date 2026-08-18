"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type Lang = "uk" | "en" | "es";

type LocationKey =
  | "farm"
  | "hotel"
  | "village"
  | "lake"
  | "forest"
  | "airstrip"
  | "agatha-house"
  | "dibrovy-estate"
  | "church"
  | "shop"
  | "cafe"
  | "hut"
  | "viewpoint";

type LocationContent = {
  title: string;
  subtitle: string;
};

type LocationData = {
  image: string;
  uk: LocationContent;
  en: LocationContent;
  es: LocationContent;
};

const locations: Record<LocationKey, LocationData> = {
  farm: {
    image: "/images/locations/farm.png",
    uk: {
      title: "Ферма бабусі Мелашки",
      subtitle: "Карпатська ферма на околиці Міжгірʼя.",
    },
    en: {
      title: "Grandma Melashka's Farm",
      subtitle: "A Carpathian farm on the outskirts of Mizhhiria.",
    },
    es: {
      title: "Granja de la abuela Melashka",
      subtitle: "Una granja de los Cárpatos en las afueras de Mizhhiria.",
    },
  },

  hotel: {
    image: "/images/locations/hotel.png",
    uk: {
      title: "Готель Синевир",
      subtitle: "Старовинний карпатський готель серед густого лісу.",
    },
    en: {
      title: "Synevyr Hotel",
      subtitle: "An old Carpathian hotel hidden deep in the forest.",
    },
    es: {
      title: "Hotel Synevyr",
      subtitle: "Un antiguo hotel de los Cárpatos escondido en el bosque.",
    },
  },

  village: {
    image: "/images/locations/village.png",
    uk: {
      title: "Село Міжгірʼя",
      subtitle: "Серце селища, де перетинаються дороги та історії героїв.",
    },
    en: {
      title: "Mizhhiria Village",
      subtitle: "The heart of the village where roads and stories meet.",
    },
    es: {
      title: "Pueblo de Mizhhiria",
      subtitle: "El corazón del pueblo donde se cruzan caminos e historias.",
    },
  },

  lake: {
    image: "/images/locations/lake.png",
    uk: {
      title: "Озеро Синевир",
      subtitle: "Таємниче гірське озеро — серце легенди.",
    },
    en: {
      title: "Lake Synevyr",
      subtitle: "A mysterious mountain lake at the heart of the legend.",
    },
    es: {
      title: "Lago Synevyr",
      subtitle: "Un misterioso lago de montaña en el corazón de la leyenda.",
    },
  },

  forest: {
    image: "/images/locations/forest.png",
    uk: {
      title: "Ліс",
      subtitle: "Густий старий ліс, сповнений міфів і таємниць.",
    },
    en: {
      title: "Forest",
      subtitle: "An ancient dense forest filled with myths and secrets.",
    },
    es: {
      title: "Bosque",
      subtitle: "Un bosque antiguo y denso lleno de mitos y secretos.",
    },
  },

  airstrip: {
    image: "/images/locations/airstrip.png",
    uk: {
      title: "Злітна смуга",
      subtitle: "Невелика смуга серед гір і лісів.",
    },
    en: {
      title: "Airstrip",
      subtitle: "A small airstrip surrounded by mountains and forest.",
    },
    es: {
      title: "Pista de aterrizaje",
      subtitle: "Una pequeña pista rodeada de montañas y bosque.",
    },
  },

  "agatha-house": {
    image: "/images/locations/agatha-house.png",
    uk: {
      title: "Будинок пані Агати",
      subtitle: "Віддалений будинок біля карпатського лісу.",
    },
    en: {
      title: "Mrs. Agatha's House",
      subtitle: "A secluded house near the Carpathian forest.",
    },
    es: {
      title: "Casa de la señora Agatha",
      subtitle: "Una casa aislada cerca del bosque de los Cárpatos.",
    },
  },

  "dibrovy-estate": {
    image: "/images/locations/dibrovy-estate.png",
    uk: {
      title: "Садиба Дібрових",
      subtitle: "Велика родинна садиба неподалік від центру Міжгірʼя.",
    },
    en: {
      title: "Dibrovy Estate",
      subtitle: "A large family estate near the center of Mizhhiria.",
    },
    es: {
      title: "Finca de la familia Dibrovy",
      subtitle: "Una gran finca familiar cerca del centro de Mizhhiria.",
    },
  },

  church: {
    image: "/images/locations/church.png",
    uk: {
      title: "Церква",
      subtitle: "Стара церква, добре знайома мешканцям Міжгірʼя.",
    },
    en: {
      title: "Church",
      subtitle: "An old church well known to the people of Mizhhiria.",
    },
    es: {
      title: "Iglesia",
      subtitle: "Una antigua iglesia conocida por los habitantes de Mizhhiria.",
    },
  },

  shop: {
    image: "/images/locations/shop.png",
    uk: {
      title: "Магазин",
      subtitle: "Невеликий місцевий магазин у Міжгірʼї.",
    },
    en: {
      title: "Village Shop",
      subtitle: "A small local shop in Mizhhiria.",
    },
    es: {
      title: "Tienda del pueblo",
      subtitle: "Una pequeña tienda local en Mizhhiria.",
    },
  },

  cafe: {
    image: "/images/locations/cafe.png",
    uk: {
      title: "Кафе Синевир",
      subtitle: "Затишне карпатське кафе серед лісу.",
    },
    en: {
      title: "Synevyr Cafe",
      subtitle: "A cozy Carpathian cafe hidden among the trees.",
    },
    es: {
      title: "Café Synevyr",
      subtitle: "Un acogedor café de los Cárpatos escondido entre los árboles.",
    },
  },

  hut: {
    image: "/images/locations/hut.png",
    uk: {
      title: "Хатчина",
      subtitle: "Самотня хатчина, захована серед карпатського лісу.",
    },
    en: {
      title: "Forest Hut",
      subtitle: "A lonely hut hidden deep in the Carpathian forest.",
    },
    es: {
      title: "Cabaña del bosque",
      subtitle: "Una cabaña solitaria escondida en el bosque de los Cárpatos.",
    },
  },

  viewpoint: {
    image: "/images/locations/viewpoint.png",
    uk: {
      title: "Оглядовий майданчик",
      subtitle: "Місце з видом на гори, ліси та околиці Міжгірʼя.",
    },
    en: {
      title: "Viewpoint",
      subtitle:
        "A scenic overlook above the mountains and forests of Mizhhiria.",
    },
    es: {
      title: "Mirador",
      subtitle:
        "Un mirador con vistas a las montañas y bosques de Mizhhiria.",
    },
  },
};

const interfaceTranslations = {
  uk: {
    back: "← Назад до карти Міжгірʼя",
    notFound: "Локацію не знайдено",
  },
  en: {
    back: "← Back to Mizhhiria map",
    notFound: "Location not found",
  },
  es: {
    back: "← Volver al mapa de Mizhhiria",
    notFound: "Ubicación no encontrada",
  },
};

export default function LocationPage() {
  const params = useParams<{
    lang: string;
    location: string;
  }>();

  const lang: Lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const locationKey = params.location as LocationKey;

  const locationData = locations[locationKey];
  const ui = interfaceTranslations[lang];

  if (!locationData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{ui.notFound}</h1>

          <Link
            href={`/${lang}/map/mizhhiria`}
            className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2 transition hover:bg-white/10"
          >
            {ui.back}
          </Link>
        </div>
      </main>
    );
  }

  const content = locationData[lang];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">

      {/* FULL SCREEN LOCATION IMAGE */}
      <Image
        src={locationData.image}
        alt={content.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* DARK GRADIENT FOR TEXT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* BACK BUTTON */}
      <div className="absolute left-4 top-4 z-20 md:left-6 md:top-6">
        <Link
          href={`/${lang}/map/mizhhiria`}
          className="inline-block rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs text-white backdrop-blur-md transition hover:bg-black/70 md:text-sm"
        >
          {ui.back}
        </Link>
      </div>

      {/* LOCATION INFORMATION */}
      <div className="absolute bottom-6 left-4 right-4 z-20 md:bottom-8 md:left-8 md:right-auto">
        <div className="max-w-md rounded-2xl border border-white/15 bg-black/55 px-5 py-4 shadow-2xl backdrop-blur-md">
          <h1 className="text-2xl font-semibold md:text-3xl">
            {content.title}
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/80 md:text-base">
            {content.subtitle}
          </p>
        </div>
      </div>

    </main>
  );
}
