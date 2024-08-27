"use client";

import { createBrowserSupabaseClient } from "utils/supabase/client";
import { useKaKaoLogin } from "hooks/useKakaoLogin";

export default function ProfileSection({ session }) {
  const userInfo = session?.user?.user_metadata;

  const supabase = createBrowserSupabaseClient();

  const onLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="px-4 py-10 flex flex-col items-center justify-center font-sea">
      {session ? (
        <>
          <img
            className="w-[128px] h-[128px] rounded-full object-cover"
            src={session?.user?.user_metadata?.avatar_url}
          />
          <div className="my-2">
            <p className="text-[22px]">{`${userInfo?.email}님 안녕하세요!`}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-2 py-1.5 bg-black text-white rounded-[12px]"
          >
            아쉬워요 로그아웃 !
          </button>
        </>
      ) : (
        <button
          onClick={() => useKaKaoLogin()}
          className="px-2 py-1.5 bg-black text-white rounded-[12px]"
        >
          로그인 하러가기!
        </button>
      )}
    </div>
  );
}
