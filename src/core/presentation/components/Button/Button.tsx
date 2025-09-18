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
      onClick={onClick}
      className={cn(
        `cursor-pointer button-border bg-primary text-white font-semibold p-3 rounded`,
        className,
        // `cursor-pointer bg-primary text-white font-semibold button-border p-3 rounded`,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
