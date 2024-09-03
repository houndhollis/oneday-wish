"use client";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export const useKaKaoLogin = async () => {
  const supabase = await createBrowserSupabaseClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://daily-connection.vercel.app//auth/callback`
        : "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    alert(error.message);
  }
};
