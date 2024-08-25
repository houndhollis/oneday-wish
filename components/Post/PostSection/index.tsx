"use client";

import FormControl from "components/FormControl";
import UploadImage from "components/UploadImage";

export default function PostSection() {
  return (
    <div>
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
        />
      </FormControl>
      <FormControl className="mt-6" htmlFor="content">
        <textarea
          className="h-[300px] py-2 px-1 border rounded border-gray-200 focus:outline-none resize-none"
          id="content"
          placeholder="내용을 입력해주세요"
        />
      </FormControl>
    </div>
  );
}
