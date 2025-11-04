"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { CircleX, Upload, X, MapPin } from "lucide-react";
import { cn } from "@/core/lib/utils";
import Button from "@/core/presentation/components/Button/Button";
import { addEvent } from "../../application/eventUseCase";
import { EventRequest } from "../../domain/entities/EventEntity";
import { useToast } from "@/core/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEventModal({ open, onOpenChange }: AddEventModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const queryClient = useQueryClient();
  const mutation = addEvent(queryClient);

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
      resetForm();
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onOpenChange(false);
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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setDate("");
    setVenue("");
    setFile(null);
    setPreviewUrl(null);
    setDragActive(false);
  };

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
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setPreviewUrl(URL.createObjectURL(droppedFile));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
  };

  async function uploadImage(file: File): Promise<string> {
    // const fd = new FormData();
    // fd.append("file", file);
    // const res = await fetch(`/api/upload?type=EVENT_BANNER`, {
    //   method: "POST",
    //   body: fd,
    // });
    // if (!res.ok) {
    //   const msg = await res.text();
    //   throw new Error(`Upload failed: ${res.status} ${msg}`);
    // }
    // const { url } = await res.json();
    let url =
      "https://unsplash.com/photos/a-person-with-elaborate-beaded-dreadlocks-and-a-wide-smile-n0VYjRD6_eI";
    return url;
  }

  const handleSave = async () => {
    try {
      if (!name.trim() || !description.trim() || !date.trim()) {
        useToast("error", "Please fill in all required fields");
        return;
      }
      if (!file) {
        useToast("error", "Event banner is required");
        return;
      }

      const image_url = await uploadImage(file);

      const payload: EventRequest = {
        name,
        event_date: date,
        image_url,
        description,
        venue,
      };

      await mutation.mutateAsync(payload, {
        onSuccess: () => {
          useToast("success", "Event added successfully");
          resetForm();
          onOpenChange(false);
        },
        onError: (error: any) => {
          useToast("error", error?.message || "Failed to add event");
        },
      });
    } catch (err: any) {
      console.error("Failed to save event:", err?.message || err);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className={`relative bg-white rounded-sm shadow-lg w-160 mx-4 p-4 h-184 overflow-y-auto no-scrollbar ${animationClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <h2 id="modal-title" className="text-2xl font-semibold text-black">
              Add Event
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-sm transition-colors absolute right-6"
              aria-label="Close modal"
            >
              <CircleX className="h-6 w-6 text-black cursor-pointer" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="space-y-2 w-107">
              <label
                htmlFor="event-name"
                className="block text-sm font-medium text-black"
              >
                Event Name
              </label>
              <input
                id="event-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter event name..."
                className="w-140 px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="event-description"
                className="block text-sm font-medium text-black"
              >
                Description
              </label>
              <textarea
                id="event-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write about the event..."
                className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder resize-vertical"
                rows={4}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="event-date"
                  className="block text-sm font-medium text-black"
                >
                  Event Date
                </label>
                <input
                  id="event-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="event-venue"
                  className="block text-sm font-medium text-black"
                >
                  Venue
                </label>
                <div className="relative">
                  <input
                    id="event-venue"
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Auditorium"
                    className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
                  />
                  <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                Event Banner
              </label>
              {!file ? (
                <div
                  className={cn(
                    "relative border-2 border-dashed rounded-lg p-20 text-center bg-primary/5 cursor-pointer",
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300",
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    id="banner-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="pointer-events-none">
                    <Upload className="mx-auto h-6 w-6 mb-2" />
                    <p className="text-xs text-[#474747] font-semibold">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative border-2 border-gray-300 rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center gap-4">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Button
                onClick={handleSave}
                disabled={mutation.isPending}
                className={cn(
                  "flex items-center justify-center w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-sm",
                  "text-sm leading-none tracking-tight text-shadow-sm",
                )}
              >
                {mutation.isPending ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
