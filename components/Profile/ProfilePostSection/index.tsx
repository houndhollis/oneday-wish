"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "actions/profileActions";
import HomeItem from "components/Home/HomeSection/HomeItem";
import Skeleton from "components/Skeleton/HomeSkeleton";

export default function ProfilePostSection({ userId, author }) {
  const profilePostQuery = useQuery({
    queryKey: ["profilePost"],
    queryFn: () => {
      return getMyPosts(userId, author?.email);
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <h1 className="text-[24px]">내가 쓴 게시물 보기</h1>
      {profilePostQuery.isPending ? (
        <div className="w-full h-full">
          <Skeleton type={"min"} />
        </div>
      ) : profilePostQuery.data ? (
        <div className="grid grid-cols-2">
          {profilePostQuery.data.map((post) => (
            <HomeItem key={post.id} post={post} session={userId} />
          ))}
        </div>
      ) : (
        <div className="text-center">아쉽게도 게시물이 없습니다.</div>
      )}
    </div>
  );
}
