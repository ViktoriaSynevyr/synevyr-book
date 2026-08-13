import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!stripeSecretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is missing from .env.local"
  );
}

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Supabase environment variables are missing."
  );
}

const stripe = new Stripe(stripeSecretKey);

const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export async function POST(request: NextRequest) {
  console.log(
    "ENV CHECK:",
    "monthly =",
    Boolean(process.env.STRIPE_MONTHLY_PRICE_ID),
    "yearly =",
    Boolean(process.env.STRIPE_YEARLY_PRICE_ID)
  );

  try {
    const authorizationHeader =
      request.headers.get("authorization");

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const accessToken =
      authorizationHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Your login session is invalid." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const plan = body.plan;

    if (plan !== "monthly" && plan !== "yearly") {
      return NextResponse.json(
        { error: "Invalid subscription plan." },
        { status: 400 }
      );
    }

    const priceId =
      plan === "monthly"
        ? process.env.STRIPE_MONTHLY_PRICE_ID
        : process.env.STRIPE_YEARLY_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe Price ID is missing." },
        { status: 500 }
      );
    }

    const origin =
      request.headers.get("origin") ??
      "http://localhost:3000";

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        client_reference_id: user.id,

        customer_email: user.email,

        metadata: {
          supabase_user_id: user.id,
          plan,
        },

        subscription_data: {
          metadata: {
            supabase_user_id: user.id,
            plan,
          },
        },

        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        success_url:
          origin +
          "/subscription/success?session_id={CHECKOUT_SESSION_ID}",

        cancel_url:
          origin + "/subscription",

        allow_promotion_codes: true,
      });

    if (!session.url) {
      return NextResponse.json(
        {
          error:
            "Stripe did not return a checkout URL.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown Stripe error";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}