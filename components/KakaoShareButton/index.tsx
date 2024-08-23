"use client";

import Image from "next/image";
import KakaoImage from "../../public/kakao_share.png";
import { getLogoUrl } from "utils/constant";

type KaKaoShareButtonProps = {
  title: string;
  imageUrl?: string;
};

export default function KakaoShareButton({
  title,
  imageUrl = getLogoUrl,
}: KaKaoShareButtonProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const onShareClick = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        imageUrl: imageUrl,
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
