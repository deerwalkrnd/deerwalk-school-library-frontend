"use client";

import { Skeleton } from "@/core/presentation/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
}

export const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
    <div className="w-full border rounded-xl overflow-hidden">
      <table className="w-full border-collapse">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="p-4">
                <Skeleton className="h-4 w-8 rounded-md" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-32 rounded-md" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-52 rounded-md" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-20 rounded-md" />
              </td>
              <td className="p-4">
                <Skeleton className="h-8 w-28 rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
