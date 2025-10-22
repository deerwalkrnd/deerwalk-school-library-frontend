interface FormActionsProps {
  edit?: boolean;
  onCancel: () => void;
  isLoading?: boolean;
}

export function FormActions({
  edit,
  onCancel,
  isLoading = false,
}: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-4 pb-10">
      <button
        className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-30 disabled:opacity-70"
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
      <button
        onClick={onCancel}
        type="button"
        className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-medium text-black bg-white w-30"
        disabled={isLoading}
      >
        Cancel
      </button>
    </div>
  );
}
