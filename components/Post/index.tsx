"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { createPost } from "actions/postActions";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { imageState } from "utils/recoil/atoms";
import { getImageUrl } from "utils/supabase/storage";
import { useRouter } from "next/navigation";
import FormControl from "components/FormControl";
import UploadImage from "components/UploadImage";
import { ClipLoader } from "react-spinners";

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
      <FormControl
        className="mt-4 gap-2"
        label="오늘 하루를 알려주세요"
        htmlFor="title"
      >
        <input
          className="py-2 px-1 border-b border-gray-200 focus:outline-none"
          id="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl className="mt-6" htmlFor="content">
        <textarea
          className="h-[300px] py-2 px-1 border rounded border-gray-200 focus:outline-none resize-none"
          id="content"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <button
        onClick={handleSubmit}
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
