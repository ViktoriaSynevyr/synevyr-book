import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

type SubscriptionWithLegacyPeriod = Stripe.Subscription & {
  current_period_end?: number;
};

function createStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is missing from .env.local"
    );
  }

  return new Stripe(secretKey);
}

function createSupabaseAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "Supabase server environment variables are missing."
    );
  }

  return createClient(
    supabaseUrl,
    supabaseSecretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}

function getCustomerId(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer
) {
  return typeof customer === "string"
    ? customer
    : customer.id;
}

function getCurrentPeriodEnd(
  subscription: Stripe.Subscription
) {
  const firstSubscriptionItem =
    subscription.items.data[0];

  const periodEnd =
    firstSubscriptionItem?.current_period_end ??
    (
      subscription as SubscriptionWithLegacyPeriod
    ).current_period_end;

  if (!periodEnd) {
    return null;
  }

  return new Date(periodEnd * 1000).toISOString();
}

async function saveSubscription(
  subscription: Stripe.Subscription
) {
  const userId =
    subscription.metadata.supabase_user_id;

  if (!userId) {
    console.error(
      "Subscription does not contain supabase_user_id."
    );

    return;
  }

  const firstSubscriptionItem =
    subscription.items.data[0];

  const stripePriceId =
    firstSubscriptionItem?.price.id ?? null;

  const supabaseAdmin =
    createSupabaseAdminClient();

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: getCustomerId(
          subscription.customer
        ),
        stripe_subscription_id:
          subscription.id,
        stripe_price_id: stripePriceId,
        status: subscription.status,
        current_period_end:
          getCurrentPeriodEnd(subscription),
        cancel_at_period_end:
          subscription.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );

  if (error) {
    throw new Error(
      "Could not save subscription: " +
        error.message
    );
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      {
        error:
          "STRIPE_WEBHOOK_SECRET is missing.",
      },
      {
        status: 500,
      }
    );
  }

  const signature =
    request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        error: "Stripe signature is missing.",
      },
      {
        status: 400,
      }
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    const stripe = createStripeClient();

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error(
      "Webhook signature verification failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Webhook signature verification failed.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const stripe = createStripeClient();

    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession =
          event.data.object as Stripe.Checkout.Session;

        const subscriptionId =
          typeof checkoutSession.subscription ===
          "string"
            ? checkoutSession.subscription
            : checkoutSession.subscription?.id;
            if (subscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(
              subscriptionId
            );

          await saveSubscription(subscription);
        }

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;

        await saveSubscription(subscription);

        break;
      }

      default: {
        console.log(
          "Unhandled Stripe event:",
          event.type
        );
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Webhook processing error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Could not process Stripe webhook.",
      },
      {
        status: 500,
      }
    );
  }
}