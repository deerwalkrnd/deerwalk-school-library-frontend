import React from "react";

interface ReviewModalContainerProps {
  children: React.ReactNode;
}

export const ReviewModalContainer = ({
  children,
}: ReviewModalContainerProps) => {
  return <div className="p-10">{children}</div>;
};
