"use client";

import { getLogoUrl } from "utils/constant";
import { Share2 } from "react-feather";

type KaKaoShareButtonProps = {
  title: string;
  imageUrl?: string;
  shareUrl?: string;
};

export default function KakaoShareButton({
  title,
  imageUrl = getLogoUrl,
  shareUrl = typeof window !== "undefined" ? window.location.href : "",
}: KaKaoShareButtonProps) {
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
      <Share2 className="cursor-pointer" />
    </div>
  );
}
