"use client";

import Image from "next/image";
import Link from "next/link";

import OneDayLogo from "../../public/oneday-logo.png";
import KaKaoLoginButton from "../../public/kakao_login_large_wide.png";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function LoginForm() {
  const supabase = createBrowserSupabaseClient();

  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <div className="flex flex-col text-center mb-10">
      <Image
        src={OneDayLogo}
        alt="하루 소원 로고"
        width={300}
        height={300}
        className="w-full"
      />
      <p className="mt-5">하루 소원 다이어리</p>
      <p className="mt-1 text-3xl font-bold">하루소원</p>
      <div className="flex flex-col items-center gap-4">
        <button onClick={signInWithKakao} className="mt-5">
          <Image
            src={KaKaoLoginButton}
            alt="카카오 로그인 버튼"
            width={300}
            height={45}
          />
        </button>
        <button className="w-[300px] h-[45px] rounded-[6px] bg-black">
          <Link
            className="w-full h-full flex items-center justify-center text-[14px] text-white"
            href={"/home"}
          >
            둘러보기
          </Link>
        </button>
      </div>
    </div>
  );
}
