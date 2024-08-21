"use client";

import { createBrowserClient } from "@supabase/ssr";
// Supabase SDK를 사용하기 위해 이니셜라이즈 해주는 부분
export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
