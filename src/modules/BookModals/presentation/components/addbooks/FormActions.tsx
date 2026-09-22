interface FormActionsProps {
  edit?: boolean;
  onCancel: () => void;
  isLoading?: boolean;
  className?: string;
}

export function FormActions({
  edit,
  onCancel,
  isLoading = false,
  className = "pt-4 pb-10",
}: FormActionsProps) {
  return (
    <div className={`flex justify-end gap-3 ${className}`}>
      <button
        onClick={onCancel}
        type="button"
        className="h-11 w-32 rounded-lg border border-gray-300 bg-white text-sm font-medium text-black hover:bg-gray-50 cursor-pointer disabled:opacity-60"
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        className="h-11 w-36 rounded-lg button-border text-sm font-medium cursor-pointer disabled:opacity-70"
        type="submit"
        disabled={isLoading}
      >
        {edit
          ? isLoading
            ? "Editing Book..."
            : "Edit Book"
          : isLoading
            ? "Adding Book..."
            : "Add Book"}
      </button>
    </div>
  );
}
