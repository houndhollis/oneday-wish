"use client";

import { Edit } from "react-feather";

import { useKaKaoLogin } from "hooks/useKakaoLogin";
import KakaoShareButton from "components/KakaoShareButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header({ session }) {
  const segment = usePathname();
  return (
    <header className="flex items-center justify-between p-3 border-b border-gray-100 text-black text-2xl font-semibold">
      <Link href={"/home"}>
        <h1 className="text-[26px] font-sea">하루 공감</h1>
      </Link>
      {segment !== "/home" ? null : session?.user?.id ? (
        <div className="flex items-center gap-3">
          <Link href={"/post"}>
            <Edit />
          </Link>
          <KakaoShareButton title="하루공감 하루의 있던 일을 나눠봐요" />
        </div>
      ) : (
        <button
          onClick={() => useKaKaoLogin()}
          className="bg-black rounded text-white text-[12px] py-1 px-2 "
        >
          로그인
        </button>
      )}
    </header>
  );
}
