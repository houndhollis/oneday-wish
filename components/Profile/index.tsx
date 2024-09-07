"use client";

import { createBrowserSupabaseClient } from "utils/supabase/client";
import ProfilePostSection from "./ProfilePostSection";
import LoginButton from "components/LoginButton";

export default function ProfileSection({ session }) {
  const userInfo = session?.user?.user_metadata;
  const supabase = createBrowserSupabaseClient();

  const onLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="px-4 py-10 h-full font-sea">
      {session ? (
        <div className="h-full flex flex-col items-center justify-center ">
          <img
            className="w-[128px] h-[128px] rounded-full object-cover"
            src={session?.user?.user_metadata?.avatar_url}
          />
          <div className="my-2">
            <p className="text-[22px]">{`${userInfo?.email}님 안녕하세요!`}</p>
          </div>
          <button
            onClick={onLogout}
            className="mt-3 mb-10 px-2 py-1.5 bg-black text-white rounded-[12px]"
          >
            아쉬워요 로그아웃 !
          </button>
          <ProfilePostSection
            session={session}
            userId={session?.user?.id}
            author={session?.user?.user_metadata}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-2 text-center text-[22px]">
            <p>하루 공감 서비스를 이용하기 위해서는</p>
            <p>로그인이 필요합니다 🥲</p>
          </div>
          <LoginButton isCustom />
        </div>
      )}
    </div>
  );
}
