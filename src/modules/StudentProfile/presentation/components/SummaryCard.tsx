import { Card } from "@/core/presentation/components/ui/card";
import { BookCopy, BookCheck, BanknoteArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  icon: "BookCopy" | "BookCheck" | "BanknoteArrowUp";
  title: string;
  value: string | number;
}

const IconMap: Record<SummaryCardProps["icon"], LucideIcon> = {
  BookCopy: BookCopy,
  BookCheck: BookCheck,
  BanknoteArrowUp: BanknoteArrowUp,
};

export function SummaryCard({ icon, title, value }: SummaryCardProps) {
  const IconComponent = IconMap[icon];
  return (
    <Card className="flex flex-col items-start p-4 rounded-lg shadow-sm border border-gray-200 w-full max-w-[346px]">
      <div className="p-2 bg-[#FADFCD] rounded-md border  border-[#EA5D0E4D]">
        <IconComponent className="w-6 h-6 text-black" />
      </div>
      <h3 className="text-lg text-black font-medium pb-4">{title}</h3>
      <p className="text-3xl font-semibold text-black">{value}</p>
    </Card>
  );
}
