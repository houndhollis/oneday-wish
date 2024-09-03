export default function Skeleton({ type }) {
  if (type === "min") {
    return (
      <div className="grid grid-cols-2">
        <SmalPostSkeletonItem />
        <SmalPostSkeletonItem />
        <SmalPostSkeletonItem />
        <SmalPostSkeletonItem />
      </div>
    );
  }

  return (
    <div>
      <BigPostSkeletonItem />
      <BigPostSkeletonItem />
    </div>
  );
}

export function SmalPostSkeletonItem() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-center gap-2 h-[39px]">
        <div className="w-[34px] h-[34px] bg-slate-200 rounded-full" />
        <div className="flex flex-col flex-1 gap-1">
          <div className="w-1/4 h-2 bg-slate-200" />
          <div className="w-1/6 h-2 bg-slate-200" />
        </div>
      </div>
      <div className="mt-3">
        <div className="relative w-full pt-[100%]">
          <div className="absolute inset-0 w-full h-full bg-slate-200 rounded-[8px]" />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2 h-[60.5px]">
        <div className="w-1/2 h-4 bg-slate-200" />
        <div className="w-1/4 h-2 bg-slate-200" />
        <div className="w-1/6 h-2 bg-slate-200" />
      </div>
    </div>
  );
}

export function BigPostSkeletonItem() {
  return (
    <div className="p-4 pb-6 animate-pulse border-b border-gray-200">
      <div className="flex space-x-2 items-center">
        <div className="rounded-full bg-slate-200 h-[46px] w-[46px]" />
        <div className="flex flex-col flex-1 gap-2">
          <div className="w-1/6 h-2 bg-slate-200 rounded" />
          <div className="w-1/4 h-2 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center gap-2">
        <div className="mb-3 relative w-[75%] pt-[77%]">
          <div className="absolute inset-0 bg-slate-200 w-full h-full rounded-[8px]" />
        </div>
        <div className="bg-slate-200 w-1/2 h-4 rounded" />
        <div className="bg-slate-200 w-1/4 h-2 rounded" />
      </div>
    </div>
  );
}
