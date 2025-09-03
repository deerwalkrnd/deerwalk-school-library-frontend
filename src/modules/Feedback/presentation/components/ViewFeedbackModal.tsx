"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { CircleX } from "lucide-react";
import { useUpdateFeedback } from "../../application/feedbackUseCase";

interface ViewFeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Pre-filled data props
  initialName?: string;
  id: number;
  initialStudentMail?: string;
  initialSubject?: string;
  initialFeedback?: string;
  initialMarkedAsFilled?: boolean;
}

export function ViewFeedbackModal({
  open,
  onOpenChange,
  id,
  initialName = "John Doe",
  initialStudentMail = "Jane.Smith@deerwalk.edu.np",
  initialSubject = "Mathematics",
  initialFeedback = "Student shows excellent understanding of algebraic concepts and demonstrates strong problem-solving skills. Needs to work on showing more detailed steps in calculations.",
  initialMarkedAsFilled = false,
}: ViewFeedbackModalProps) {
  const [name, setName] = useState(initialName);
  const [studentMail, setStudentMail] = useState(initialStudentMail);
  const [subject, setSubject] = useState(initialSubject);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [markedAsFilled, setMarkedAsFilled] = useState(initialMarkedAsFilled);
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

  const handleSave = () => {
    useUpdateFeedback(id, { subject, feedback });
    console.log("Saving feedback:", {
      name,
      studentMail,
      subject,
      feedback,
      markedAsFilled,
    });

    onOpenChange(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="fixed inset-0 bg-opacity-50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white rounded-sm shadow-lg  mx-4 p-4  sm:min-w-lg md:min-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar ${animationClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <h2 id="modal-title" className="text-2xl font-semibold text-black">
              View Feedback
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="space-y-2">
                <label
                  htmlFor="feedback-name"
                  className="block text-sm font-bold text-black"
                >
                  Name
                </label>
                <p>{name}</p>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="feedback-student"
                  className="block text-sm font-bold text-black "
                >
                  Student ID/Email:
                </label>
                <p className="text-wrap">{studentMail}</p>
              </div>
            </div>
            <hr />
            <div className="space-y-2">
              <label
                htmlFor="feedback-subject"
                className="block text-sm font-medium text-black"
              >
                Subject
              </label>
              <input
                id="feedback-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled
                className="w-full px-3 py-2 item-text-area rounded-sm shadow-sm text-sm  cursor-not-allowed"
              />
            </div>

            <div className="space-y-2 ">
              <label
                htmlFor="feedback-textarea"
                className="block text-sm font-medium text-black"
              >
                Feedback/Subject
              </label>
              <textarea
                id="feedback-textarea"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                disabled
                className="w-full px-3 py-2   item-text-area rounded-sm shadow-sm text-sm  resize-vertical cursor-not-allowed"
                placeholder="Enter feedback..."
              />
            </div>

            <div className="flex items-center space-x-2 ">
              <input
                id="mark-as-filled"
                type="checkbox"
                checked={markedAsFilled}
                onChange={(e) => setMarkedAsFilled(e.target.checked)}
                className="h-4 w-4  border-gray-300 rounded"
              />
              <label
                htmlFor="mark-as-filled"
                className="text-sm font-medium text-black cursor-pointer"
              >
                Mark as filled
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 w-35 button-border text-white text-sm font-semibold rounded-sm"
              >
                Save
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 w-25 border  text-sm font-semibold rounded-sm"
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
