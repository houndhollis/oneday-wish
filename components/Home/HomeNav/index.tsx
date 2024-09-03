"use client";

import { useRecoilState } from "recoil";
import { changeScreenState } from "utils/recoil/atoms";
import { Maximize2, Minimize2 } from "react-feather";

export default function HomeNav() {
  const [changeScreen, setChangeScreen] = useRecoilState(changeScreenState);
  const isMax = changeScreen === "max";

  return (
    <div className="px-4 py-2 flex items-center justify-between">
      <h1 className="font-sea text-[24px]">
        {isMax ? "이미지 크게보기" : "이미지 작게보기"}
      </h1>
      <div className="flex items-center gap-3">
        <div
          onClick={() => setChangeScreen("max")}
          className={`border  rounded cursor-pointer ${
            isMax ? "border-gray-300" : "border-black"
          }`}
        >
          <Maximize2 className={`${isMax ? "text-gray-400" : "text-black"}`} />
        </div>
        <div
          onClick={() => setChangeScreen("min")}
          className={`border  rounded cursor-pointer ${
            isMax ? "border-black" : "border-gray-300"
          }`}
        >
          <Minimize2
            className={`${
              changeScreen === "min" ? "text-gray-400" : "text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
