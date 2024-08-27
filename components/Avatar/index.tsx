import { dateFormatter } from "utils/date_format";

export default function Avatar({ profile_image, author, created_at }) {
  return (
    <div className="flex items-center gap-2">
      <img
        className={
          "w-[46px] h-[46px] rounded-full border border-gray-100 object-cover"
        }
        src={profile_image}
      />
      <div className="flex flex-col">
        <p className="text-[14px]">{author.split("@")?.[0]}</p>
        <p className="text-gray-400 text-[12px]">{dateFormatter(created_at)}</p>
      </div>
    </div>
  );
}
