"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { CircleX } from "lucide-react";

interface AddQuoteModalprops {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddQuoteModal({ open, onOpenChange }: AddQuoteModalprops) {
  const [title, setTitle] = useState("");
  const [animationClass, setanimationClass] = useState("");

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-sm shadow-lg  w-127.5 mx-4 p-4 h-137 overflow-y-auto no-scrollbar ${animationClass} `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <h2 id="modal-title"></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
