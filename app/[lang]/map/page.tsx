"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MapPage() {
  const params = useParams<{ lang: string }>();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const lang =
    params.lang === "uk" || params.lang === "es" ? params.lang : "en";

  const title =
    lang === "uk"
      ? "Карта світу"
      : lang === "es"
        ? "Mapa del mundo"
        : "World Map";

  const mizhhiria =
    lang === "uk"
      ? {
          title: "Міжгірʼя",
          description:
            "Карпатське містечко серед гір і густих лісів. Одне з ключових місць подій історії.",
          explore: "Дослідити Міжгірʼя",
          close: "Закрити",
        }
      : lang === "es"
        ? {
            title: "Mizhhiria",
            description:
              "Un pueblo de los Cárpatos rodeado de montañas y densos bosques. Uno de los lugares clave de la historia.",
            explore: "Explorar Mizhhiria",
            close: "Cerrar",
          }
        : {
            title: "Mizhhiria",
            description:
              "A Carpathian town surrounded by mountains and dense forests. One of the key locations in the story.",
            explore: "Explore Mizhhiria",
            close: "Close",
          };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-8">

        {/* Заголовок */}
        <h1 className="mb-6 text-center text-3xl font-semibold md:text-5xl">
          {title}
        </h1>

        {/* Карта України */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">

          <img
            src="/maps/ukraine-map.png"
            alt="Interactive map of Ukraine"
            className="block h-auto w-full"
          />

          {/* BIG SWAMP */}
          <div
            className="absolute flex items-center justify-center bg-[#171713]/95"
            style={{
              left: "91%",
              top: "74%",
              width: "17%",
              height: "8%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span
              className="whitespace-nowrap text-[#c8ad78] tracking-[0.18em]"
              style={{
                fontFamily: "serif",
                fontSize: "clamp(6px, 1vw, 16px)",
              }}
            >
              BIG SWAMP
            </span>
          </div>

          {/* ТОЧКА МІЖГІРʼЯ */}
          <button
            type="button"
            onClick={() => setSelectedLocation("mizhhiria")}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: "25%",
              top: "41%",
            }}
            aria-label={mizhhiria.title}
          >

            {/* Пульсація */}
            <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-amber-300/30" />

            {/* Жовта точка */}
            <span className="relative block h-4 w-4 rounded-full border-2 border-amber-100 bg-amber-500 shadow-[0_0_18px_rgba(251,191,36,0.95)] transition-transform group-hover:scale-125" />

            {/* Назва при наведенні */}
            <span className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-3 py-1.5 text-sm opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
              {mizhhiria.title}
            </span>

          </button>

          {/* ВІКНО МІЖГІРʼЯ */}
          {selectedLocation === "mizhhiria" && (
            <div className="absolute left-1/2 top-1/2 z-20 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-amber-200/20 bg-black/90 p-6 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md">

              <h2 className="mb-3 text-2xl font-semibold text-amber-100">
                {mizhhiria.
                title}
              </h2>

              <p className="mb-5 text-sm leading-6 text-white/75 md:text-base">
                {mizhhiria.description}
              </p>

              {/* Дослідити Міжгірʼя */}
              <Link
                href={`/${lang}/map/mizhhiria`}
                className="mb-3 inline-block rounded-full border border-amber-200/30 bg-amber-100/10 px-5 py-2 text-sm text-amber-100 transition hover:bg-amber-100/20"
              >
                {mizhhiria.explore} →
              </Link>

              <br />

              {/* Закрити */}
              <button
                type="button"
                onClick={() => setSelectedLocation(null)}
                className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {mizhhiria.close}
              </button>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}