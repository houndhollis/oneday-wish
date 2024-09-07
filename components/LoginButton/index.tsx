"use client";

import { useKaKaoLogin } from "hooks/useKakaoLogin";
import Image from "next/image";
import KaKaoLoginButton from "../../public/kakao_login_large_wide.png";
import { ClipLoader } from "react-spinners";

type LoginButtonProp = {
  isCustom?: boolean;
};

export default function LoginButton({ isCustom = false }: LoginButtonProp) {
  const { loginAuthKakao, isLoading, error } = useKaKaoLogin();

  if (isCustom) {
    return (
      <button
        onClick={loginAuthKakao}
        disabled={isLoading}
        className="bg-black text-white rounded flex items-center justify-center text-[12px] w-[48px] h-[32px] px-2 "
      >
        {isLoading ? <ClipLoader size={16} color="white" /> : "로그인"}
        {error && <p className="text-[14px] text-red-500">{error}</p>}
      </button>
    );
  }

  return (
    <button onClick={loginAuthKakao} disabled={isLoading} className="mt-5">
      {isLoading ? (
        <div className="text-[14px] w-[300px] h-[45px] bg-[#fee601] rounded-[8px] flex items-center justify-center">
          로그인중...
        </div>
      ) : (
        <Image
          src={KaKaoLoginButton}
          alt="카카오 로그인 버튼"
          width={300}
          height={45}
        />
      )}
    </button>
  );
}
