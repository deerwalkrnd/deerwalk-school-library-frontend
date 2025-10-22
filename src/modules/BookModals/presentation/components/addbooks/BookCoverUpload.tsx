import { useRef } from "react";
import { Upload, CircleX } from "lucide-react";

interface BookCoverUploadProps {
  selectedFile: File | null;
  isDragging: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onRemoveFile: () => void;
}

export function BookCoverUpload({
  selectedFile,
  isDragging,
  onFileChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemoveFile,
}: BookCoverUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2 w-190 h-53">
      <label className="block text-sm font-medium text-black">
        Cover Photo
      </label>
      <div
        className={`border-2 border-gray-300 rounded-sm p-18 text-center cursor-pointer ${
          isDragging ? "border-black bg-gray-100" : "bg-[#EA5D0E0D]"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept="image/*"
        />
        {selectedFile ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm font-medium text-black">
              {selectedFile.name}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile();
              }}
              type="button"
              className="text-gray-500 hover:text-gray-700"
            >
              <CircleX className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-6 w-6 mb-2 text-black" />
            <p className="text-xs font-medium text-black">
              Click to upload photo
            </p>
          </>
        )}
      </div>
    </div>
  );
}
