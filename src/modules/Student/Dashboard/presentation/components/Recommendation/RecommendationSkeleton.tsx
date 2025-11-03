"use client";

import { Skeleton } from "@/core/presentation/components/ui/skeleton";

export const TeachersRecommendationSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-80 rounded-md" />
        <Skeleton className="h-4 w-96 rounded-md" />
      </div>

      <div className="bg-white rounded-2xl overflow-hidden p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Left side - Teacher profile skeleton */}
          <div className="flex flex-col items-center gap-5 flex-shrink-0">
            <Skeleton className="w-56 h-56 rounded-full" />
            <div className="text-center flex flex-col gap-2 items-center">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          </div>

          {/* Middle & Right section skeleton */}
          <div className="flex flex-col md:flex-row justify-between gap-8 flex-1">
            {/* Middle - Quote and book info skeleton */}
            <div className="flex flex-col gap-8 flex-1">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>

              <div className="flex flex-col gap-3">
                <Skeleton className="h-3 w-32 rounded-md" />
                <Skeleton className="h-6 w-48 rounded-md" />
                <Skeleton className="h-10 w-28 rounded-md" />
              </div>
            </div>

            {/* Right - Book cover skeleton */}
            <div className="rounded-lg overflow-hidden shadow-xl flex-shrink-0">
              <div className="bg-white w-48 h-72 px-8 py-5">
                <Skeleton className="w-full h-full rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots skeleton */}
        <div className="flex items-center justify-center mt-8 gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-2 h-2 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
