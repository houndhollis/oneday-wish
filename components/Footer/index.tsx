"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, User, ArrowLeft } from "react-feather";

export default function Footer() {
  const path = usePathname();
  const router = useRouter();

  if (path === "/") return;

  const onBackClick = () => {
    router.back();
  };
  return (
    <footer
      className={
        "md:w-[528px] w-full px-5 h-[52px] fixed bottom-0 bg-white border-t-2 border-gray-200 z-50"
      }
    >
      <div className="h-full flex items-center">
        {path?.includes("post_detail") && (
          <ArrowLeft onClick={onBackClick} className="flex-1 cursor-pointer" />
        )}
        <Link href={"/home"} className="flex-1 flex justify-center">
          <Home
            className={path === "/home" ? "stroke-black" : "stroke-gray-400"}
          />
        </Link>
        <Link href={"/profile"} className="flex-1 flex justify-center">
          <User
            className={path === "/profile" ? "stroke-black" : "stroke-gray-400"}
          />
        </Link>
      </div>
    </footer>
  );
}
