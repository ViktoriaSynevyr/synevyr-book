import Link from "next/link";

export default function SubscriptionSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050706] px-5 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#193326_0%,#0a1711_45%,#050b08_100%)]" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-amber-200/20 bg-black/35 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-amber-200/40 bg-amber-200/10 text-4xl">
          ✦
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.4em] text-amber-100/60">
          Welcome to the living world
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Welcome to Synevyr+
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">
          Your test subscription was completed successfully.
          Your journey through the world of Synevyr can now
          continue.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
          <div className="flex items-center gap-3">
            <span className="text-amber-100">✓</span>

            <p className="text-white/75">
              Stripe Checkout completed successfully
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-amber-100">✓</span>

            <p className="text-white/75">
              Your Synevyr+ test membership was created
            </p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-amber-100">✓</span>

            <p className="text-white/75">
              No real money was charged in sandbox mode
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/uk/reading"
            className="rounded-2xl bg-amber-200 px-6 py-4 font-bold text-[#172018] transition hover:bg-amber-100"
          >
            Continue reading
          </Link>

          <Link
            href="/uk"
            className="rounded-2xl border border-white/20 px-6 py-4 font-semibold text-white transition hover:border-amber-200/50 hover:bg-white/10"
          >
            Back to the website
          </Link>
        </div>

        <p className="mt-8 text-xs leading-5 text-white/35">
          This payment was made in Stripe sandbox mode for
          testing purposes.
        </p>
      </div>
    </main>
  );
}