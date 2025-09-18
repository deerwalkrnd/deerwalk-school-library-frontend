import { cn } from "@/core/lib/utils";
import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  className,
  children,
  onClick,
  disabled,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        `cursor-pointer bg-primary text-white font-semibold button-border p-3 rounded-md`,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
