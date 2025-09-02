"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { Files, CircleX } from "lucide-react";

interface ImportBooksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportBooksModal({
  open,
  onOpenChange,
}: ImportBooksModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

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
        onOpenChange(false);
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
        console.log("File dropped:", file);
      } else {
        alert("Please upload a CSV or Excel file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        setSelectedFile(file);
        console.log("File selected:", file);
      } else {
        alert("Please upload a CSV or Excel file");
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
    if (selectedFile) {
      console.log("Importing file:", selectedFile);
      onOpenChange(false);
    } else {
      alert("Please select a file to import");
    }
  };

  const handleDownloadTemplate = () => {
    console.log("Downloading template file");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
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
            onClick={() => onOpenChange(false)}
            className="p-1 rounded-md cursor-pointer absolute right-6"
            aria-label="Close modal"
          >
            <CircleX className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6 ">
          <div className="flex flex-col justify-center items-center">
            <div
              className={`relative flex flex-col justify-center w-190 h-53 border-2 rounded-lg text-center  bg-[#EA5D0E0D] transition-colors cursor-pointer ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Files className="mx-auto h-6 w-6 mb-4" />
              {selectedFile ? (
                <div>
                  <p className="text-lg font-medium mb-2 text-green-600">
                    File Selected
                  </p>
                  <p className="text-sm text-gray-600">{selectedFile.name}</p>
                </div>
              ) : (
                <div>
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
                className="px-4 py-2 button-border text-white text-sm font-medium rounded-sm w-30 cursor-pointer"
              >
                Import
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm w-30 cursor-pointer"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="text-xs underline text-black rounded font-semibold cursor-pointer"
            >
              Download Template File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
