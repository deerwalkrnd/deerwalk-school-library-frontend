"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { Files, CircleX, Loader2 } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";
import { useBulkUploadUsers } from "@/modules/Librarian/Users/application/userUseCase";

interface ImportUsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess?: () => void;
}

export function ImportUsersModal({
  open,
  onOpenChange,
  onUploadSuccess,
}: ImportUsersModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const { mutate: uploadUsers, isPending } = useBulkUploadUsers();

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
        useToast("error", "Please upload a CSV or Excel file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
      } else {
        useToast("error", "Please upload a CSV or Excel file");
      }
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const validExtensions = [".csv", ".xls", ".xlsx"];

    return (
      validTypes.includes(file.type) ||
      validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
    );
  };

  const handleImport = () => {
    if (!selectedFile) {
      useToast("error", "Please select a file to import");
      return;
    }
    uploadUsers(selectedFile, {
      onSuccess: (data: any) => {
        if (data?.inserted > 0) {
          useToast("success", `${data.inserted} users imported successfully`);
        }

        if (data?.skipped && data.skipped.length > 0) {
          const skipReasons = data.skipped
            .map(
              (skip: any) =>
                `Row ${skip.row}: ${skip.reason || skip.error || "Unknown error"}`,
            )
            .join("\n");
          useToast(
            "error",
            `${data.skipped.length} users skipped:\n${skipReasons}`,
          );
        }

        if (
          data?.inserted === 0 &&
          (!data?.skipped || data.skipped.length === 0)
        ) {
          useToast("error", "No users were imported");
        }

        handleCancel();
        onUploadSuccess?.();
      },
      onError: (error: any) => {
        useToast("error", error?.message || "Failed to import users");
      },
    });
  };

  const handleDownloadTemplate = () => {
    window.location.href = "/user_import_template.csv";
  };

  const handleDropZoneClick = () => {
    if (!isPending && !selectedFile) {
      document.getElementById("user-file-input")?.click();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById(
      "user-file-input",
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
    onOpenChange(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 z-50 right-0 bottom-0 left-0 md:left-64 flex items-center justify-center">
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
            Import Users
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

        <div className="space-y-6 ">
          <div className="flex flex-col justify-center items-center">
            <div
              className={`relative flex flex-col justify-center w-190 h-53 border-2 rounded-lg text-center bg-[#EA5D0E0D] transition-colors ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
              } ${!selectedFile && !isPending ? "cursor-pointer" : "cursor-default"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleDropZoneClick}
            >
              <input
                id="user-file-input"
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
                  <p className="text-base font-medium mb-2">Drop files here</p>
                  <p className="text-base font-medium mb-4">or</p>
                  <p className="text-base font-medium">
                    Choose a file to upload (CSV, xlsx)
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
            <button
              onClick={handleDownloadTemplate}
              disabled={isPending}
              className="text-xs underline text-black rounded font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download Template File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
