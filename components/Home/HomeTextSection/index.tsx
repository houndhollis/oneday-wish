"use client";
import { ChevronRight } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { getTextPosts } from "actions/postActions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import HomeTextItem from "./HomeTextItem";
import Link from "next/link";
import HomeTextSkeleton from "components/Skeleton/HomeTextSkeleton";

export default function HomeTextSection({ session }) {
  const textQuery = useQuery({
    queryKey: ["textPosts"],
    queryFn: () => {
      return getTextPosts(true);
    },
  });

  return (
    <div className="mt-3 font-sea">
      <div className="px-4 flex justify-between items-center">
        <h1 className="text-[22px]">텍스트 글 보기</h1>
        <Link
          className="flex items-center text-gray-500"
          href={"/home/text-list"}
        >
          <p className="text-[14px] leading-[24px]">전체보기</p>
          <ChevronRight className="w-[16px] h-[16px]" />
        </Link>
      </div>
      {textQuery.isPending ? (
        <HomeTextSkeleton />
      ) : (
        <Swiper
          className="mySwiper !pr-3 !mt-1.5"
          spaceBetween={14}
          slidesPerView="auto"
          centeredSlides={false}
          grabCursor={true}
          loop={true}
        >
          {textQuery.data &&
            textQuery.data.map((post) => (
              <SwiperSlide
                className="relative !h-[80px] pl-4 mt-1.5 flex items-center basis-[85%] shrink-0"
                key={post.id}
              >
                <HomeTextItem post={post} />
                <div className="absolute right-[-12px] top-0 h-full border-r border-gray-300" />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}
