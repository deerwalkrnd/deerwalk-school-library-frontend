import { useState, useRef } from "react";

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  // Cookies are automatically sent with same-origin requests
  const res = await fetch(`/api/upload?type=BOOK_COVER`, {
    method: "POST",
    credentials: "include", // Ensure cookies are sent
    body: fd,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed: ${res.status} - ${errorText}`);
  }

  const data = await res.json();

  if (!data.url) {
    throw new Error("No URL returned from upload");
  }

  return data.url;
}

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadFile = async (): Promise<string> => {
    if (!selectedFile) return "";

    setIsUploading(true);
    try {
      const url = await uploadImage(selectedFile);
      return url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    selectedFile,
    isDragging,
    isUploading,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleRemoveFile,
    uploadFile,
  };
}
