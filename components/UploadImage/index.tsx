"use client";

import { uploadFile } from "actions/storageActions";
import { XCircle } from "react-feather";
import { useRef, useState } from "react";

export default function UploadImage() {
  const fileRef = useRef(null);
  const [uploadImage, setUploadImage] = useState<string | null>(null);

  const handleDelet = () => {
    setUploadImage(null);
  };

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
    <form
      className="p-10 w-full flex flex-col items-center justify-center gap-2 border-4 border-dotted border-gray-200 rounded"
      onSubmit={async (e) => {
        e.preventDefault();
        const file = fileRef.current.files?.[0];
        setUploadImage(window.URL.createObjectURL(file));
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          console.log(formData);
          const result = await uploadFile(formData);
          console.log(result);
          setUploadImage(result.path);
        }
      }}
    >
      <input type="file" ref={fileRef} />
      <p>사진을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      <button
        type="submit"
        className="py-1.5 px-1.5 bg-black text-white rounded-[8px]"
      >
        파일 업로드
      </button>
    </form>
  );
}
