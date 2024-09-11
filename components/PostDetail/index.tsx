"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deletePost, updatePost } from "actions/postActions";
import Avatar from "components/Avatar";
import CanCelModal from "components/Modal/cancel-modal";
import Image from "next/image";
import Input from "components/Input";
import TextArea from "components/TextArea";
import { ClipLoader } from "react-spinners";

export default function PostDetailSection({ data, session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(data?.title);
  const [editContent, setEditContent] = useState(data?.content);
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

  const updateMutation = useMutation({
    mutationFn: async () => {
      return updatePost(editTitle, editContent, id);
    },
    onSuccess: () => {
      router.refresh();
      setIsEdit(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      return deletePost(postId);
    },
    onSuccess: () => {
      router.back();
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
            <div className="flex items-center gap-3">
              <p
                onClick={() => setIsEdit(true)}
                className="text-gray-600 cursor-pointer"
              >
                수정
              </p>
              <p
                onClick={() => setIsModalOpen(true)}
                className="text-gray-600 cursor-pointer"
              >
                삭제
              </p>
            </div>
          )}
        </div>
        <div className="mt-2 pb-14">
          {isEdit ? (
            <div className="flex flex-col">
              <div>
                <Input
                  id="editTitle"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <TextArea
                  id="editContent"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => setIsEdit(false)}
                  className="px-1 py-0.5 border border-gray-200 rounded"
                >
                  취소
                </button>
                <button
                  disabled={updateMutation.isPending}
                  onClick={() => updateMutation.mutate()}
                  className="px-1 py-0.5 bg-black text-white rounded"
                >
                  {updateMutation.isPending ? (
                    <ClipLoader color="white" size={14} />
                  ) : (
                    "수정하기"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[24px]">{title}</p>
              <p className="text-gray-500 text-[18px]">{content}</p>
            </>
          )}
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
