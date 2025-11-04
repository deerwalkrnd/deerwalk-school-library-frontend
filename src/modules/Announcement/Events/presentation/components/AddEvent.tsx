"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { CircleX, MapPin, Upload } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { EventRequest } from "../../domain/entities/EventEntity";
import { addEvent } from "../../application/eventUseCase";
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
  const [banner, setBanner] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
      setName("");
      setDescription("");
      setDate("");
      setVenue("");
      setBanner(null);
      setImageUrl("");
      document.body.style.overflow = "unset";
    }
  }, [open]);

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

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBanner(file);
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setBanner(file);
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !date) {
      useToast("error", "Please fill in all required fields");
      return;
    }

    async function uploadImage(file: File): Promise<string> {
      // const fd = new FormData();
      // fd.append("file", file);
      // console.log("submitting file first");
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

    // const image_url = await uploadImage(file);

    const payload: EventRequest = {
      name,
      event_date: date,
      image_url: imageUrl || "",
      description,
      venue,
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        setName("");
        setDescription("");
        setDate("");
        setVenue("");
        setBanner(null);
        setImageUrl("");
        useToast("success", "Event added successfully");
        onOpenChange(false);
      },
      onError: (error: any) => {
        useToast(
          "error",
          error?.response?.data?.message || "Failed to add event",
        );
      },
    });
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 w-107">
              <label
                htmlFor="event-name"
                className="block text-sm font-medium text-black"
              >
                Event's Name
              </label>
              <input
                id="event-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Book Giveaway"
                className="w-140 px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="event-details"
                className="block text-sm font-medium text-black"
              >
                Event Details
              </label>
              <textarea
                id="event-details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder resize-vertical"
                rows={4}
                required
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
                <div className="relative">
                  <input
                    id="event-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-primary/5 border border-gray-300 rounded-sm shadow-sm text-sm text-placeholder"
                    required
                  />
                </div>
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
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-20 text-center bg-primary/5 cursor-pointer",
                )}
                onDragEnter={(e) => {
                  e.preventDefault();
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("event-banner")?.click()}
              >
                <input
                  id="event-banner"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-6 w-6 mb-2" />
                <p className="text-xs text-gray-600 font-medium">
                  {banner ? banner.name : "Click to upload"}
                </p>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className={cn(
                  "flex items-center justify-center w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-sm",
                  "text-sm leading-none tracking-tight text-shadow-sm",
                )}
              >
                {mutation.isPending ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
