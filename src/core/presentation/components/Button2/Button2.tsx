import { cn } from "@/core/lib/utils";
import React from "react";
import Button from "@/core/presentation/components/Button/Button";

interface Button2Props extends React.ComponentProps<typeof Button> {}

const Button2 = ({ className, children, ...props }: Button2Props) => {
  return (
    <Button
      className={cn(
        "bg-primary text-white font-semibold button-border ml-auto flex flex-wrap items-center justify-center gap-1.5 w-32 h-8 rounded-sm shadow px-1 py-1",
        "font-sans text-sm font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Button2;
