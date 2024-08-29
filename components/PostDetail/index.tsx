"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Avatar from "components/Avatar";
import { deletePost } from "actions/postActions";

export default function PostDetailSection({ data, session }) {
  const router = useRouter();
  const {
    id,
    title,
    content,
    author,
    profile_image,
    image_url,
    likes_count,
    created_at,
  } = data;
  const isPostAuthor = session?.user?.email === author;

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      return deletePost(postId);
    },
    onSuccess: () => {
      router.replace("/home");
    },
  });

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
        <div className="flex items-center justify-between">
          <Avatar
            profile_image={profile_image}
            author={author}
            created_at={created_at}
          />
          {isPostAuthor && (
            <p
              onClick={() => deleteMutation.mutate(id)}
              className="text-gray-600 cursor-pointer"
            >
              삭제
            </p>
          )}
        </div>
        <div className="mt-2">
          <p className="text-[24px]">{title}</p>
          <p className="text-gray-500 text-[18px]">{content}</p>
        </div>
      </div>
    </div>
  );
}
