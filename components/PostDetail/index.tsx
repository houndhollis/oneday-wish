"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deletePost } from "actions/postActions";
import Avatar from "components/Avatar";
import CanCelModal from "components/Modal/cancel-modal";
import Image from "next/image";

export default function PostDetailSection({ data, session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Image
            width={350}
            height={350}
            alt="게시글 상세 이미지 사진"
            className="absolute inset-0 w-full h-full object-cover"
            src={image_url}
            priority={true}
            quality={60}
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
              onClick={() => setIsModalOpen(true)}
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
      {isModalOpen && (
        <CanCelModal
          isLoading={deleteMutation.isPending}
          onDelete={() => deleteMutation.mutate(id)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
