import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050706] px-6 text-white">
      <div className="absolute inset-0 bg-[url('/forest-library.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#050706]/80 to-[#050706]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-amber-100/60">
          Lost in the Carpathians
        </p>

        <h1 className="mt-6 text-8xl font-bold text-amber-100 md:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-3xl font-bold md:text-5xl">
          This path has vanished into the forest.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/60">
          Even the spirits of Lake Synevyr could not find the page you were
          looking for.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="gold-button rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
          >
            Return Home
          </Link>

          <Link
            href="/uk/reading/prologue"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-amber-100/40 hover:text-amber-100"
          >
            Enter the Story
          </Link>
        </div>
      </div>
    </main>
  );
}