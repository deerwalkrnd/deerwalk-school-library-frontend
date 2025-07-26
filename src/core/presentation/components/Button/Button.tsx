import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick} // ✅ properly passed
      className={cn(
        `cursor-pointer bg-primary text-white font-semibold p-3 rounded-md`,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
