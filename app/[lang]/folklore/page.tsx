import Link from "next/link";

const creatures = [
  {
    name: "Mavka",
    ukrainianName: "Мавка",
    description:
      "A mysterious forest spirit connected to beauty, temptation, grief and the untamed memory of the woods.",
  },
  {
    name: "Chort",
    ukrainianName: "Чорт",
    description:
      "A cunning and unpredictable being from Ukrainian folklore, feared for deception, bargains and dark humor.",
  },
  {
    name: "Potterchata",
    ukrainianName: "Потерчата",
    description:
      "Restless child spirits whose lights appear in fields, marshes and lonely places after sunset.",
  },
  {
    name: "Vodianyk",
    ukrainianName: "Водяник",
    description:
      "An ancient master of rivers, lakes and deep water, capable of guarding secrets hidden beneath the surface.",
  },
  {
    name: "Perelesnyk",
    ukrainianName: "Перелесник",
    description:
      "A fiery spirit that arrives through the night, often taking the form of a beautiful and dangerous stranger.",
  },
  {
    name: "Kikimora",
    ukrainianName: "Кікімора",
    description:
      "A shadowy household or marsh spirit associated with strange noises, unease and things moving in the dark.",
  },
];

export default function FolklorePage() {
  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4 shadow-2xl backdrop-blur-xl md:px-8">
        <Link
          href="/"
          className="text-xs font-semibold tracking-[0.22em] text-white md:text-base md:tracking-[0.3em]"
        >
          LEGEND OF LAKE SYNEVYR
        </Link>

        <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.22em] text-white/75 lg:flex">
          <Link className="nav-link" href="/">
            Home
          </Link>

          <Link className="nav-link" href="/reading/prologue">
            Read
          </Link>

          <Link className="nav-link" href="/reading">
            Chapters
          </Link>

          <Link className="nav-link text-amber-100" href="/folklore">
            Folklore
          </Link>

          <Link className="nav-link" href="/author">
            Author
          </Link>
        </div>
      </nav>

      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 pt-28">
        <div className="absolute inset-0 bg-[url('/forest-library.jpg')] bg-cover bg-center brightness-[0.45]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#050706]" />
        <div className="cinematic-vignette" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.5em] text-amber-100/70 md:text-sm">
            Spirits of the Carpathians
          </p>

          <h1 className="mb-7 text-5xl font-bold md:text-8xl">
            Ukrainian Folklore
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-9 text-white/75 md:text-2xl">
            Discover the beings, legends and forgotten voices that inhabit the
            hidden world of Lake Synevyr.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-amber-100/55">
            The creatures
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Legends preserved in the living library
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {creatures.map((creature) => (
            <article
              key={creature.name}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-amber-200/40 hover:bg-amber-100/[0.07]"
              >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-200/5 blur-3xl transition group-hover:bg-amber-200/15" />

              <div className="relative z-10">
                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-100/55">
                  {creature.ukrainianName}
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
                  Discover the legend →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.45em] text-amber-100/55">
          Enter the story
        </p>

        <h2 className="mb-6 text-3xl font-bold md:text-5xl">
          Meet them inside the living library
        </h2>

        <p className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-white/65">
          These spirits are not only legends. In the world of Lake Synevyr,
          they remember, speak, deceive, protect and choose sides.
        </p>

        <Link
          href="/reading/prologue"
          className="gold-button inline-block rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
        >
          Start reading
        </Link>
      </section>
    </main>
  );
}