"use client";

import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";

interface AddUsersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUsersModal({ open, onOpenChange }: AddUsersModalProps) {
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
        className={`relative bg-white rounded-lg shadow-xl w-210  overflow-y-auto no-scrollbar ${animationClass}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 className="text-2xl font-semibold text-black flex items-center">
            Add Student
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 absolute right-6 hover:text-gray-600"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>

        <div className="p-10 space-y-6 w-210">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="studentName"
                className="block text-sm font-medium text-black"
              >
                Student Name
              </label>
              <input
                id="studentName"
                placeholder="Enter student name"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rollNumber"
                className="block text-sm font-medium text-black"
              >
                Roll Number
              </label>
              <input
                type="number"
                id="rollNumber"
                placeholder="Enter roll number"
                className="w-93 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
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
              <select
                id="graduationYear"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              >
                <option value="">Select year</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 pb-10">
            <button className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-30">
              Add User
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-semibold text-black bg-white w-30"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
