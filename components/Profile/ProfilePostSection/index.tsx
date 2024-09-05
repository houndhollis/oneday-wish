"use client";

import HomeItem from "components/Home/HomeSection/HomeItem";
import Skeleton from "components/Skeleton/HomeSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyPosts } from "actions/profileActions";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";

type Post = {
  id: number;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  liked_by_user: boolean;
};

export type GetMyPostsResponse = {
  data: Post[];
  count?: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  error?: any;
};

export default function ProfilePostSection({ userId, author, session }) {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<GetMyPostsResponse>({
      initialPageParam: 1,
      queryKey: ["profilePost"],
      queryFn: ({ pageParam = 1 }) =>
        getMyPosts({
          userId: userId,
          author: author?.email,
          page: pageParam as number,
          pageSize: 4,
        }),

      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : null,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <h1 className="text-[24px]">내가 쓴 게시물 보기</h1>
      {isFetching && !isFetchingNextPage && (
        <div className="w-full h-full">
          <Skeleton type="min" />
        </div>
      )}
      <div className="grid grid-cols-2">
        {data?.pages &&
          data.pages
            .map((page) => page.data)
            .flat()
            .map((post) => (
              <HomeItem key={post.id} post={post} session={session} />
            ))}
        <div ref={ref} />
      </div>
      <div className="w-full flex items-center justify-center">
        {isFetchingNextPage && <ClipLoader />}
      </div>
    </div>
  );
}
