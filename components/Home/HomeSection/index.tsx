"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "actions/postActions";
import { useRecoilValue } from "recoil";
import { changeScreenState } from "utils/recoil/atoms";
import HomeItem from "./HomeItem";
import HomeNav from "../HomeNav";
import Skeleton from "components/Skeleton/HomeSkeleton";

export default function HomeSection({ session }) {
  const changeScreen = useRecoilValue(changeScreenState);
  const isMax = changeScreen === "max";

  const postsQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => {
      return getPosts(session?.user?.id);
    },
  });

  return (
    <div className="mt-6 bg-white pb-[64px]">
      <HomeNav />
      {postsQuery.isPending ? (
        <Skeleton type={changeScreen} />
      ) : (
        <div className={isMax ? "flex flex-col" : "grid grid-cols-2"}>
          {postsQuery.data &&
            postsQuery.data.map((post) => (
              <HomeItem key={post.id} session={session} post={post} />
            ))}
        </div>
      )}
    </div>
  );
}
