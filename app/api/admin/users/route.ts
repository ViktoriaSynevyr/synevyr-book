import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json(
      {
        error: "Missing Supabase server configuration.",
      },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) {
    console.error("Could not load users:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json({
    count: users.length,

    users: users.map((user) => ({
      id: user.id,
      email: user.email ?? null,
      created_at: user.created_at,
    })),
  });
}