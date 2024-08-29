import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  console.log(origin, request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/home`
            : "http://localhost:3000/home"
        }`
      );
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
