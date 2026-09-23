"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { Files, CircleX, Loader2 } from "lucide-react";
import { showToast } from "@/core/lib/showToast";
import {
  useBulkUploadBooks,
  useDownloadImportTemplate,
} from "@/modules/BookPage/application/bookUseCase";
import type {
  BookImportResult,
  BookImportSkippedRow,
  ImportTemplateFormat,
} from "@/modules/BookPage/domain/entities/bookImport";

const SKIPPED_PREVIEW_LIMIT = 50;

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function skippedRowsToCsv(rows: BookImportSkippedRow[]): Blob {
  const escape = (value: unknown) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [
    ["Sheet", "Row", "Title", "Reason"].map(escape).join(","),
    ...rows.map((r) =>
      [r.sheet, r.row, r.book_title, r.reason].map(escape).join(","),
    ),
  ];
  // BOM so Excel shows Nepali titles correctly.
  return new Blob(["\uFEFF" + lines.join("\r\n")], {
    type: "text/csv;charset=utf-8",
  });
}

interface ImportBooksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess?: () => void;
}

export function ImportBooksModal({
  open,
  onOpenChange,
  onUploadSuccess,
}: ImportBooksModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const [result, setResult] = useState<BookImportResult | null>(null);
  const { mutate: uploadBooks, isPending } = useBulkUploadBooks();
  const { mutate: downloadTemplate, isPending: isDownloadingTemplate } =
    useDownloadImportTemplate();

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleCancel();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
      } else {
        showToast("error", "Please upload a CSV or Excel (.xlsx) file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
      } else {
        showToast("error", "Please upload a CSV or Excel (.xlsx) file");
      }
    }
  };

  // Decided by extension: browsers report CSV as "application/vnd.ms-excel"
  // on Windows, so the MIME type cannot tell CSV from legacy .xls.
  const isValidFileType = (file: File) =>
    [".csv", ".xlsx"].some((ext) => file.name.toLowerCase().endsWith(ext));

  const handleImport = () => {
    if (!selectedFile) {
      showToast("error", "Please select a file to import");
      return;
    }

    uploadBooks(selectedFile, {
      onSuccess: (data) => {
        setResult(data);
        if (data.inserted > 0 || data.copies_added > 0) {
          showToast(
            "success",
            `Imported ${data.inserted} new books and ${data.copies_added} copies`,
          );
        } else {
          showToast("info", "Nothing new to import");
        }
        onUploadSuccess?.();
      },
      onError: (error: any) => {
        showToast("error", error?.message || "Failed to import books");
      },
    });
  };

  const handleDownloadTemplate = (format: ImportTemplateFormat) => {
    downloadTemplate(format, {
      onSuccess: (blob) => downloadBlob(blob, `book_import_template.${format}`),
      onError: (error: any) =>
        showToast("error", error?.message || "Failed to download the template"),
    });
  };

  const handleDownloadSkipped = () => {
    if (result?.skipped.length) {
      downloadBlob(
        skippedRowsToCsv(result.skipped),
        "book_import_skipped_rows.csv",
      );
    }
  };

  const handleImportAnother = () => {
    setResult(null);
    setSelectedFile(null);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleDropZoneClick = () => {
    if (!isPending && !selectedFile) {
      document.getElementById("file-input")?.click();
    }
  };

  const handleCancel = () => {
    setResult(null);
    setSelectedFile(null);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    onOpenChange(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={handleCancel}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-lg shadow-lg w-210 mx-4 p-6 ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-6">
          <h2 id="modal-title" className="text-2xl font-semibold ">
            Import Books
          </h2>
          <button
            onClick={handleCancel}
            className="p-1 rounded-md cursor-pointer absolute right-6"
            aria-label="Close modal"
            disabled={isPending}
          >
            <CircleX className="h-6 w-6" />
          </button>
        </div>

        {result ? (
          <ImportResultView
            result={result}
            onDownloadSkipped={handleDownloadSkipped}
            onImportAnother={handleImportAnother}
            onDone={handleCancel}
          />
        ) : (
          <div className="space-y-6 ">
            <div className="flex flex-col justify-center items-center">
              <div
                className={`relative flex flex-col justify-center w-190 h-53 border-2 rounded-lg text-center bg-primary/5 transition-colors ${
                  dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                } ${!selectedFile && !isPending ? "cursor-pointer" : "cursor-default"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleDropZoneClick}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileChange}
                  disabled={isPending}
                  className="hidden"
                />
                {isPending ? (
                  <>
                    <Loader2 className="mx-auto h-6 w-6 mb-4 animate-spin" />
                    <p className="text-lg font-medium text-blue-600">
                      Uploading...
                    </p>
                  </>
                ) : selectedFile ? (
                  <div>
                    <p className="text-lg font-medium mb-2 text-green-600">
                      File Selected
                    </p>
                    <p className="text-sm text-gray-600">{selectedFile.name}</p>
                  </div>
                ) : (
                  <div>
                    <Files className="mx-auto h-6 w-6 mb-4" />
                    <p className="text-base font-medium mb-2">
                      Drop files here
                    </p>
                    <p className="text-base font-medium mb-4">or</p>
                    <p className="text-base font-medium">
                      Choose a file to upload (CSV or Excel .xlsx)
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      The import template and the library&apos;s accession
                      register are both accepted.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pr-4 pl-4">
              <div className="flex gap-3">
                <button
                  onClick={handleImport}
                  disabled={!selectedFile || isPending}
                  className="px-4 py-2 button-border text-white text-sm font-medium rounded-sm w-30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    "Import"
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isPending}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm w-30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span>Download template:</span>
                {(["xlsx", "csv"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => handleDownloadTemplate(format)}
                    disabled={isPending || isDownloadingTemplate}
                    className="underline text-black rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {format === "xlsx" ? "Excel" : "CSV"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ImportResultViewProps {
  result: BookImportResult;
  onDownloadSkipped: () => void;
  onImportAnother: () => void;
  onDone: () => void;
}

function ImportResultView({
  result,
  onDownloadSkipped,
  onImportAnother,
  onDone,
}: ImportResultViewProps) {
  const stats = [
    { label: "New books", value: result.inserted },
    { label: "Existing books with new copies", value: result.books_updated },
    { label: "Copies added", value: result.copies_added },
    { label: "Duplicates ignored", value: result.duplicates_ignored },
    { label: "Rows skipped", value: result.skipped.length },
  ];
  const preview = result.skipped.slice(0, SKIPPED_PREVIEW_LIMIT);

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 text-center">
        {result.format === "register"
          ? "Read as the library accession register (one row per copy)."
          : "Read as the book import template (one row per book)."}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-primary/5 p-3 text-center"
          >
            <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {result.skipped.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            Skipped rows
            {result.skipped.length > preview.length &&
              ` (showing ${preview.length} of ${result.skipped.length})`}
          </p>
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-left">
                  <th className="px-2 py-1 font-medium">Sheet</th>
                  <th className="px-2 py-1 font-medium">Row</th>
                  <th className="px-2 py-1 font-medium">Title</th>
                  <th className="px-2 py-1 font-medium">Reason</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((skip, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 align-top"
                  >
                    <td className="px-2 py-1 whitespace-nowrap">
                      {skip.sheet ?? "-"}
                    </td>
                    <td className="px-2 py-1 tabular-nums">
                      {skip.row ?? "-"}
                    </td>
                    <td className="px-2 py-1">{skip.book_title}</td>
                    <td className="px-2 py-1">{skip.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pr-4 pl-4">
        <div className="flex gap-3">
          <button
            onClick={onDone}
            className="px-4 py-2 button-border text-white text-sm font-medium rounded-sm w-30 cursor-pointer"
          >
            Done
          </button>
          <button
            onClick={onImportAnother}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm cursor-pointer"
          >
            Import another file
          </button>
        </div>
        {result.skipped.length > 0 && (
          <button
            onClick={onDownloadSkipped}
            className="text-xs underline text-black rounded font-semibold cursor-pointer"
          >
            Download skipped rows (CSV)
          </button>
        )}
      </div>
    </div>
  );
}
