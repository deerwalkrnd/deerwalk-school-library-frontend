import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: number | string;
  className?: string;
}

export default function TotalComponent({ title, value, className }: Props) {
  return (
    <div
      className={cn(
        "px-4 py-4 sm:px-8 sm:py-6 h-max flex-1 border border-border rounded-xl",
        className,
      )}
    >
      <span></span>
      <h2 className="text-lg sm:text-xl font-normal">{title}</h2>
      {value ? (
        <p className="text-3xl sm:text-5xl font-bold mt-4 sm:mt-6">{value}</p>
      ) : (
        <p className="text-sm  font-semibold mt-4 sm:mt-6">
          Data not available
        </p>
      )}
    </div>
  );
}
