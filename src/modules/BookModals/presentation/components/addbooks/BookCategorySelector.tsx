interface BookCategorySelectorProps {
  bookType: "academic" | "non_academic" | "reference";
  onBookTypeChange: (type: "academic" | "non_academic" | "reference") => void;
}

export function BookCategorySelector({
  bookType,
  onBookTypeChange,
}: BookCategorySelectorProps) {
  return (
    <div className="space-y-3 w-190">
      <div className="flex gap-8">
        {(["academic", "non_academic", "reference"] as const).map((v) => (
          <label key={v} className="flex items-center space-x-2">
            <input
              type="radio"
              name="bookType"
              value={v}
              checked={bookType === v}
              onChange={(e) =>
                onBookTypeChange(e.target.value as typeof bookType)
              }
              className="h-4 w-4 accent-black border-gray-300"
            />
            <span className="text-xs font-medium text-black">
              {v === "non_academic"
                ? "Non-Academic"
                : v[0].toUpperCase() + v.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
