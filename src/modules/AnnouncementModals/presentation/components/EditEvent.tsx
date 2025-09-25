"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { Upload, CircleX, Calendar, Clock, MapPin } from "lucide-react";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";

interface EditEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    name: string;
    details: string;
    date: string;
    time: string;
    venue: string;
    banner?: File | null;
  };
}

export function EditEventModal({
  open,
  onOpenChange,
  initialData,
}: EditEventModalProps) {
  const [isVisible, setIsVisible] = useState(open);
  const [animation, setAnimation] = useState<"in" | "out" | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [details, setDetails] = useState(initialData?.details || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [venue, setVenue] = useState(initialData?.venue || "");
  const [banner, setBanner] = useState<File | null>(
    initialData?.banner || null,
  );

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setAnimation("in");
    } else if (isVisible) {
      setAnimation("out");
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (animation === "out") {
      setIsVisible(false);
    }
    setAnimation(null);
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBanner(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, details, date, time, venue, banner });
    onOpenChange(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
        animation === "in" && "animate-fadeIn",
        animation === "out" && "animate-fadeOut",
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={cn(
          "bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative",
          animation === "in" && "animate-slideIn",
          animation === "out" && "animate-slideOut",
        )}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <CircleX size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Event’s Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-156 px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
              placeholder="Event name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373] resize-vertical"
              placeholder="Description"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Event Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
                  required
                />
                <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Venue</label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
                  placeholder="Venue"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Banner
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md h-32 cursor-pointer hover:bg-gray-50">
              <Upload className="h-6 w-6 text-gray-400 mb-1" />
              <span className="text-gray-500 text-sm">
                {banner ? banner.name : "Click to upload"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerUpload}
              />
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md"
          >
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
}
