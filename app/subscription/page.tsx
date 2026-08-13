"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

type PaidPlanId = "monthly" | "yearly";

const paidPlans = [
  {
    id: "monthly" as const,
    name: "Synevyr+ Monthly",
    price: "$9.99",
    period: "/ month",
    billingText: "$9.99 billed every month",
    description:
      "Flexible access to the complete story and the expanding world of Synevyr.",
  },
  {
    id: "yearly" as const,
    name: "Synevyr+ Yearly",
    price: "$89.99",
    period: "/ year",
    billingText: "$89.99 billed once per year",
    description:
      "The best value for readers who want to remain part of the world of Synevyr.",
    badge: "Save 25%",
  },
];

const freeFeatures = [
  "The complete prologue",
  "The first 3 chapters",
  "Introduction to the world and characters",
  "Access to the folklore section",
  "Access to the author page",
];

const premiumFeatures = [
  "Full access to the complete novel",
  "Cloud bookmarks and reading progress",
  "Future audiobook access",
  "Interactive world map",
  "Explore the farm and its surroundings",
  "Visit the hotel and hidden locations",
  "Enter Yasia’s room",
  "Explore the mysterious library",
  "Exclusive illustrations and bonus materials",
  "New interactive content as the world expands",
];

const upcomingFeatures = [
  {
    icon: "🎧",
    title: "Audiobook",
    description:
      "Listen to the story and experience the atmosphere of the Carpathians.",
  },
  {
    icon: "🗺️",
    title: "Interactive map",
    description:
      "Discover important locations, paths, villages, forests, and hidden places.",
  },
  {
    icon: "🏡",
    title: "The farm",
    description:
      "Walk through the territory where part of Yasia’s story unfolds.",
  },
  {
    icon: "📚",
    title: "The library",
    description:
      "Enter the living library and explore its mysterious rooms.",
  },
  {
    icon: "🛏️",
    title: "Yasia’s room",
    description:
      "Explore personal objects, memories, and details from the heroine’s life.",
  },
  {
    icon: "🏨",
    title: "Iconic locations",
    description:
      "Visit the hotel and other important places from the world of Synevyr.",
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] =
    useState<PaidPlanId>("yearly");

  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const selectedPlanDetails =
    paidPlans.find((plan) => plan.id === selectedPlan) ??
    paidPlans[1];

  async function handleSubscribe() {
    try {
      setIsLoading(true);
      setCheckoutError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setCheckoutError(
          "Please log in before starting a subscription."
        );
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + session.access_token,
          },
          body: JSON.stringify({
            plan: selectedPlan,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(
          data.error || "Could not open Stripe Checkout."
        );
      }

      window.location.href = data.url;
   } catch (error) {
  console.error("Checkout error:", error);

  setCheckoutError(
    error instanceof Error
      ? error.message
      : "Could not open checkout. Please try again."
  );

  setIsLoading(false);
}
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050706] px-5 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#193326_0%,#0a1711_45%,#050b08_100%)]" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto max-w-6xl">
<div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/uk"
            className="text-sm text-white/60 transition hover:text-amber-100"
          >
            ← Back to the website
          </Link>

          <span className="text-xs uppercase tracking-[0.35em] text-amber-100/70">
            Legend of Lake Synevyr
          </span>
        </div>

        <section className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-amber-100/70">
            Enter the living world of the story
          </p>

          <h1 className="text-5xl font-bold md:text-7xl">
            Synevyr+
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70 md:text-xl">
            More than a book. Synevyr+ is your membership
            to an expanding fantasy universe filled with
            stories, sound, folklore, hidden places, and
            interactive experiences.
          </p>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/70">
              Free
            </p>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-bold">
                $0
              </span>

              <span className="pb-1 text-white/50">
                forever
              </span>
            </div>

            <p className="mt-4 leading-7 text-white/60">
              Begin your journey and discover whether the
              world of Synevyr is calling you.
            </p>

            <div className="mt-6 space-y-3">
              {freeFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-white/70"
                >
                  <span className="text-emerald-200">
                    ✓
                  </span>

                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/uk/reading/prologue"
              className="mt-8 block rounded-2xl border border-white/20 px-5 py-4 text-center font-semibold text-white transition hover:border-emerald-200/50 hover:bg-emerald-200/10"
            >
              Start reading for free
            </Link>
          </div>

          {paidPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                disabled={isLoading}
                className={
                  isSelected
                    ? "relative rounded-3xl border border-amber-200/70 bg-amber-200/10 p-6 text-left shadow-2xl transition disabled:cursor-not-allowed disabled:opacity-70"
                    : "relative rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-amber-200/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                }
              >
                {plan.badge && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-200 px-3 py-1 text-xs font-bold text-[#172018]">
                    {plan.badge}
                  </span>
                )}

                <p className="pr-24 text-sm uppercase tracking-[0.2em] text-amber-100/70">
                  {plan.name}
                </p>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-bold">
                    {plan.price}
                  </span>

                  <span className="pb-1 text-white/50">
                    {plan.period}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-white/60">
                  {plan.
                  description}
                </p>

                <div className="mt-6 space-y-3">
                  {premiumFeatures
                    .slice(0, 5)
                    .map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-white/70"
                      >
                        <span className="text-amber-100">
                          ✦
                        </span>

                        <span>{feature}</span>
                      </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-amber-100">
                  <span
                    className={
                      isSelected
                        ? "flex h-5 w-5 items-center justify-center rounded-full border border-amber-200 bg-amber-200 text-[#172018]"
                        : "flex h-5 w-5 items-center justify-center rounded-full border border-white/30"
                    }
                  >
                    {isSelected ? "✓" : ""}
                  </span>

                  {isSelected
                    ? "Selected membership"
                    : "Select this membership"}
                </div>
              </button>
            );
          })}
        </section>

        <section className="mt-10 grid gap-8 rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl md:grid-cols-[1.35fr_0.65fr] md:p-10">
          <div>
            <h2 className="text-3xl font-bold">
              Everything included in Synevyr+
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {premiumFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl bg-white/5 p-4"
                >
                  <span className="mt-0.5 text-amber-100">
                    ✦
                  </span>

                  <p className="leading-6 text-white/75">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-amber-200/20 bg-[#101a14]/90 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-100/60">
              Your selected membership
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              {selectedPlanDetails.name}
            </h3>

            <p className="mt-2 text-white/55">
              {selectedPlanDetails.billingText}
            </p>

            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isLoading}
              className="mt-6 rounded-2xl bg-amber-200 px-5 py-4 font-bold text-[#172018] transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Opening secure checkout..."
                : "Join Synevyr+"}
            </button>

            {checkoutError && (
              <p className="mt-3 text-center text-sm leading-6 text-red-200">
                {checkoutError}
              </p>
            )}

            <p className="mt-4 text-center text-xs leading-5 text-white/35">
              Secure recurring payments will be processed
              by Stripe. You will be able to manage or
              cancel your membership.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-100/60">
              The world will continue to grow
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              What is coming next?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/60">
              Synevyr+ will gradually expand with new ways
              to read, listen to, and explore the story.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-200/30 hover:bg-white/10"
              >
                <span className="text-3xl">
                  {feature.icon}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-amber-100">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-white/55">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center text-xs leading-5 text-white/35">
          Stripe is currently running in sandbox mode. No
          real payment will be charged during testing.
        </p>
      </div>
    </main>
  );
}