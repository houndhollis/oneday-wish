import Link from "next/link";
import { useRecoilValue } from "recoil";
import { dateFormatter } from "utils/date_format";
import { changeScreenState } from "utils/recoil/atoms";

type PostProps = {
  author: string;
  content: string;
  created_at: string;
  id: number;
  image_url?: string | null;
  title: string;
  updated_at?: string | null;
  profile_image?: string | null;
};

export default function HomeItem({ post }: { post: PostProps }) {
  const isMax = useRecoilValue(changeScreenState) === "max";

  return (
    <Link href={`post/${post.id}`}>
      <div className={`p-4 font-sea ${isMax && "border-b border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <img
            className={`${
              isMax ? "w-[46px] h-[46px]" : "w-[32px] h-[32px]"
            } rounded-full border border-gray-100 object-cover`}
            src={post.profile_image}
          />
          <div className="flex flex-col">
            <p className="text-[14px]">{post.author.split("@")?.[0]}</p>
            <p className="text-gray-400 text-[12px]">
              {dateFormatter(post.created_at)}
            </p>
          </div>
        </div>
        <div
          className={`mt-3 ${
            isMax && "flex flex-col items-center justify-center"
          }`}
        >
          {post.image_url && (
            <div
              className={`mb-3 relative ${
                isMax ? " w-[75%] pt-[75%]" : "w-full pt-[100%]"
              }`}
            >
              <img
                src={post.image_url}
                className="absolute inset-0 w-full h-full object-cover border border-gray-100 rounded-[8px]"
              />
            </div>
          )}
          <p
            className={`line-clamp-1 ${isMax ? "text-[24px]" : "text-[20px]"}`}
          >
            {post.title}
          </p>
          <p
            className={`text-gray-500 ${
              isMax ? "text-[18px]" : "text-[15px] line-clamp-1"
            }`}
          >
            {post.content}
          </p>
        </div>
      </div>
    </Link>
  );
}
