import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  const adminEmail =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    !adminEmail
  ) {
    return Response.json(
      {
        error: "Missing server configuration.",
      },
      { status: 500 }
    );
  }

  const authorization =
    request.headers.get("authorization");

  const accessToken =
    authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

  if (!accessToken) {
    return Response.json(
      {
        error: "Unauthorized.",
      },
      { status: 401 }
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
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.getUser(
    accessToken
  );

  if (
    userError ||
    !user ||
    user.email !== adminEmail
  ) {
    return Response.json(
      {
        error: "Forbidden.",
      },
      { status: 403 }
    );
  }

  const {
    data: { users },
    error,
  } =
    await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (error) {
    console.error(
      "Could not load users:",
      error
    );

    return Response.json(
      {
        error: error.message,
      },
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
