"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, CircleX } from "lucide-react";

interface AddBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBookModal({ open, onOpenChange }: AddBookModalProps) {
  const [bookCount, setBookCount] = useState("2");
  const [bookType, setBookType] = useState("academic");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (open) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setAnimationClass("animate-slide-down");
      });
      return () => clearTimeout(timer);
    } else {
      setAnimationClass("animate-slide-up");
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderBookFields = () => {
    const fields = [];
    const count = Number(bookCount) || 0;
    for (let i = 1; i <= count; i++) {
      fields.push(
        <div key={i} className="space-y-2">
          <label
            htmlFor={`book-${i}`}
            className="block text-sm font-medium text-[#747373]"
          >
            Book {i}
          </label>
          <input
            id={`book-${i}`}
            placeholder="dss_book_id"
            className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
          />
        </div>,
      );
    }
    return fields;
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-1240px">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-210 h-210 overflow-y-auto no-scrollbar ${animationClass} `}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 className="text-2xl font-semibold text-black flex items-center">
            Edit Book
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 absolute right-6 hover:text-gray-600 transition-colors"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>
        <div className="p-10 space-y-6 w-210 ">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-black"
              >
                Title
              </label>
              <input
                id="title"
                placeholder="Title"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-black"
              >
                Author
              </label>
              <input
                id="author"
                placeholder="Author"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-[#747373]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="publication"
                className="block text-sm font-medium text-black"
              >
                Publication
              </label>
              <input
                id="publication"
                placeholder="Publication"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-[#747373]"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="isbn"
                className="block text-sm font-medium text-black"
              >
                ISBN
              </label>
              <input
                id="isbn"
                placeholder="ISBN"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-[#747373]"
              />
            </div>
          </div>
          <hr className="border-gray-200" />
          <div className="space-y-3 w-190">
            <div className="flex gap-8">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="academic"
                  name="bookType"
                  value="academic"
                  checked={bookType === "academic"}
                  onChange={(e) => setBookType(e.target.value)}
                  className="h-4 w-4 accent-black border-gray-300"
                />
                <label
                  htmlFor="academic"
                  className="text-xs font-medium text-black"
                >
                  Academic
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="non-academic"
                  name="bookType"
                  value="non-academic"
                  checked={bookType === "non-academic"}
                  onChange={(e) => setBookType(e.target.value)}
                  className="h-4 w-4 accent-black border-gray-300"
                />
                <label
                  htmlFor="non-academic"
                  className="text-xs font-medium text-black"
                >
                  Non-Academic
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="reference"
                  name="bookType"
                  value="reference"
                  checked={bookType === "reference"}
                  onChange={(e) => setBookType(e.target.value)}
                  className="h-4 w-4 accent-black border-gray-300"
                />
                <label
                  htmlFor="reference"
                  className="text-xs font-medium text-black"
                >
                  Reference
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {bookType === "non-academic" && (
              <div className="space-y-2">
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-black"
                >
                  Genre
                </label>
                <input
                  id="genre"
                  placeholder="Romance, Horror"
                  className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-[#747373] text-sm font-medium bg-[#EA5D0E0D]"
                />
              </div>
            )}
            {(bookType === "academic" || bookType === "reference") && (
              <div className="space-y-2">
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-black"
                >
                  Class
                </label>
                <input
                  id="class"
                  placeholder="1,2,...10"
                  className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-[#747373] text-sm font-medium bg-[#EA5D0E0D]"
                />
              </div>
            )}
          </div>
          <hr className="border-gray-200" />
          <div className="space-y-4 w-190">
            <div className="flex flex-col justify-start gap-4">
              <label
                htmlFor="book-count"
                className="text-sm font-medium text-black"
              >
                How many books are you uploading?
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="book-count"
                  type="string"
                  value={bookCount}
                  onChange={(e) => setBookCount(e.target.value)}
                  className="w-45 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] text-sm font-medium"
                  min="1"
                />
                <button className="px-4 py-2 border button-border rounded-sm text-sm font-semibold w-34 cursor-pointer">
                  Submit
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">{renderBookFields()}</div>
          </div>
          <hr className="border-gray-200" />
          <div className="space-y-2 w-190 h-53">
            <label className="block text-sm font-medium text-black">
              Cover Photo
            </label>
            <div
              className={`border-2 border-gray-300 rounded-sm p-18 text-center cursor-pointer transition-colors ${
                isDragging ? "border-black bg-gray-100" : "bg-[#EA5D0E0D]"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
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
                      handleRemoveFile();
                    }}
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
          <div className="flex gap-3 pt-4 pb-10">
            <button className="px-3 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-30">
              Confirm Edit
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-medium text-black bg-white w-30"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
