"use client";

import Image from "next/image";
import KakaoImage from "../../public/kakao_share.png";

export default function KakaoShareButton({ content }: { content: string }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const onShareClick = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: content,
        imageUrl:
          "https://rtgroihwoiiqctuykpgp.supabase.co/storage/v1/object/public/minibox/oneday-logo.png",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    });
  };
  return (
    <div onClick={onShareClick}>
      <Image
        className="w-6 h-6 cursor-pointer"
        src={KakaoImage}
        alt="카카오톡 공유 이미지"
      />
    </div>
  );
}
