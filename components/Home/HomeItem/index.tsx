"use client";

import Link from "next/link";
import { useRecoilValue } from "recoil";
import { dateFormatter } from "utils/date_format";
import { changeScreenState } from "utils/recoil/atoms";
import { Heart } from "react-feather";
import { useState } from "react";
import { toggleLike } from "actions/postActions";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "config/ReactQueryClientProvider";

export type PostProps = {
  author: string;
  content: string;
  created_at: string;
  id: number;
  image_url?: string | null;
  title: string;
  updated_at?: string | null;
  profile_image?: string | null;
  likes_count: number;
  liked_by_user?: boolean;
};

export default function HomeItem({
  post,
  session,
}: {
  post: PostProps;
  session: any;
}) {
  const isMax = useRecoilValue(changeScreenState) === "max";
  const [isLike, setIsLike] = useState(post.liked_by_user);

  const likeMutation = useMutation({
    mutationFn: async () => {
      setIsLike(!isLike);
      await toggleLike(session?.user?.id, post.id, isLike);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  return (
    <div className={`p-4 font-sea ${isMax && "border-b border-gray-200"}`}>
      <Link href={`post_detail/${post.id}`}>
        <div className="flex items-center gap-2">
          <img
            className={`${
              isMax ? "w-[46px] h-[46px]" : "w-[32px] h-[32px]"
            } rounded-full border border-gray-100 object-cover`}
            src={post.profile_image}
          />
          <div className="flex flex-col">
            <p className="text-[14px]">{post.author.split("@")?.[0]}</p>
            <p className="text-gray-400 text-[12px]">
              {dateFormatter(post.created_at)}
            </p>
          </div>
        </div>
        <div
          className={`mt-3 ${
            isMax && "flex flex-col items-center justify-center"
          }`}
        >
          {post.image_url && (
            <div
              className={`mb-3 relative ${
                isMax ? " w-[75%] pt-[75%]" : "w-full pt-[100%]"
              }`}
            >
              <img
                src={post.image_url}
                className="absolute inset-0 w-full h-full object-cover border border-gray-100 rounded-[8px]"
              />
            </div>
          )}
          <p
            className={`line-clamp-1 ${isMax ? "text-[24px]" : "text-[20px]"}`}
          >
            {post.title}
          </p>
          <p
            className={`text-gray-500 ${
              isMax ? "text-[18px]" : "text-[15px] line-clamp-1"
            }`}
          >
            {post.content}
          </p>
        </div>
      </Link>
      <div className="mt-1">
        <button
          disabled={likeMutation.isPending || !session}
          className="flex items-center gap-1"
          onClick={() => likeMutation.mutate()}
        >
          <Heart
            className={`w-[16px] h-[16px] ${
              isLike && "fill-red-500 stroke-red-500"
            }`}
          />
          {post?.likes_count > 0 && (
            <p
              className={`text-gray-600 text-[16px] leading-[14px] ${
                isLike && "!text-red-500"
              }`}
            >
              {Number(post?.likes_count).toString()}
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
