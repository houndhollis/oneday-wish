"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "actions/storageActions";
import HomeItem from "./HomeItem";
import { useRecoilState } from "recoil";
import { changeScreenState } from "utils/recoil/atoms";
import { Maximize2, Minimize2 } from "react-feather";

export default function HomeSection() {
  const [changeScreen, setChangeScreen] = useRecoilState(changeScreenState);
  const isMax = changeScreen === "max";

  const postsQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => {
      return getPosts();
    },
  });

  if (!postsQuery.isPending) {
    <p>잠시 대기중!</p>;
  }

  return (
    <div className="mt-3 bg-white">
      <div className="px-4 py-2 flex items-center justify-between">
        <h1 className="font-sea text-[22px]">
          {isMax ? "크게보기" : "작게보기"}
        </h1>
        <div className="flex items-center gap-3">
          <div
            onClick={() => setChangeScreen("max")}
            className={`border  rounded cursor-pointer ${
              isMax ? "border-gray-300" : "border-black"
            }`}
          >
            <Maximize2
              className={`${isMax ? "text-gray-400" : "text-black"}`}
            />
          </div>
          <div
            onClick={() => setChangeScreen("min")}
            className={`border  rounded cursor-pointer ${
              isMax ? "border-black" : "border-gray-300"
            }`}
          >
            <Minimize2
              className={`${
                changeScreen === "min" ? "text-gray-400" : "text-black"
              }`}
            />
          </div>
        </div>
      </div>
      <div className={isMax ? "flex flex-col" : "grid grid-cols-2"}>
        {postsQuery.data &&
          postsQuery.data.map((post) => <HomeItem key={post.id} post={post} />)}
      </div>
    </div>
  );
}
