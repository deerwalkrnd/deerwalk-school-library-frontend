import { RefObject } from "react";
import { Upload, CircleX } from "lucide-react";

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
  return (
    <div className="space-y-2 w-190 h-53">
      <label className="block text-sm font-medium text-black">
        Cover Photo
      </label>
      <label
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-sm h-44 cursor-pointer bg-primary/5 overflow-hidden ${
          isDragging ? "border-black bg-gray-100" : "border-gray-300"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept="image/*"
        />
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Cover preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 text-white text-xs flex flex-col items-center justify-center">
              <span className="px-4 text-center line-clamp-2">
                {selectedFile?.name}
              </span>
              <span className="text-[10px] mt-1">Click or drop to replace</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveFile();
              }}
              type="button"
              className="absolute top-2 right-2 bg-white/80 text-gray-700 rounded-full p-1 shadow-sm hover:bg-white"
              aria-label="Remove cover image"
            >
              <CircleX className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <Upload className="mx-auto h-8 w-8 mb-2 text-gray-500" />
            <p className="text-xs font-medium text-gray-600">
              Click or drag an image to upload
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              PNG, JPG up to 10MB
            </p>
          </>
        )}
      </label>
    </div>
  );
}
