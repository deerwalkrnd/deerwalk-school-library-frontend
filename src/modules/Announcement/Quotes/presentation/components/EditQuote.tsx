// "use client";

// import { useState, useEffect } from "react";
// import type React from "react";
// import { CircleX } from "lucide-react";
// import Button from "@/core/presentation/components/Button/Button";
// import { cn } from "@/core/lib/utils";
// import { useToast } from "@/core/hooks/useToast";
// import { QuoteRequest } from "../../domain/entities/QuoteEntity";
// import { useUpdateQuote } from "../../application/quoteUseCase";
// import { Quotes } from "../../domain/entities/QuoteEntity";

// interface EditQuoteModalProps {
//   quotes: Quotes;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   initialTitle?: string;
//   initialQuote?: string;
// }

// export function EditQuoteModal({
//   open,
//   quotes,
//   onOpenChange,
//   initialTitle = "",
//   initialQuote = "",
// }: EditQuoteModalProps) {
//   const [title, setTitle] = useState(initialTitle);
//   const [quote, setQuote] = useState(initialQuote);

//   const [showModal, setShowModal] = useState(open);
//   const [animationClass, setAnimationClass] = useState("");

//   const mutation = useUpdateQuote();

//   useEffect(() => {
//     if (open) {
//       setShowModal(true);
//       setAnimationClass("animate-slide-down");
//       document.body.style.overflow = "hidden";
//     }
//     if(quotes){
//       setTitle(quotes?.author ?? "");
//       setQuote(quotes?.quote ?? "");
//     }
//       else {
//       setQuote("");
//       setTitle("");
//       setAnimationClass("animate-slide-up");
//       document.body.style.overflow = "unset";
//     }
//   }, [open]);

//   const handleAnimationEnd = () => {
//     if (!open) setShowModal(false);
//   };

//   if (!showModal) return null;

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && open) {
//         onOpenChange(false);
//       }
//     };

//     if (open) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [open, onOpenChange]);

//   const handleSave = () => {
//     console.log("Saving edited quote:", { title, quote });
//     onOpenChange(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload: QuoteRequest = {
//       id: quotes.id,
//       author: title,
//       quote: quote,
//     };
//     mutation.mutate(payload, {
//       onSuccess: () => {
//         useToast("success", "Quote updated successfully");
//         onOpenChange(false);
//       },
//       onError: (error: any) => {
//         useToast("error", error.message);
//       },
//     });
//   }

//   return (
//     <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
//       <div
//         className="fixed inset-0 bg-opacity-50"
//         onClick={() => onOpenChange(false)}
//         aria-hidden="true"
//       />

//       <div
//         className={`relative bg-white rounded-sm shadow-lg w-127.5 mx-4 p-4 h-137 overflow-y-auto no-scrollbar ${animationClass}`}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modal-title"
//         onClick={(e) => e.stopPropagation()}
//         onAnimationEnd={handleAnimationEnd}
//       >
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-6">
//             <h2 id="modal-title" className="text-2xl font-semibold text-black">
//               Edit Quote
//             </h2>
//             <button
//               onClick={() => onOpenChange(false)}
//               className="p-1 rounded-sm transition-colors absolute right-6"
//               aria-label="Close modal"
//             >
//               <CircleX className="h-6 w-6 text-black cursor-pointer" />
//             </button>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-2 w-107">
//               <label
//                 htmlFor="user"
//                 className="block text-sm font-medium text-black"
//               >
//                 Quote by
//               </label>
//               <input
//                 id="user"
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Name"
//                 className="w-full px-3 py-2 item-text-area rounded-sm shadow-sm text-sm resize-vertical"
//               />
//             </div>

//             <div className="space-y-2 w-107">
//               <label
//                 htmlFor="quote-input"
//                 className="block text-sm font-medium"
//               >
//                 Quote of the Day
//               </label>
//               <textarea
//                 id="quote-input"
//                 value={quote}
//                 onChange={(e) => setQuote(e.target.value)}
//                 placeholder="This is a wonderful quote..."
//                 className="w-full h-52 px-3 py-2 item-text-area rounded-sm shadow-sm text-sm resize-vertical"
//               />
//               <div>
//                 <Button>
//                   {mutation.isPending ? "Updating..." : "Update Quote"}
//                   className={cn(
//                     "flex items-center justify-center w-full mt-6",
//                     "text-sm leading-none tracking-tight text-shadow-sm",
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { useToast } from "@/core/hooks/useToast";
import Button from "@/core/presentation/components/Button/Button";
import { cn } from "@/core/lib/utils";
import { QuoteRequest, Quotes } from "../../domain/entities/QuoteEntity";
import { useUpdateQuote } from "../../application/quoteUseCase";

interface EditQuoteModalProps {
  quotes: Quotes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditQuoteModal({
  quotes,
  open,
  onOpenChange,
}: EditQuoteModalProps) {
  const [showModal, setShowModal] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const [author, setAuthor] = useState<string>("");
  const [quote, setQuote] = useState<string>("");

  const mutation = useUpdateQuote();

  // Handle modal open/close animations and populate form fields
  useEffect(() => {
    if (open) {
      setShowModal(true);
      setAnimationClass("animate-slide-down");
      document.body.style.overflow = "hidden";

      if (quotes) {
        setAuthor(quotes.author ?? "");
        setQuote(quotes.quote ?? "");
      }
    } else {
      setAnimationClass("animate-slide-up");
      document.body.style.overflow = "unset";
    }
  }, [open, quotes]);

  const handleAnimationEnd = () => {
    if (!open) setShowModal(false);
  };

  if (!showModal) return null;

  // Keyboard escape handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onOpenChange(false);
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: QuoteRequest = {
      id: quotes.id,
      author,
      quote,
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        useToast("success", "Quote updated successfully");
        onOpenChange(false);
      },
      onError: (error: any) => {
        useToast("error", error.message || "Failed to update quote");
      },
    });
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 md:left-64 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-lg shadow-xl w-127.5 mx-4 p-4 h-auto overflow-y-auto no-scrollbar ${animationClass}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="flex items-center justify-center p-6 pb-0 border-gray-200">
          <h2 id="modal-title" className="text-2xl font-semibold text-black">
            Edit Quote
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 text-gray-400 hover:text-gray-600"
          >
            <CircleX className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 w-full">
          <div className="space-y-2">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-black"
            >
              Quote by
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="quote"
              className="block text-sm font-medium text-black"
            >
              Quote of the Day
            </label>
            <textarea
              id="quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Enter quote text..."
              className="w-full h-52 px-3 py-2 border border-gray-300 rounded-sm bg-[#EA5D0E0D] resize-vertical"
            />
          </div>

          <div className="flex gap-3 pt-6 pb-10">
            <button
              type="submit"
              className="px-6 py-2 button-border rounded-sm text-sm font-medium cursor-pointer w-36"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update Quote"}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-semibold text-black bg-white w-30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
