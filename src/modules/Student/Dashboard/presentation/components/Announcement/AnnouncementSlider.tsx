import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  ImageIcon,
} from "lucide-react";
import { EventResponse } from "@/modules/Announcement/Events/domain/entities/EventEntity";

interface AnnouncementSliderProps {
  events: EventResponse[];
}

export const AnnouncementSlider: React.FC<AnnouncementSliderProps> = ({
  events,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle image URL with placeholder
  const getImageUrl = (imageUrl?: string) => {
    if (imageUrl && imageUrl.trim() !== "" && imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return "/placeholder.png";
  };

  const currentEvent = events[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (events.length > 1 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, events.length, isPaused]);

  // Hover handlers to pause auto-slide
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="w-full bg-gradient-to-r from-orange-500 to-orange-700 h-72 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-full">
        <div className="w-1/3 relative bg-gray-200">
          <img
            src={getImageUrl(currentEvent.image_url)}
            alt={currentEvent.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.png";
              target.className = "w-full h-full object-contain bg-gray-100";
            }}
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              target.className = "w-full h-full object-cover";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>

          {/* Show placeholder icon if image fails to load */}
          {(!currentEvent.image_url ||
            currentEvent.image_url.trim() === "" ||
            currentEvent.image_url.startsWith("blob:")) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <ImageIcon className="w-16 h-16" />
                <span className="text-sm font-medium">No image</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center p-8 text-white">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {currentEvent.name}
            </h2>
            <p className="text-lg opacity-90">{currentEvent.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">
                {formatDate(currentEvent.event_date)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">{currentEvent.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {events.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {events.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
