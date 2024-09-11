"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { createPost } from "actions/postActions";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { imageState } from "utils/recoil/atoms";
import { getImageUrl } from "utils/supabase/storage";
import { useRouter } from "next/navigation";
import UploadImage from "components/UploadImage";
import { ClipLoader } from "react-spinners";
import Input from "components/Input";
import TextArea from "components/TextArea";

export default function PostSection({ session }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const imageObjectState = useRecoilValue(imageState);

  const postMutation = useMutation({
    mutationFn: async (image) => {
      return await createPost({
        author: session?.user?.user_metadata?.email,
        title,
        content,
        image_url: getImageUrl(image),
        profile_image: session?.user?.user_metadata?.avatar_url,
      });
    },
    onSuccess: () => {
      setIsLoading(false);
      router.replace("/home");
    },
  });

  const handleSubmit = async () => {
    if (!title || !content) {
      return alert("제목 또는 내용을 입력해주세요.");
    }

    let fileResult;
    if (imageObjectState) {
      setIsLoading(true);
      fileResult = await uploadFile(imageObjectState);
    }
    postMutation.mutate(fileResult?.path);
  };

  return (
    <div className="flex flex-col">
      <UploadImage />
      <Input
        label="오늘 하루를 알려주세요"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        id="content"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="self-end min-w-[73px] mt-3 px-3 py-1.5 flex items-center justify-center bg-black text-white rounded-[8px]"
      >
        {postMutation.isPending || isLoading ? (
          <ClipLoader size={24} color="#fff" />
        ) : (
          "작성하기"
        )}
      </button>
    </div>
  );
}
