"use client";

import { useState } from "react";
import { FAQEntity } from "@/modules/FAQSection/domain/entities/FAQEntity";

interface Props {
  faq: FAQEntity;
}

export default function FAQComponent({faq}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="w-full max-w-md border border-[#EA5D0E33] bg-[#EA5D0E1A] rounded-[8px] px-6 py-4 gap-3 cursor-pointer transition hover:bg-[#fce7e1]"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm sm:text-base font-medium text-black">
          {faq.question}
        </span>
        <span className="text-xl font-bold text-black">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="mt-3 text-sm text-gray-700 space-y-1">
          {faq.answer.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
