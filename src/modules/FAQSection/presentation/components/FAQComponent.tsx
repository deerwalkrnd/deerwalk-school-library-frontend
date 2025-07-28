"use client";

import { useState } from "react";
import { FAQEntity } from "@/modules/FAQSection/domain/entities/FAQEntity";

interface Props {
  faq: FAQEntity;
}

export default function FAQComponent({ faq }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className="w-full max-w-md lg:max-w-full border border-[#EA5D0E33] bg-[#EA5D0E1A] rounded-[8px] px-6 py-4 gap-3 cursor-pointer transition-colors duration-300 hover:bg-[#fce7e1]"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm sm:text-base font-medium text-black">
          {faq.question}
        </span>

        <div className="relative w-4 h-4">
          <span
            className={`absolute inset-0 mx-auto my-auto block h-[1.5px] w-4 bg-black
                        transition-opacity duration-300 ease-in-out
                        ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute inset-0 mx-auto my-auto block w-[1.5px] h-4 bg-black
                        transform transition-transform duration-300 ease-in-out
                        ${open ? "rotate-90" : "rotate-0"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
      >
        <div className="text-sm text-gray-700 space-y-1">
          {faq.answer.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
