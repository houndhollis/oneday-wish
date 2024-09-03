import {
  Dialog,
  DialogBody,
  DialogButton,
  DialogTilte,
} from "components/Dialog";
import { ClipLoader } from "react-spinners";

export default function CanCelModal({ onClose, onDelete, isLoading }) {
  return (
    <Dialog open onClose={onClose}>
      <DialogTilte className="text-[24px] font-bold">삭제하기</DialogTilte>
      <DialogBody>해당 게시물을 정말 삭제할까요?</DialogBody>
      <DialogButton className="mt-2 flex items-center justify-end gap-3">
        <button onClick={onClose}>취소</button>
        <button onClick={onDelete}>
          {isLoading ? <ClipLoader size={14} /> : "확인"}
        </button>
      </DialogButton>
    </Dialog>
  );
}
