"use client";

import Avatar from "components/Avatar";

export default function PostDetailSection({ data }) {
  const {
    title,
    content,
    author,
    profile_image,
    image_url,
    likes_count,
    created_at,
  } = data;

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
