"use client";

import { useQuery } from "@tanstack/react-query";
import { getPost } from "actions/postActions";
import Avatar from "components/Avatar";
import { useParams } from "next/navigation";

export default function PostDetailSection() {
  const params = useParams();

  const { id } = params;

  const postDetailQuery = useQuery({
    queryKey: ["post_detail"],
    queryFn: () => {
      return getPost(id);
    },
  });

  if (postDetailQuery.isPending) {
    return <p>로딩중</p>;
  }

  const {
    title,
    content,
    author,
    profile_image,
    image_url,
    likes_count,
    created_at,
  } = postDetailQuery.data;

  return (
    <div className="font-sea">
      {image_url && (
        <div className="relative pt-[100%]">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={image_url}
          />
        </div>
      )}
      <div className="p-4">
        <Avatar
          profile_image={profile_image}
          author={author}
          created_at={created_at}
        />
        <div className="mt-2">
          <p className="text-[24px]">{title}</p>
          <p className="text-gray-500 text-[18px]">{content}</p>
        </div>
      </div>
    </div>
  );
}
