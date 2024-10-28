"use client";

import { useToggleLike } from "hooks/useToggleLike";
import { Heart } from "react-feather";

export default function ToggleLikeButton({
  userId,
  postId,
  currentLikeStatus,
  likeCount,
}) {
  const { mutate: toggleLike, isPending } = useToggleLike({
    userId,
    postId,
    currentLikeStatus,
  });

  return (
    <button
      disabled={isPending}
      className="flex items-center gap-1"
      onClick={() => toggleLike()}
    >
      <Heart
        className={`w-[16px] h-[16px] ${
          currentLikeStatus && "fill-red-500 stroke-red-500"
        }`}
      />
      {likeCount > 0 && (
        <p
          className={`text-gray-600 text-[16px] leading-[14px] ${
            currentLikeStatus && "!text-red-500"
          }`}
        >
          {Number(likeCount).toString()}
        </p>
      )}
    </button>
  );
}
