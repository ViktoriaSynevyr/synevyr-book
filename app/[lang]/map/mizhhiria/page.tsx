"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

type LocationId =
  | "farm"
  | "hotel"
  | "village"
  | "lake"
  | "forest"
  | "airstrip"
  | "agathaHouse"
  | "dibrovyEstate"
  | "church"
  | "shop"
  | "cafe"
  | "hut"
  | "viewpoint";

type Location = {
  id: LocationId;
  left: string;
  top: string;
};

const locations: Location[] = [
  {
    id: "farm",
    left: "25%",
    top: "40%",
  },
  {
    id: "hotel",
    left: "43%",
    top: "38%",
  },
  {
    id: "village",
    left: "72%",
    top: "67%",
  },
  {
    id: "lake",
    left: "87%",
    top: "9%",
  },
  {
    id: "forest",
    left: "56%",
    top: "43%",
  },
  {
    id: "airstrip",
    left: "30%",
    top: "67%",
  },
  {
    id: "agathaHouse",
    left: "65%",
    top: "30%",
  },
  {
    id: "dibrovyEstate",
    left: "70%",
    top: "44%",
  },
  {
    id: "church",
    left: "79%",
    top: "62%",
  },
  {
    id: "shop",
    left: "73%",
    top: "60%",
  },
  {
    id: "cafe",
    left: "53%",
    top: "65%",
  },
  {
    id: "hut",
    left: "44%",
    top: "61%",
  },
  {
    id: "viewpoint",
    left: "18%",
    top: "55%",
  },
];

const locationRoutes: Record<LocationId, string> = {
  farm: "farm",
  hotel: "hotel",
  village: "village",
  lake: "lake",
  forest: "forest",
  airstrip: "airstrip",
  agathaHouse: "agatha-house",
  dibrovyEstate: "dibrovy-estate",
  church: "church",
  shop: "shop",
  cafe: "cafe",
  hut: "hut",
  viewpoint: "viewpoint",
};

export default function MizhhiriaMapPage() {
  const params = useParams<{ lang: string }>();

  const [selectedLocation, setSelectedLocation] =
    useState<LocationId | null>(null);

  const lang =
    params.lang === "uk" || params.lang === "es"
      ? params.lang
      : "en";

  const translations = {
    uk: {
      title: "Міжгірʼя",
      back: "← Назад до карти України",
      close: "Закрити",
      explore: "Дослідити локацію →",

      locations: {
        farm: {
          title: "Ферма бабусі Мелашки",
          description:
            "Ферма бабусі Мелашки на околиці Міжгірʼя, оточена горами та карпатськими лісами.",
        },

        hotel: {
          title: "Готель Синевир",
          description:
            "Велика карпатська садиба серед густого лісу. Одне з головних місць подій історії.",
        },

        village: {
          title: "Центр Міжгірʼя",
          description:
            "Центральна частина Міжгірʼя з будинками, дорогами та місцями, де перетинаються шляхи героїв.",
        },

        lake: {
          title: "Озеро Синевир",
          description:
            "Таємниче гірське озеро серед карпатських лісів. Серце легенди та одне з найважливіших місць історії.",
        },

        forest: {
          title: "Карпатський ліс",
          description:
            "Старий густий ліс, у якому живуть істоти української міфології та приховані давні таємниці.",
        },

        airstrip: {
          title: "Злітна смуга",
          description:
            "Невелика злітна смуга неподалік від ферми, оточена густим лісом.",
        },

        agathaHouse: {
          title: "Будинок пані Агати",
          description:
            "Віддалений будинок пані Агати біля лісу на околиці Міжгірʼя.",
        },

        dibrovyEstate: {
          title: "Маєток Дібрових",
          description:
            "Маєток родини Дібрових у Міжгірʼї, неподалік від центральної частини села.",
        },

        church: {
          title: "Церква",
          description:
            "Стара церква в центрі Міжгірʼя, добре знайома місцевим мешканцям.",
        },

        shop: {
          title: "Магазин",
          description:
            "Невеликий місцевий магазин у центрі Міжгірʼя.",
        },

        cafe: {
          title: "Кафе Синевир",
          description:
            "Затишне кафе в Міжгірʼї, де зустрічаються місцеві мешканці та герої історії.",
        },

        hut: {
          title: "Хатчина",
          description:
            "Невелика самотня хатчина, захована серед карпатського лісу неподалік від Міжгірʼя.",
        },

        viewpoint: {
          title: "Оглядовий майданчик",
          description:
            "Високий схил над Міжгірʼям, звідки відкривається краєвид на село, ліси та навколишні гори.",
        },
      },
    },

    en: {
      title: "Mizhhiria",
      back: "← Back to the map of Ukraine",
      close: "Close",
      explore: "Explore location →",

      locations: {
        farm: {
          title: "Grandma Melashka's Farm",
          description:
            "Grandma Melashka's farm on the outskirts of Mizhhiria, surrounded by mountains and Carpathian forests.",
        },

        hotel: {
          title: "Synevyr Hotel",
          description:
            "A large Carpathian estate hidden among the forest. One of the main locations of the story.",
        },

        village: {
          title: "Mizhhiria Center",
          description:
            "The central part of Mizhhiria, filled with houses, roads and places where the paths of the characters cross.",
        },

        lake: {
          title: "Lake Synevyr",
          description:
            "A mysterious mountain lake hidden among the Carpathian forests. The heart of the legend and one of the most important places in the story.",
        },

        forest: {
          title: "Carpathian Forest",
          description:
            "An ancient dense forest inhabited by creatures of Ukrainian mythology and filled with old secrets.",
        },

        airstrip: {
          title: "Airstrip",
          description:
            "A small airstrip near the farm, surrounded by dense forest.",
        },

        agathaHouse: {
          title: "Mrs. Agatha's House",
          description:
            "Mrs. Agatha's secluded house near the forest on the outskirts of Mizhhiria.",
        },

        dibrovyEstate: {
          title: "Dibrovy Estate",
          description:
            "The Dibrovy family's estate in Mizhhiria, not far from the center of the village.",
        },

        church: {
          title: "Church",
          description:
            "An old church in the center of Mizhhiria, well known to the local residents.",
        },

        shop: {
          title: "Village Shop",
          description:
            "A small local shop in the center of Mizhhiria.",
        },

        cafe: {
          title: "Cafe Synevyr",
          description:
            "A cozy cafe in Mizhhiria where locals and characters from the story meet.",
        },

        hut: {
          title: "Forest Hut",
          description:
            "A small secluded hut hidden among the Carpathian forest near Mizhhiria.",
        },

        viewpoint: {
          title: "Viewpoint",
          description:
            "A high hillside above Mizhhiria with a wide view of the village, forests and surrounding mountains.",
        },
      },
    },

    es: {
      title: "Mizhhiria",
      back: "← Volver al mapa de Ucrania",
      close: "Cerrar",
      explore: "Explorar ubicación →",

      locations: {
        farm: {
          title: "Granja de la abuela Melashka",
          description:
            "La granja de la abuela Melashka en las afueras de Mizhhiria, rodeada de montañas y bosques de los Cárpatos.",
        },

        hotel: {
          title: "Hotel Synevyr",
          description:
            "Una gran finca de los Cárpatos escondida entre el bosque. Uno de los principales lugares de la historia.",
        },

        village: {
          title: "Centro de Mizhhiria",
          description:
            "La parte central de Mizhhiria, llena de casas, caminos y lugares donde se cruzan los caminos de los personajes.",
        },

        lake: {
          title: "Lago Synevyr",
          description:
            "Un misterioso lago de montaña escondido entre los bosques de los Cárpatos. El corazón de la leyenda y uno de los lugares más importantes de la historia.",
        },

        forest: {
          title: "Bosque de los Cárpatos",
          description:
            "Un antiguo bosque denso habitado por criaturas de la mitología ucraniana y lleno de viejos secretos.",
        },

        airstrip: {
          title: "Pista de aterrizaje",
          description:
            "Una pequeña pista cerca de la granja, rodeada por un denso bosque.",
        },

        agathaHouse: {
          title: "Casa de la señora Agatha",
          description:
            "La casa aislada de la señora Agatha cerca del bosque, en las afueras de Mizhhiria.",
        },

        dibrovyEstate: {
          title: "Finca de la familia Dibrovy",
          description:
            "La finca de la familia Dibrovy en Mizhhiria, cerca del centro del pueblo.",
        },

        church: {
          title: "Iglesia",
          description:
            "Una antigua iglesia en el centro de Mizhhiria, bien conocida por los habitantes locales.",
        },

        shop: {
          title: "Tienda del pueblo",
          description:
            "Una pequeña tienda local en el centro de Mizhhiria.",
        },

        cafe: {
          title: "Café Synevyr",
          description:
            "Un acogedor café de Mizhhiria donde se reúnen los habitantes y los personajes de la historia.",
        },

        hut: {
          title: "Cabaña del bosque",
          description:
            "Una pequeña cabaña solitaria escondida entre el bosque de los Cárpatos cerca de Mizhhiria.",
        },

        viewpoint: {
          title: "Mirador",
          description:
            "Una ladera elevada sobre Mizhhiria desde donde se puede contemplar el pueblo, los bosques y las montañas circundantes.",
        },
      },
    },
  };

  const t = translations[lang];

  const currentLocation = selectedLocation
    ? t.locations[selectedLocation]
    : null;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/${lang}/map`}
            className="w-fit rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {t.back}
          </Link>

          <h1 className="text-3xl font-semibold md:text-5xl">
            {t.title}
          </h1>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <img
            src="/maps/mizhhiria-map.png"
            alt={t.title}
            className="block h-auto w-full"
          />

          {locations.map((location) => {
            const locationText = t.locations[location.id];

            return (
              <button
                key={location.id}
                type="button"
                onClick={() => setSelectedLocation(location.id)}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: location.left,
                  top: location.top,
                }}
                aria-label={locationText.title}
              >
                <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-amber-300/30" />

                <span className="relative block h-4 w-4 rounded-full border-2 border-amber-100 bg-amber-500 shadow-[0_0_18px_rgba(251,191,36,0.95)] transition-transform duration-200 group-hover:scale-125" />

                <span className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-3 py-1.5 text-sm opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                  {locationText.title}
                </span>
              </button>
            );
          })}

          {currentLocation && (
            <div className="absolute left-1/2 top-1/2 z-30 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-amber-200/20 bg-black/90 p-6 text-center shadow-[0_0_50px_rgba(0,0,0,0.85)] backdrop-blur-md">
              <h2 className="mb-3 text-2xl font-semibold text-amber-100">
                {currentLocation.title}
              </h2>

              <p className="mb-5 text-sm leading-6 text-white/75 md:text-base">
                {currentLocation.description}
              </p>

              <div className="flex flex-col items-center gap-3">
                {selectedLocation && (
                  <Link
                    href={`/${lang}/map/mizhhiria/${locationRoutes[selectedLocation]}`}
                    className="inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/80"
                  >
                    {t.explore}
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedLocation(null)}
                  className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  {t.close}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
