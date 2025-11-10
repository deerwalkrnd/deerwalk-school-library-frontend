import { FilterState } from "@/modules/Librarian/BookStatus/domain/entities/filter";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DatePicker from "../date-picker/date-picker";
import { Button } from "../ui/button";
import SearchableFieldSelector, {
  SearchableFieldOption,
} from "./SearchableFieldSelector";

type Props = {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onSubmit?: () => void;
  manual?: boolean;
  placeholder?: string;
  searchableFieldOptions?: SearchableFieldOption[];
  showSearchableFields?: boolean;
  showDates?: boolean;
};

export default function FilterBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  manual,
  searchableFieldOptions = [],
  showSearchableFields = true,
  showDates = true,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end items-start">
        <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-xs">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            className="pl-8 pr-4 py-5 placeholder:text-sm placeholder:text-gray-400 w-full"
            placeholder={placeholder}
          />
        </div>

        {showSearchableFields && searchableFieldOptions.length > 0 && (
          <div className="w-full lg:w-48">
            <SearchableFieldSelector
              options={searchableFieldOptions}
              value={value.searchableField}
              onChange={(field) =>
                onChange({ ...value, searchableField: field })
              }
            />
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
        {showDates && (
          <>
            <div className="flex flex-col gap-2 w-full lg:w-48">
              <Label>Start Date</Label>
              <DatePicker
                selected={value.startDate ?? undefined}
                onSelect={(d: Date | undefined) =>
                  onChange({ ...value, startDate: d })
                }
              />
            </div>

            <div className="flex flex-col gap-2 w-full lg:w-48">
              <Label>End Date</Label>
              <DatePicker
                selected={value.endDate ?? undefined}
                onSelect={(d: Date | undefined) =>
                  onChange({ ...value, endDate: d })
                }
              />
            </div>
          </>
        )}

        {manual && (
          <Button
            type="submit"
            className="bg-white hover:bg-gray-50 cursor-pointer text-black font-bold shadow-md px-12 border w-full lg:w-auto"
          >
            Apply
          </Button>
        )}
      </div>
    </form>
  );
}
