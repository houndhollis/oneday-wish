"use client";

import Image from "next/image";
import Link from "next/link";

import OneDayLogo from "../../public/oneday-logo.png";
import KaKaoLoginButton from "../../public/kakao_login_large_wide.png";
import { useKaKaoLogin } from "hooks/useKakaoLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginForm({ session }) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      return router.replace("/home");
    }
  }, [session]);

  return (
    <div className="h-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center mb-10">
        <Image
          src={OneDayLogo}
          alt="하루 소원 로고"
          width={300}
          height={300}
          className="w-full max-w-[320px]"
        />
        <p className="mt-5 text-[22px] font-sea">하루 공감 다이어리</p>
        <p className="mt-1 text-[36px] font-bold font-sea">하루공감</p>
        <div className="flex flex-col items-center gap-4">
          <button onClick={useKaKaoLogin} className="mt-5">
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
    </div>
  );
}
