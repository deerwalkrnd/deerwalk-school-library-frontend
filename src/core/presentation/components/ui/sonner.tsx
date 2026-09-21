"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

// The app ships a single light theme, so pin the toaster to it. Leaving this
// on "system" made toasts render dark for anyone whose OS is set to dark.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
