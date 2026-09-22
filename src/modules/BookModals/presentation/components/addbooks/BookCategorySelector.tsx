type BookType = "academic" | "non_academic" | "reference";

interface BookCategorySelectorProps {
  bookType: BookType;
  onBookTypeChange: (type: BookType) => void;
}

const OPTIONS: { value: BookType; label: string }[] = [
  { value: "academic", label: "Academic" },
  { value: "non_academic", label: "Non-Academic" },
  { value: "reference", label: "Reference" },
];

export function BookCategorySelector({
  bookType,
  onBookTypeChange,
}: BookCategorySelectorProps) {
  return (
    <div className="space-y-2">
      <p id="book-category-label" className="text-sm font-medium text-black">
        Category
      </p>
      <div
        role="radiogroup"
        aria-labelledby="book-category-label"
        className="grid grid-cols-3 gap-1 h-12 p-1 rounded-lg border border-gray-300 bg-gray-50"
      >
        {OPTIONS.map(({ value, label }) => {
          const selected = bookType === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onBookTypeChange(value)}
              className={`rounded-md text-sm font-medium transition-colors cursor-pointer ${
                selected
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
