import React from "react";
import Skeleton from "../Skeleton";

export default function ProductCardSkeleton({ variant = "grid" }) {
  const isWide = variant === "wide";

  return (
    <article
      className={
        isWide
          ? "w-[82vw] max-w-[320px] shrink-0 overflow-hidden rounded-[12px] border border-slate-200 bg-white md:w-auto md:max-w-none md:min-w-0"
          : "overflow-hidden rounded-2xl border border-slate-200 bg-white"
      }
    >
      <Skeleton className={isWide ? "h-64 w-full rounded-none" : "h-36 w-full rounded-none"} />

      <div className={isWide ? "p-6" : "p-4"}>
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-10" />
        </div>

        <Skeleton className={isWide ? "mt-4 h-5 w-3/4" : "mt-3 h-4 w-3/4"} />
        <Skeleton className={isWide ? "mt-3 h-3.5 w-full" : "mt-2 h-3 w-full"} />
        <Skeleton className={isWide ? "mt-2 h-3.5 w-2/3" : "mt-1 h-3 w-2/3"} />

        <div className={`flex items-center justify-end gap-3 ${isWide ? "mt-6" : "mt-4"}`}>
          <Skeleton className={isWide ? "h-10 w-28 rounded-full" : "h-8 flex-1 rounded-full"} />
          <Skeleton className={isWide ? "h-10 w-24 rounded-full" : "h-8 flex-1 rounded-full"} />
        </div>
      </div>
    </article>
  );
}
