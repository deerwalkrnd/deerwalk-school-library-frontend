"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { CircleX, Calendar, Clock, MapPin, Upload } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEventModal({ open, onOpenChange }: AddEventModalProps) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [banner, setBanner] = useState<File | null>(null);

  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const [dragActive, setDragActive] = useState(false);

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

  if (!showModal) return null;

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setBanner(e.dataTransfer.files[0]);
      console.log("Banner dropped:", e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
      console.log("Banner selected:", e.target.files[0]);
    }
  };

  const handlePublish = () => {
    console.log("Publishing event:", {
      name,
      details,
      date,
      time,
      venue,
      banner,
    });
    onOpenChange(false);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        className={`relative bg-white rounded-lg shadow-lg w-[700px] mx-4 p-6 overflow-y-auto no-scrollbar ${animationClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="text-2xl font-semibold text-black">
            Add Event
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 rounded-sm transition-colors"
            aria-label="Close modal"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="event-name"
              className="block text-sm font-medium text-black"
            >
              Event’s Name
            </label>
            <input
              id="event-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Book Giveaway"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
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
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Description"
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-sm text-sm resize-vertical"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="event-time"
                className="block text-sm font-medium text-black"
              >
                Time
              </label>
              <div className="relative">
                <input
                  id="event-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
                />
                <Clock className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
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
                "relative border-2 border-dashed rounded-lg p-10 text-center cursor-pointer",
                dragActive
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 bg-gray-50",
              )}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
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
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="mx-auto h-6 w-6 mb-2 text-gray-500" />
              <p className="text-xs text-gray-600 font-medium">
                {banner ? banner.name : "Click to upload"}
              </p>
            </div>
          </div>
          <div>
            <Button
              onClick={handlePublish}
              className={cn(
                "flex items-center justify-center w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-sm",
                "text-sm leading-none tracking-tight text-shadow-sm",
              )}
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
