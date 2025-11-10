"use client";
import { useGetQuotes } from "@/modules/Announcement/Quotes/application/quoteUseCase";
import React from "react";
import { QuoteSkeleton } from "./QuoteSkeleton";

const QuoteModal = () => {
  const { data, isLoading, isError, error } = useGetQuotes();

  if (isLoading) {
    return <QuoteSkeleton />;
  }

  if (isError) {
    return (
      <div className="item-border mb-10 bg-secondary p-6 flex flex-col items-start gap-y-7">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Quote of the Day
          </h1>
        </div>
        <div className="text-center w-full">
          <h3 className="text-lg font-semibold mb-2">Unable to load quote</h3>
          <p className="text-gray-600">
            {error?.message ||
              "Something went wrong while fetching the quote. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="item-border mb-10 bg-secondary p-6 flex flex-col items-start gap-y-7">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Quote of the Day
          </h1>
        </div>
        <div className="text-center w-full">
          <div className="text-gray-400 mb-2 text-4xl">...</div>
          <h3 className="text-lg font-semibold mb-2">No quote available</h3>
          <p className="text-gray-600">
            Check back later for an inspiring quote of the day.
          </p>
        </div>
      </div>
    );
  }

  const currentQuote = data.items[0];
  const quoteBy = currentQuote.author;
  const quote = currentQuote.quote;
  return (
    <div className=" item-border  mb-10 bg-secondary p-6  flex flex-col items-start gap-y-7">
      <div>
        <h1 className="text-2xl  md:text-4xl font-semibold">
          Quote of the Day
        </h1>
      </div>
      <div className="flex flex-col justify-end items-start gap-6 self-stretch">
        <span className="text-base md:text-lg lg:text-xl font-medium italic leading-[1.4]">{`"${quote}"`}</span>
        <div className="md:text-lg lg:text-xl font-medium">
          {"- "}
          {quoteBy}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
