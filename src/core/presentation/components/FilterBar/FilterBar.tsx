import { FilterState } from "@/modules/Librarian/BookStatus/domain/entities/filter";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DatePicker from "../date-picker/date-picker";
import { Button } from "../ui/button";

type Props = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onSubmit?: () => void;
  manual?: boolean;
  placeholder?: string;
};

export default function FilterBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  manual,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="relative flex flex-row items-center">
        <Search className="absolute left-2 text-gray-400" size={18} />
        <Input
          type="text"
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          className="pl-8 pr-4 py-5 placeholder:text-sm placeholder:text-gray-400 w-96"
          placeholder={placeholder}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
        <div className="flex flex-col gap-2">
          <Label>Start Date</Label>
          <DatePicker
            selected={value.startDate ?? undefined}
            onSelect={(d: Date | undefined) =>
              onChange({ ...value, startDate: d })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>End Date</Label>
          <DatePicker
            selected={value.endDate ?? undefined}
            onSelect={(d: Date | undefined) =>
              onChange({ ...value, endDate: d })
            }
          />
        </div>

        {manual && (
          <Button
            type="submit"
            className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
          >
            Apply
          </Button>
        )}
      </div>
    </form>
  );
}
