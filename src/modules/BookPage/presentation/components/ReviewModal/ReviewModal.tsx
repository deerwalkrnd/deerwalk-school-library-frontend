"use client";

import React, { useEffect, useState } from "react";
import { ReviewModalContent } from "./ReviewModalContent";
import { useMarkSpam } from "@/modules/Reviews/application/ReviewUseCase";
import { useToast } from "@/core/hooks/useToast";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: number;
}

export const ReviewModal = ({ id, open, onOpenChange }: ReviewModalProps) => {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showSpam, setShowSpam] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const markSpamMutation = useMarkSpam();

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId !== null &&
        !(event.target as Element).closest(".dropdown-container")
      ) {
        setOpenDropdownId(null);
      }
      if (
        showSortDropdown &&
        !(event.target as Element).closest(".sort-dropdown")
      ) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId, showSortDropdown]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  const handleMarkAsSpam = async (reviewId: number) => {
    try {
      await markSpamMutation.mutateAsync({
        id: reviewId,
        payload: { is_spam: true },
      });
      useToast("success", "Review marked as spam successfully!");
      setOpenDropdownId(null);
    } catch (error: any) {
      useToast("error", error?.message || "Failed to mark review as spam");
    }
  };

  const toggleDropdown = (reviewId: number) => {
    setOpenDropdownId(openDropdownId === reviewId ? null : reviewId);
  };

  const handleSortChange = (newSort: "newest" | "oldest") => {
    setSortBy(newSort);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="fixed inset-0 bg-black/30"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto ${animationClass} mx-4 sm:mx-6 md:mx-10`}
        onAnimationEnd={handleAnimationEnd}
      >
        <ReviewModalContent
          bookId={id}
          sortBy={sortBy}
          showSpam={showSpam}
          openDropdownId={openDropdownId}
          currentPage={currentPage}
          onClose={() => onOpenChange(false)}
          onSortChange={handleSortChange}
          onSpamToggle={() => setShowSpam(!showSpam)}
          onPageChange={setCurrentPage}
          onMarkAsSpam={handleMarkAsSpam}
          onToggleDropdown={toggleDropdown}
        />
      </div>
    </div>
  );
};
