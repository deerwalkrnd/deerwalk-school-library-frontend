import React from "react";

interface ReviewModalWrapperProps {
  children: React.ReactNode;
  showModal: boolean;
  animationClass: string;
  onAnimationEnd: () => void;
  onBackdropClick: () => void;
}

export const ReviewModalWrapper = ({
  children,
  showModal,
  animationClass,
  onAnimationEnd,
  onBackdropClick,
}: ReviewModalWrapperProps) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onBackdropClick} />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto ${animationClass} mx-4 sm:mx-6 md:mx-10`}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    </div>
  );
};
