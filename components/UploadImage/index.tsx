"use client";

import { XCircle } from "react-feather";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { imageState } from "utils/recoil/atoms";
import { useDropzone } from "react-dropzone";

export default function UploadImage() {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [imageUploadState, setImageUploadState] = useRecoilState(imageState);

  const handleDelet = () => {
    setUploadImage(null);
    setImageUploadState(null);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (file) {
      setUploadImage(window.URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      setImageUploadState(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return uploadImage ? (
    <div className="relative w-full flex items-center border border-gray-200 rounded">
      <img
        src={uploadImage}
        alt="이미지"
        width={300}
        height={300}
        className="w-full h-auto object-cover rounded"
      />
      <button onClick={handleDelet} className="absolute top-2 right-2">
        <XCircle className="w-full h-full" />
      </button>
    </div>
  ) : (
    <div
      className="p-8 w-full flex flex-col items-center justify-center gap-2 border-4 border-dotted border-gray-200 rounded"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="text-center">
        사진을 여기에 끌어다 놓거나
        <br /> 클릭하여 업로드하세요.
      </p>
      <button
        type="submit"
        className="py-1.5 px-1.5 bg-black text-white rounded-[8px]"
      >
        파일 업로드
      </button>
    </div>
  );
}
