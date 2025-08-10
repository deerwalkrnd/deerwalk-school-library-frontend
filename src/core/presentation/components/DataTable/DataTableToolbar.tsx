import { Table } from "@tanstack/react-table";
import { Input } from "@/core/presentation/components/ui/input";
import { Button } from "../ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {/* Add export, column visibility, etc. buttons here */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Export functionality
            console.log("Export data:", table.getFilteredRowModel().rows);
          }}
        >
          Export
        </Button>
      </div>
    </div>
  );
}
