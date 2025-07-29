import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Button = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode | string;
}) => {
  return (
    <button
      className={cn(
        `cursor-pointer button-border bg-primary  text-white font-semibold p-3 rounded-md`,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
