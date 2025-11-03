"use client";

import { Skeleton } from "@/core/presentation/components/ui/skeleton";

export const QuoteSkeleton = () => {
  return (
    <div className="item-border mb-10 bg-secondary p-6 flex flex-col items-start gap-y-7">
      <div>
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>
      <div className="flex flex-col justify-end items-start gap-6 self-stretch">
        <Skeleton className="h-6 w-full max-w-2xl rounded-md" />
        <Skeleton className="h-6 w-32 rounded-md" />
      </div>
    </div>
  );
};
