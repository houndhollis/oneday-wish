import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/home";

  const response = NextResponse.redirect(`${origin}${next}`);
  response.cookies.set("code", code || "");
  response.cookies.set("next", next);

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
