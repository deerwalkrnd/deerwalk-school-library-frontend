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
    <button className={cn(className, `cursor-pointer`)}>{children}</button>
  );
};

export default Button;
