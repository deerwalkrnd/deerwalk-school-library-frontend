"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { CircleX } from "lucide-react";

interface AddGenreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditFineModal({ open, onOpenChange }: AddGenreModalProps) {
  const [fine, setFine] = useState("");
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (open) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setAnimationClass("animate-slide-down");
      });
      return () => clearTimeout(timer);
    } else {
      setAnimationClass("animate-slide-up");
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log("Saving fine", fine);
    onOpenChange(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-sm shadow-lg  w-127.5 h-69 mx-4 p-4 overflow-y-auto no-scrollbar ${animationClass} `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-fineamount"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <h2
              id="modal-fineamount"
              className="text-2xl font-semibold text-black"
            >
              Edit Fine Amount
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
                htmlFor="fine-amount"
                className="block text-sm font-medium text-black"
              >
                Set a new fine amount
              </label>
              <input
                id="fine-amount"
                type="text"
                value={fine}
                onChange={(e) => setFine(e.target.value)}
                placeholder="Enter fine amount..."
                className="w-full px-3 py-2 bg-[#EA5D0E0D] border border-gray-300 rounded-sm shadow-sm text-sm text-[#747373]"
              />
            </div>

            <div className="flex gap-3 w-62.5 pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 w-30 button-border text-white text-sm font-medium rounded-sm"
              >
                Save
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 w-30 border text-gray-700 text-sm font-medium rounded-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
