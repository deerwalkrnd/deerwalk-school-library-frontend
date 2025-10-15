import { useState, useRef } from "react";

async function uploadImage(file: File): Promise<string> {
  // const fd = new FormData();
  // fd.append("file", file);
  // const res = await fetch(`/api/upload?type=BOOK_COVER`, {
  //   method: "POST",
  //   body: fd,
  // });
  // const { url } = await res.json();
  const url =
    "https://unsplash.com/photos/a-person-with-elaborate-beaded-dreadlocks-and-a-wide-smile-n0VYjRD6_eI";
  return url;
}

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
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
    return await uploadImage(selectedFile);
  };

  return {
    selectedFile,
    isDragging,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleRemoveFile,
    uploadFile,
  };
}
