export type ImportTemplateFormat = "xlsx" | "csv";

export interface BookImportSkippedRow {
  book_title: string;
  reason: string;
  sheet?: string | null;
  row?: number | null;
}

/** Response of POST /books/bulk-upload. */
export interface BookImportResult {
  /** "template" = the system's import template, "register" = the library's accession register. */
  format: "template" | "register";
  /** New books created. */
  inserted: number;
  /** Books already in the library that received new copies. */
  books_updated: number;
  copies_added: number;
  /** Rows repeated in the file or already in the library. Not errors. */
  duplicates_ignored: number;
  skipped: BookImportSkippedRow[];
}
