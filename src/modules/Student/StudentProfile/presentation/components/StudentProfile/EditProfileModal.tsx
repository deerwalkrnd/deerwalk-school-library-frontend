"use client";

import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rollNumber: string;
  onRollNumberChange: (value: string) => void;
  graduatingYear: string;
  onGraduatingYearChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onOpenChange,
  rollNumber,
  onRollNumberChange,
  graduatingYear,
  onGraduatingYearChange,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

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

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className={`relative bg-white rounded-lg shadow-xl w-210 overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 className="text-2xl font-semibold text-black flex items-center">
            Edit Profile
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 absolute right-6 hover:text-gray-600"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-10 space-y-6 w-210">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="rollNumber"
                className="block text-sm font-medium text-black"
              >
                Roll Number
              </label>
              <Input
                id="rollNumber"
                type="number"
                value={rollNumber}
                onChange={(event) => onRollNumberChange(event.target.value)}
                placeholder="Enter roll number"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="graduationYear"
                className="block text-sm font-medium text-black"
              >
                Graduation Year
              </label>
              <Input
                id="graduationYear"
                value={graduatingYear}
                onChange={(event) => onGraduatingYearChange(event.target.value)}
                placeholder="Enter graduation year"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-36"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-semibold text-black bg-white w-30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
