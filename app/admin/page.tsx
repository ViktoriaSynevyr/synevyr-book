"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

type Subscription = {
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  status: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

type AdminUser = {
  id: string;
  email: string | null;
  created_at: string;
};

type UsersResponse = {
  count: number;
  users: AdminUser[];
};

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>([]);

  const [users, setUsers] =
    useState<AdminUser[]>([]);

  useEffect(() => {
    async function loadAdmin() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/login");
        return;
      }

      const adminEmail =
        process.env.NEXT_PUBLIC_ADMIN_EMAIL;

      if (
        !adminEmail ||
        session.user.email !== adminEmail
      ) {
        router.push("/");
        return;
      }

      const [
        subscriptionsResult,
        usersResult,
      ] = await Promise.all([
        supabase
          .from("subscriptions")
          .select(
            "user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, status, current_period_end, cancel_at_period_end, created_at, updated_at"
          )
          .order("created_at", {
            ascending: false,
          }),

        fetch("/api/admin/users", {
          headers: {
            Authorization:
              "Bearer " +
              session.access_token,
          },
        }),
      ]);

      if (subscriptionsResult.error) {
        console.error(
          "Admin subscriptions error:",
          subscriptionsResult.error
        );
      } else {
        setSubscriptions(
          subscriptionsResult.data ?? []
        );
      }

      if (!usersResult.ok) {
        console.error(
          "Could not load users:",
          usersResult.status
        );
      } else {
        const usersData =
          (await usersResult.json()) as UsersResponse;

        setUsers(usersData.users);
      }

      setLoading(false);
    }

    void loadAdmin();
  }, [router]);

  const subscriptionsByUser = useMemo(() => {
    const map = new Map<
      string,
      Subscription
    >();

    for (const subscription of subscriptions) {
      map.set(
        subscription.user_id,
        subscription
      );
    }

    return map;
  }, [subscriptions]);

  const activeSubscriptions =
    subscriptions.filter(
      (subscription) =>
        subscription.status === "active" ||
        subscription.status === "trialing"
    );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-white/60">
          Loading admin dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-100/60">
          Synevyr Admin
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-white/60">
          Manage users, subscriptions and premium access.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">
              Users
            </p>

            <p className="mt-3 text-3xl font-bold">
              {users.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">
              Active subscriptions
            </p>

            <p className="mt-3 text-3xl font-bold">
              {activeSubscriptions.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">
              Synevyr+ members
            </p>

            <p className="mt-3 text-3xl font-bold">
              {activeSubscriptions.length}
            </p>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
          <div className="border-b border-white/10 bg-white/5 px-6 py-5">
            <h2 className="text-xl font-semibold">
              Users
            </h2>
          </div>

          {users.length === 0 ? (
            <div className="p-6 text-white/50">
              No users yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 text-white/50">
                  <tr>
                    <th className="px-6 py-4">
                      Email
                    </th>

                    <th className="px-6 py-4">
                      Registered
                    </th>

                    <th className="px-6 py-4">
                      Synevyr+
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Renews / Ends
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => {
                    const subscription =
                      subscriptionsByUser.get(
                        user.id
                      );

                    const isPremium =
                      subscription?.status ===
                        "active" ||
                      subscription?.status ===
                        "trialing";

                    return (
                      <tr
                        key={user.id}
                        className="border-b border-white/5"
                      >
                        <td className="px-6 py-4 text-white/80">
                          {user.email ?? "—"}
                        </td>

                        <td className="px-6 py-4 text-white/60">
                          {new Date(
                            user.created_at
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4">
                          {isPremium
                            ? "Yes"
                            : "No"}
                        </td>

                        <td className="px-6 py-4">
                          {subscription?.status ??
                            "No subscription"}
                        </td>

                        <td className="px-6 py-4 text-white/60">
                          {subscription?.current_period_end
                            ? new Date(
                                subscription.current_period_end
                              ).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
