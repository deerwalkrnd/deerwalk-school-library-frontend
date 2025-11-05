import { SearchableFieldOption } from "@/core/presentation/components/FilterBar/SearchableFieldSelector";
import Recommendation from "@/modules/Announcement/Recommendation/presentation/components/Recommendation";

export const TABLE_FIELD_MAPPINGS = {
  books: [
    { value: "title", label: "Book Title" },
    { value: "author", label: "Author" },
    { value: "publication", label: "Publication" },
    { value: "isbn", label: "ISBN" },
    { value: "category", label: "Category" },
    { value: "grade", label: "Grade" },
    { value: "genre", label: "Genre" },
  ],
  users: [
    { value: "name", label: "Student Name" },
    { value: "roll_number", label: "Roll Number" },
    { value: "graduating_year", label: "Graduating Year" },
    { value: "email", label: "Email" },
    { value: "role", label: "Role" },
  ],
  issueBooks: [
    { value: "author", label: "Author" },
    { value: "book_title", label: "Book Title" },
    { value: "publication", label: "Publication" },
    { value: "student_name", label: "Student Name" },
    { value: "type", label: "Type" },
    { value: "class", label: "Class" },
    { value: "borrowed_date", label: "Borrowed Date" },
  ],
  returnBooks: [
    { value: "book_title", label: "Book Title" },
    { value: "author", label: "Author" },
    { value: "student_name", label: "Student Name" },
    { value: "returned_date", label: "Returned Date" },
    { value: "fine", label: "Fine" },
  ],
  overdues: [
    { value: "book_title", label: "Book Title" },
    { value: "author", label: "Author" },
    { value: "student_name", label: "Student Name" },
    { value: "due_date", label: "Due Date" },
    { value: "overdue_days", label: "Overdue Days" },
  ],
  feedback: [
    { value: "name", label: "Student Name" },
    // { value: "subject", label: "Subject" },
    // { value: "feedback", label: "Feedback Content" },
  ],
  events: [{ value: "name", label: "Event Name" }],
  recommendation: [{ value: "name", label: "Recommender Name" }],
} as const;

export type TableType = keyof typeof TABLE_FIELD_MAPPINGS;

export function getSearchableFieldsForTable(
  tableType: TableType,
): SearchableFieldOption[] {
  return [...(TABLE_FIELD_MAPPINGS[tableType] || [])];
}

export function getDefaultSearchableField(tableType: TableType): string {
  const fields = TABLE_FIELD_MAPPINGS[tableType];
  return fields[0].value;
}

/**
 * Create searchable field options from column definitions
 * This is useful when you have dynamic columns or want to auto-generate options
 */
export function createSearchableFieldsFromColumns(
  columns: Array<{
    accessorKey?: string;
    header?: string | ((props: any) => any);
  }>,
): SearchableFieldOption[] {
  return columns
    .filter(
      (col) =>
        col.accessorKey &&
        col.accessorKey !== "id" &&
        col.accessorKey !== "action" &&
        col.accessorKey !== "sn",
    )
    .map((col) => ({
      value: col.accessorKey!,
      label: typeof col.header === "string" ? col.header : col.accessorKey!,
    }));
}

/**
 * Generate searchable field options for a specific table type using column definitions
 * This combines column creation and field extraction in one clean function
 */
export function getSearchableFieldsFromColumns(
  createColumnsFn: (...args: any[]) => any[],
): SearchableFieldOption[] {
  const columns = createColumnsFn();
  return createSearchableFieldsFromColumns(columns);
}
