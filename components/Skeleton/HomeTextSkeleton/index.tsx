export default function HomeTextSkeleton() {
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
