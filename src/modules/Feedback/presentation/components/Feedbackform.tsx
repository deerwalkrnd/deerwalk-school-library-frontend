"use client";
import Button from "@/core/presentation/components/Button/Button";
import { Label } from "@/core/presentation/components/ui/label";
import React, { useState } from "react";
import { useSendFeedback } from "../../application/feedbackUseCase";
import { FeedbackRequest } from "../../domain/entities/FeedbackRequest";
import { useToast } from "@/core/hooks/useToast";

export default function Feedbackform() {
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const mutation = useSendFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: FeedbackRequest = { subject, feedback };
    mutation.mutate(payload, {
      onSuccess: () => {
        setSubject("");
        setFeedback("");
        useToast("success", "Feedback submitted successfully");
      },
      onError: (error: any) => {
        useToast("error", error.message);
      },
    });
  };
  return (
    <div className="flex flex-col ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label className="font-medium text-xs md:text-sm lg:text-base">
            Subject
          </Label>
          <textarea
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Request for addition of books"
            className="w-full text-xs md:text-sm lg:text-base item-text-area rounded-lg px-5 py-4 resize-none h-12.5 md:h-14.5 lg:md:h-14.5"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label className="font-medium text-xs md:text-sm lg:text-base">
            Feedback/Suggestion
          </Label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What do you want us to improve on?"
            className="w-full text-xs md:text-sm lg:text-base item-text-area px-5 py-4 rounded-lg resize-none h-56"
          />
        </div>
      </form>
      <Button className="ring ring-orangeCustom  mt-8 text-white text-xs md:text-sm lg:text-base font-semibold p-3 rounded-md">
        {mutation.isPending ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
