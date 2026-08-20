import React from "react";
import Skeleton from "../Skeleton";

export default function HeroSkeleton() {
  return (
    <div className="overflow-hidden lg:min-h-screen">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1600px] items-stretch lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <Skeleton className="h-9 w-64 rounded-full" />

          <div className="mt-6 min-h-[320px] lg:min-h-[380px]">
            <Skeleton className="h-3.5 w-40" />

            <div className="mt-4 space-y-3">
              <Skeleton className="h-10 w-full max-w-xl" />
              <Skeleton className="h-10 w-2/3 max-w-md" />
            </div>

            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-3/4 max-w-md" />
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Skeleton className="h-[52px] w-44 rounded-full" />
              <Skeleton className="h-[52px] w-40 rounded-full" />
            </div>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden p-5 sm:p-7 lg:min-h-screen">
          <div className="relative h-full rounded-[32px] border border-slate-200 bg-white/60 p-3">
            <Skeleton className="h-full w-full rounded-[28px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
