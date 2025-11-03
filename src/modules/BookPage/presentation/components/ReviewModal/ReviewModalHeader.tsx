import React from "react";
import { CircleX } from "lucide-react";

interface ReviewModalHeaderProps {
  onClose: () => void;
}

export const ReviewModalHeader = ({ onClose }: ReviewModalHeaderProps) => {
  return (
    <div className="mb-6 flex items-start justify-between">
      <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-center flex-1">
        View Reviews
      </h1>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <CircleX className="w-6 h-6" />
      </button>
    </div>
  );
};
