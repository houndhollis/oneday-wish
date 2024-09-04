export default function HomeTextSkeleton({ isHome = true }) {
  if (!isHome) {
    return (
      <div className="mt-6 flex flex-col gap-10 animate-pulse h-[94px]">
        {Array.from({ length: 8 }).map((_, index) => (
          <HomeTextListItem key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-1.5 p-4 animate-pulse h-[86px]">
      <div className="flex justify-between items-center">
        <div className="w-1/4 h-2 bg-slate-200" />
        <div className="w-1/6 h-2 bg-slate-200" />
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div className="w-1/2 h-4 bg-slate-200" />
        <div className="w-1/4 h-2 bg-slate-200" />
      </div>
    </div>
  );
}

export function HomeTextListItem() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-1/4 h-2 bg-slate-200" />
        <div className="w-1/6 h-2 bg-slate-200" />
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div className="w-1/2 h-4 bg-slate-200" />
        <div className="w-1/4 h-2 bg-slate-200" />
      </div>
    </div>
  );
}
