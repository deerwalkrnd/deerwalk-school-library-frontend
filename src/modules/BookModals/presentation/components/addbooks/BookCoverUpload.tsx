import { RefObject } from "react";
import { ImageUp, X } from "lucide-react";

interface BookCoverUploadProps {
  selectedFile: File | null;
  previewUrl: string | null;
  isDragging: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  onRemoveFile: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function BookCoverUpload({
  selectedFile,
  previewUrl,
  isDragging,
  onFileChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemoveFile,
  fileInputRef,
}: BookCoverUploadProps) {
  const openPicker = () => fileInputRef.current?.click();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={previewUrl ? "Change cover image" : "Upload cover image"}
      onClick={openPicker}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPicker();
        }
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative flex h-32 items-center rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
        isDragging
          ? "border-primary bg-primary/10"
          : "border-gray-300 bg-primary/5 hover:border-gray-400"
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
        accept="image/*"
      />

      {previewUrl ? (
        <div className="flex w-full items-center gap-5 px-5">
          <img
            src={previewUrl}
            alt="Cover preview"
            className="h-24 w-[4.25rem] shrink-0 rounded-md border border-gray-200 bg-white object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-black">
              {selectedFile?.name ?? "Cover image"}
            </p>
            {selectedFile && (
              <p className="text-xs text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
            )}
            <p className="mt-2 text-xs font-medium text-primary">
              Change image
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile();
            }}
            aria-label="Remove cover image"
            className="self-start mt-3 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center text-center">
          <ImageUp className="mb-2 h-6 w-6 text-gray-500" />
          <p className="text-sm font-medium text-gray-700">
            Drop cover image here, or{" "}
            <span className="text-primary">browse</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG · Max 10 MB</p>
        </div>
      )}
    </div>
  );
}
