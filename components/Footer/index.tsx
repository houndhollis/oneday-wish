"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "react-feather";

export default function Footer() {
  const path = usePathname();

  if (path === "/") return;

  return (
    <footer className="w-[528px] px-5 h-[64px] fixed bottom-0 bg-white border-t-2 border-gray-200 z-50">
      <div className="h-full flex items-center">
        <Link href={"/home"} className="flex-1 flex justify-center">
          <Home
            className={path === "/home" ? "stroke-black" : "stroke-gray-400"}
          />
        </Link>
        <Link href={"/profile"} className="flex-1 flex justify-center">
          <User
            className={path === "/home" ? "stroke-gray-400" : "stroke-black"}
          />
        </Link>
      </div>
    </footer>
  );
}
