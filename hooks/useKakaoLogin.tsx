"use client";

import { useCallback, useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export const useKaKaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createBrowserSupabaseClient();

  const loginAuthKakao = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://daily-connection.vercel.app/auth/callback`
            : "http://localhost:3000/auth/callback",
        },
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  if (error) {
    alert(error.message);
  }
  return { loginAuthKakao, isLoading, error };
};
