"use client";

import { useQuery } from "@tanstack/react-query";
import { getTextPosts } from "actions/postActions";
import HomeTextItem from "../HomeTextSection/HomeTextItem";
import HomeTextSkeleton from "components/Skeleton/HomeTextSkeleton";

export default function TextListSection() {
  const textListQuery = useQuery({
    queryKey: ["textList"],
    queryFn: () => {
      return getTextPosts(false);
    },
  });

  return (
    <div className="p-4 pb-[64px]">
      <h1 className="text-[24px]">텍스트 글 전체 보기</h1>
      {textListQuery.isPending ? (
        <HomeTextSkeleton isHome={false} />
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {textListQuery.data &&
            textListQuery.data.map((post) => (
              <HomeTextItem key={post.id} post={post} isHome={false} />
            ))}
        </div>
      )}
    </div>
  );
}
