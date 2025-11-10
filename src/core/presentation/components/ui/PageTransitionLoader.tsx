import React from "react";

export function PageTransitionLoader() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              aria-hidden="true"
              className="size-3 rounded-full bg-primary/80 animate-bounce"
              style={{ animationDelay: `${dot * 0.18}s` }}
            />
          ))}
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.6em] text-muted-foreground/80">
          Loading
        </span>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        Loading
      </span>
    </div>
  );
}
