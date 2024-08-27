import { atom } from "recoil";

export const imageState = atom({
  key: "imageState",
  default: null,
});

export const changeScreenState = atom({
  key: "chageScreenState",
  default: "max",
});
