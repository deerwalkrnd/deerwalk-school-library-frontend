import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  value: number | string;
  className?: string;
  icon?: React.ReactNode;
}

export default function TotalComponent({
  title,
  value,
  className,
  icon,
}: Props) {
  const isValuePresent = value !== null && value !== undefined && value !== "";
  const isStringValue = typeof value === "string";

  return (
    <div
      className={cn(
        "px-4 py-4 sm:px-8 sm:py-6 min-h-36 sm:min-h-40 flex flex-col gap-7 justify-between border border-border rounded-xl",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div className="flex items-center item-border justify-center w-10 h-10 p-2 bg-overviewBackground rounded-md">
            {icon}
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-normal">{title}</h2>
      </div>
      {isValuePresent ? (
        <p
          className={cn(
            "font-bold",
            isStringValue
              ? "text-xl sm:text-2xl leading-snug break-words"
              : "text-3xl sm:text-5xl",
          )}
        >
          {value}
        </p>
      ) : (
        <p className="text-sm font-semibold">Data not available</p>
      )}
    </div>
  );
}
