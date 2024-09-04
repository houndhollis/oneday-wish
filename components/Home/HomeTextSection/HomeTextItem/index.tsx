import Link from "next/link";
import { dateFormatter } from "utils/date_format";

export default function HomeTextItem({ post, isHome = true }) {
  return (
    <Link
      href={`/post_detail/${post.id}`}
      className={`grow pr-2 ${
        !isHome && "block pb-3 border-b border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="line-clamp-1">{post?.author.split("@")[0]}</p>
        <p className="shrink-0 text-gray-400 text-[12px]">
          {dateFormatter(post.created_at)}
        </p>
      </div>
      <div className="mt-1.5 flex flex-col">
        <p className="text-[20px] line-clamp-1">{post.title}</p>
        <p className="text-[14px] text-gray-500 line-clamp-1">{post.content}</p>
      </div>
    </Link>
  );
}
