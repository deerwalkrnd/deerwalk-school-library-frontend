import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

/** A light heading that groups related fields without boxing them in. */
export function FormSection({ title, children }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </h3>
      {children}
    </section>
  );
}
