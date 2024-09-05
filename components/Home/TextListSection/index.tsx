"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTextInfinityPosts, getTextPosts } from "actions/postActions";
import HomeTextItem from "../HomeTextSection/HomeTextItem";
import HomeTextSkeleton from "components/Skeleton/HomeTextSkeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function TextListSection() {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["textList"],
      queryFn: ({ pageParam }) =>
        getTextInfinityPosts({ page: pageParam, pageSize: 12 }),

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
    <div className="p-4 pb-[64px]">
      <h1 className="text-[24px]">텍스트 글 전체 보기</h1>
      {isFetching && !isFetchingNextPage ? (
        <HomeTextSkeleton isHome={false} />
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {data?.pages &&
            data?.pages
              ?.map((page) => page.data)
              .flat()
              .map((post) => (
                <HomeTextItem key={post.id} post={post} isHome={false} />
              ))}
          <div ref={ref} />
          <div className="flex items-center justify-center">
            {isFetchingNextPage && <ClipLoader />}
          </div>
        </div>
      )}
    </div>
  );
}
